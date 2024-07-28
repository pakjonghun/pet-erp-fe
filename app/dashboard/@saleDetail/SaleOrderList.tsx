import { DateRange } from '@/components/calendar/dateFilter/type';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import LabelText from '@/components/ui/typograph/LabelText';
import { LIMIT } from '@/constants';
import { OutSaleOrdersItem } from '@/http/graphql/codegen/graphql';
import { useSaleOrders } from '@/http/graphql/hooks/sale/useSaleOrders';
import { getNumberToString } from '@/utils/sale';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';
import { SaleOrdersNameMapper } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';

interface Props {
  productName: string;
  mallId: string;
  orderNumber: string;
  dateRange: DateRange;
  sort: string;
  order: 1 | -1;
  setOrder: (value: 1 | -1) => void;
  setSort: (value: string) => void;
}

const SaleOrderList: FC<Props> = ({ productName, mallId, orderNumber, dateRange, sort, order }) => {
  const { data, fetchMore, networkStatus } = useSaleOrders({
    limit: LIMIT,
    skip: 0,
    from: dateRange.from.toISOString(),
    to: dateRange.to.toISOString(),
    mallId,
    productName,
    orderNumber,
    sort,
    order,
  });

  const isLoading = networkStatus <= 3;
  const rows = data?.saleOrders.data?.map((saleOrder) => createRowData(saleOrder)) ?? [];

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.saleOrders?.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            saleOrdersInput: {
              limit: LIMIT,
              skip: rows.length,
              from: dateRange.from.toISOString(),
              to: dateRange.to.toISOString(),
              mallId,
              productName,
              orderNumber,
              sort,
              order,
            },
          },
        });
      }
    }
  };

  const tableScrollRef = useInfinityScroll({ callback });
  const cardScrollRef = useInfinityScroll({ callback });

  return (
    <Stack
      direction="column"
      sx={{
        minHeight: '800px',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        mt: 1,
        py: 4,
        px: 2,
      }}
    >
      <Typography variant="caption" color="GrayText">{`검색결과 : ${getNumberToString(
        data?.saleOrders.totalCount ?? 0,
        'comma'
      )}건`}</Typography>

      <Stack
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {rows.map((row, index) => {
          const isLast = rows.length === index + 1;
          const rowKey = row.join(',');
          return (
            <Stack
              ref={isLast ? cardScrollRef : null}
              sx={{
                py: {
                  xs: 2,
                  sm: 4,
                },
                px: {
                  xs: 1,
                  sm: 2,
                },
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                flexWrap: {
                  xs: 'nowrap',
                  sm: 'wrap',
                },
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                gap: {
                  xs: 0,
                  sm: 2,
                },
              }}
              key={rowKey}
            >
              {row.map((item) => {
                const [key, value] = Object.entries(item)[0];
                const label = SaleOrdersNameMapper[key as unknown as string];
                return <LabelText key={label} label={label} text={value ?? ''} />;
              })}
            </Stack>
          );
        })}
      </Stack>
      {isLoading ?? <CommonLoading />}
    </Stack>
  );
};

export default SaleOrderList;

function createRowData({
  saleAt,
  mallId,
  productName,
  count,
  totalPayment,
  payCost,
  wonCost,
  deliveryCost,
  orderNumber,
}: OutSaleOrdersItem) {
  const list = [
    { saleAt: dayjs(saleAt).format('YYYY-MM-DD') },
    { mallId },
    { productName },
    { count: getNumberToString(count ?? 0, 'comma') },
    {
      totalPayment: getNumberToString(totalPayment ?? 0, 'comma'),
    },
    { payCost: getNumberToString(payCost ?? 0, 'comma') },
    { wonCost: getNumberToString(wonCost ?? 0, 'comma') },
    {
      deliveryCost: getNumberToString(deliveryCost ?? 0, 'comma'),
    },
    {
      orderNumber: orderNumber,
    },
  ];

  return list;
}
