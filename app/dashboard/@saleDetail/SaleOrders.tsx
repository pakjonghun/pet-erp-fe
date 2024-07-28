import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ReorderIcon from '@mui/icons-material/Reorder';
import { DateRange } from '@/components/calendar/dateFilter/type';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import useTextDebounce from '@/hooks/useTextDebounce';
import { Search } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import SaleOrderList from './SaleOrderList';
import { SaleOrderSortList } from './constants';

interface Props {
  initDateRange: DateRange;
}

const SaleOrders: FC<Props> = ({ initDateRange }) => {
  const [productName, setProductName] = useState('');
  const delayedProductName = useTextDebounce(productName);

  const [mallId, setMallId] = useState('');
  const delayedMallId = useTextDebounce(mallId);

  const [orderNumber, setOrderNumber] = useState('');
  const delayedOrderNumber = useTextDebounce(orderNumber);

  const [dateRange, setDateRange] = useState(initDateRange);
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');
  const [isDateChecked, setIsDateChecked] = useState(true);

  const [order, setOrder] = useState<1 | -1>(-1);
  const [sort, setSort] = useState<string>('saleAt');

  const onClickSort = (sortTarget: string) => {
    if (sort == sortTarget) {
      setOrder((prev) => (prev == 1 ? -1 : 1));
    } else {
      setSort(sortTarget);
      setOrder(1);
    }
  };

  return (
    <>
      <Typography sx={{ fontWeight: 600, mb: 1 }}>{`${name} 주문내역`}</Typography>
      <Stack
        sx={{
          px: 2,
          py: 3,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1.2,
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        <Stack direction="row" alignItems="flex-start" sx={{ width: '100%' }}>
          <FormControlLabel
            label="주문날짜"
            control={
              <Checkbox
                checked={isDateChecked}
                onChange={(_, checked) => setIsDateChecked(checked)}
                sx={{ py: 0 }}
              />
            }
          />
          <SwitchDate
            sx={{
              pointerEvents: isDateChecked ? 'auto' : 'none',
              opacity: isDateChecked ? 1 : 0.4,
            }}
            dateRange={dateRange}
            searchStandard={searchStandard}
            setDateRange={setDateRange}
            setSearchStandard={setSearchStandard}
          />
        </Stack>
        <Stack
          sx={{
            width: '100%',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            flexWrap: {
              sm: 'wrap',
            },
            gap: 1,
          }}
        >
          <TextField
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: {
                xs: '100%',
                md: 280,
              },
              my: 2,
            }}
            label={'제품 이름이나 코드'}
            size="small"
          />
          <TextField
            value={mallId}
            onChange={(event) => setMallId(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: {
                xs: '100%',
                md: 280,
              },
              my: 2,
            }}
            label={'거래처 이름'}
            size="small"
          />

          <TextField
            value={orderNumber}
            onChange={(event) => setOrderNumber(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: {
                xs: '100%',
                md: 280,
              },
              my: 2,
            }}
            label={'주문번호'}
            size="small"
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            gap: 1,
            justifyContent: {
              xs: 'space-between',
              sm: 'flex-start',
            },
            flexWrap: 'wrap',
          }}
        >
          {SaleOrderSortList.map(({ name, value }) => {
            const isSorting = sort == value;
            let nextOrder = 0;
            if (isSorting) {
              nextOrder = order == 1 ? -1 : 1;
            }

            return (
              <Button
                onClick={() => onClickSort(value)}
                sx={{
                  px: 0.2,
                  height: 'fit-content',
                }}
                endIcon={getSortIcon(nextOrder)}
                size="small"
                variant="outlined"
                key={value}
              >
                {name}
              </Button>
            );
          })}
        </Stack>
      </Stack>
      <SaleOrderList
        setSort={setSort}
        setOrder={setOrder}
        sort={sort}
        order={order}
        dateRange={dateRange}
        mallId={delayedMallId}
        productName={delayedProductName}
        orderNumber={delayedOrderNumber}
      />
    </>
  );
};

export default SaleOrders;

function getSortIcon(order: number) {
  const sortMapper = {
    ['-1' as string]: <ArrowUpwardIcon sx={{ width: 14, height: 14 }} />,
    '0': <ReorderIcon sx={{ width: 14, height: 14 }} />,
    '1': <ArrowDownwardIcon sx={{ width: 14, height: 14 }} />,
  };

  return sortMapper[order.toString()];
}
