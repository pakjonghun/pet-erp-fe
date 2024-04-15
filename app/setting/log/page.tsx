'use client';

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useState } from 'react';
import { FindLogsDto, Order } from '@/api/graphql/codegen/graphql';
import Search from './_components/Search';
import { Box, InputAdornment, Paper, TextField } from '@mui/material';
import CommonDateFilter from '@/components/calendar/CommonDateFilter';
import { NullableRange } from '@/components/calendar/type';
import { getStringRange, getThisMonth } from '@/components/calendar/utils';
import LogTable from './_components/LogTable';
import { LIMIT } from '@/constants';
import TableTitle from '@/components/ui/typograph/TableTitle';

const LogPage = () => {
  const { from, to } = getThisMonth();

  const defaultVariables: FindLogsDto = {
    keyword: '',
    keywordTarget: 'description',
    limit: LIMIT,
    skip: 0,
    order: Order.Desc,
    sort: 'createdAt',
    from,
    to,
  };

  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [findLogsQuery, setFindLogsQuery] = useState<FindLogsDto>(defaultVariables);
  const handleSetFindLogsQuery = (query: Partial<FindLogsDto>) => {
    setFindLogsQuery((prev) => {
      const clonedQuery = Object.assign({}, prev);
      Object.entries(query).forEach(([k, v]) => {
        const key = k as keyof FindLogsDto;
        (clonedQuery[key] as any) = v;
      });
      return clonedQuery;
    });
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 3,
        mt: 3,
        overflow: 'hidden',
      }}
    >
      <TableTitle title={`로그 관리`} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          justifyContent: 'space-between',
          px: 2,
        }}
      >
        <Search findLogsQuery={findLogsQuery} setFindLogsQuery={handleSetFindLogsQuery} />
        <TextField
          sx={{
            mt: {
              xs: 1,
              sm: 0,
            },
            minWidth: 'fitContent',
          }}
          size="small"
          onClick={(event) => setFilterAnchor(event.currentTarget)}
          InputProps={{
            endAdornment: (
              <InputAdornment sx={{ cursor: 'pointer' }} position="end">
                <CalendarTodayOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          value={getStringRange({ from: findLogsQuery.from, to: findLogsQuery.to })}
        />

        <CommonDateFilter
          anchor={{
            open: !!filterAnchor,
            anchorEl: filterAnchor,
            onClose: () => setFilterAnchor(null),
          }}
          date={{
            range: { from: findLogsQuery.from, to: findLogsQuery.to },
            setRange: (range: NullableRange) => handleSetFindLogsQuery(range),
          }}
        />
      </Box>
      <LogTable findLogsQuery={findLogsQuery} />
    </Paper>
  );
};

export default LogPage;
