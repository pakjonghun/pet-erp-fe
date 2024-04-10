'use client';

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useState } from 'react';
import { FindLogsDto, Order } from '@/api/graphql/codegen/graphql';
import Search from './_components/Search';
import { Box, Button, InputAdornment, TextField } from '@mui/material';

import CommonDateFilter from '@/components/calendar/CommonDateFilter';
import { NullableRange } from '@/components/calendar/type';
import { getStringRange, getThisMonth } from '@/components/calendar/utils';

const LogPage = () => {
  const { from, to } = getThisMonth();

  const defaultVariables: FindLogsDto = {
    keyword: '',
    keywordTarget: 'description',
    offset: 10,
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          px: 3,
          mt: 3,
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          justifyContent: 'space-between',
        }}
      >
        <Search
          toggleFilter={setFilterAnchor}
          findLogsQuery={findLogsQuery}
          setFindLogsQuery={handleSetFindLogsQuery}
        />
        <TextField
          sx={{
            mt: {
              xs: 1,
              sm: 0,
            },
          }}
          size="small"
          onClick={(event) => setFilterAnchor(event.currentTarget)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
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
    </Box>
  );
};

export default LogPage;
