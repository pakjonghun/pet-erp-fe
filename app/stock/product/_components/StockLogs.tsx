import { FC, useEffect, useState } from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  Typography,
  Stack,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import { FindStockLogs, ProductOrder, StockColumn, UserRole } from '@/http/graphql/codegen/graphql';
import ActionButton from '@/components/ui/button/ActionButton';
import AddOrderModal from '../../_components/AddOrderModal';
import { useStocksOrder } from '@/http/graphql/hooks/stock/useStocksOrder';
import dayjs from 'dayjs';
import { getNumberWithComma } from '@/utils/common';
import EmptyRow from '@/components/table/EmptyRow';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';
import { CommonHeaderRow, CommonTable, CommonTableBody } from '@/components/commonStyles';
import LoadingRow from '@/components/table/LoadingRow';
import Search from '@/app/setting/log/_components/Search';
import CommonDateFilter from '@/components/calendar/dateFilter/CommonDateFilter';
import { getStringRange, getThisMonth } from '@/components/calendar/dateFilter/utils';
import { LIMIT } from '@/constants';
import { DateRange } from '@/components/calendar/dateFilter/type';
import StockLogTable from '@/app/setting/log/_components/StockLogTable';
import useTextDebounce from '@/hooks/useTextDebounce';

interface Props {
  productCode: string;
}

const StockLogs: FC<Props> = ({ productCode }) => {
  const { from, to } = getThisMonth();

  const defaultVariables: FindStockLogs = {
    productCode,
    keyword: '',
    limit: LIMIT,
    skip: 0,
    from,
    to,
  };

  useEffect(() => {
    setFindLogsQuery((prev) => ({ ...prev, productCode }));
  }, [productCode]);

  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [findLogsQuery, setFindLogsQuery] = useState<FindStockLogs>(defaultVariables);
  const handleSetFindLogsQuery = (query: Partial<FindStockLogs>) => {
    setFindLogsQuery((prev) => {
      const clonedQuery = Object.assign({}, prev);
      Object.entries(query).forEach(([k, v]) => {
        const key = k as keyof FindStockLogs;
        (clonedQuery[key] as any) = v;
      });
      return clonedQuery;
    });
  };

  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);

  useEffect(() => {
    setFindLogsQuery((prev) => ({ ...prev, keyword: delayedKeyword }));
  }, [delayedKeyword]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: 2,
        gap: 2,
      }}
    >
      <Box>
        <TextField
          sx={{ mr: 1 }}
          size="small"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          label="검색할 내용 입력"
        />
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
            setRange: (range: DateRange) => handleSetFindLogsQuery(range),
          }}
        />
      </Box>
      <StockLogTable findStockLogs={findLogsQuery} />
    </Box>
  );
};

export default StockLogs;
