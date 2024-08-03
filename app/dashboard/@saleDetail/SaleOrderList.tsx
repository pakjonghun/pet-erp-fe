'use client';

import { FC } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { DateRange } from '@/components/calendar/dateFilter/type';
import LabelText from '@/components/ui/typograph/LabelText';
import { LIMIT } from '@/constants';
import { OutSaleOrdersItem } from '@/http/graphql/codegen/graphql';
import { useSaleOrders } from '@/http/graphql/hooks/sale/useSaleOrders';
import { getNumberToString, getParsedOrderSaleData, getProfit, getProfitRate } from '@/utils/sale';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { SaleOrdersNameMapper } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import CommonAnyTypeTable from '@/components/table/CommonAnyTypeTable';
import { useDownloadSaleOrders } from '@/http/rest/hooks/file/useDownloadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import ActionButton from '@/components/ui/button/ActionButton';
import CommonLoading from '@/components/ui/loading/CommonLoading';

interface Props {
  isDateChecked: boolean;
  productName: string;
  mallId: string;
  orderNumber: string;
  dateRange: DateRange;
  sort: string;
  order: 1 | -1;
  setOrder: (value: 1 | -1) => void;
  setSort: (value: string) => void;
}

const SaleOrderList: FC<Props> = ({
  isDateChecked,
  productName,
  mallId,
  orderNumber,
  dateRange,
  sort,
  order,
}) => {
  const { data, fetchMore, networkStatus } = useSaleOrders({
    limit: LIMIT,
    skip: 0,
    from: isDateChecked ? dateRange.from.toISOString() : undefined,
    to: isDateChecked ? dateRange.to.toISOString() : undefined,
    mallId,
    productName,
    orderNumber,
    sort,
    order,
  });

  const { mutate: download, isPending: isDownloading } = useDownloadSaleOrders();

  const handleDownload = () => {
    download(
      {
        limit: 9999999999999,
        skip: 0,
        from: isDateChecked ? dateRange.from.toISOString() : undefined,
        to: isDateChecked ? dateRange.to.toISOString() : undefined,
        mallId,
        productName,
        orderNumber,
        sort,
        order,
      },
      {
        onSuccess: () => {
          snackMessage({
            message: '주문 다운로드가 완료되었습니다.',
            severity: 'success',
          });
        },
        onError: (err) => {
          const message = err.message;
          snackMessage({
            message: message ?? '주문 파일 다운로드가 실패했습니다.',
            severity: 'error',
          });
        },
      }
    );
  };

  const isLoading = networkStatus <= 3;
  const rows = data?.saleOrders.data?.map((saleOrder) => createRowData(saleOrder)) ?? [];
  const saleOrdersTotal = data?.saleOrders.total && getParsedOrderSaleData(data?.saleOrders.total);

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.saleOrders?.totalCount;
      if (totalCount != null && totalCount > rows.length && !isLoading) {
        fetchMore({
          variables: {
            saleOrdersInput: {
              limit: LIMIT,
              skip: rows.length,
              from: isDateChecked ? dateRange.from.toISOString() : undefined,
              to: isDateChecked ? dateRange.to.toISOString() : undefined,
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
    <>
      <Stack
        direction="column"
        sx={{
          minHeight: '500px',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          mt: 1,
          py: 4,
          px: 2,
        }}
      >
        <Box sx={{ width: 'fit-content', mb: 1, ml: 'auto', mr: 3 }}>
          <ActionButton
            icon={isDownloading ? <CommonLoading /> : <FileDownloadIcon />}
            text="검색한 주문 다운로드"
            onClick={handleDownload}
          />
        </Box>
        <Typography variant="caption" color="GrayText">{`검색결과 : ${getNumberToString(
          data?.saleOrders.totalCount ?? 0,
          'comma'
        )}건`}</Typography>
        {saleOrdersTotal && (
          <Typography variant="caption" color="GrayText">
            {`총합계 : 매출 ${saleOrdersTotal.accTotalPayment}, 판매수 : ${saleOrdersTotal.accCount}, 정산액 : ${saleOrdersTotal.accPayCost}, 원가 : ${saleOrdersTotal.accWonCost}, 택배비 : ${saleOrdersTotal.accDeliveryCost}`}
          </Typography>
        )}
        <Stack
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },
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

        <CommonAnyTypeTable
          scrollRef={tableScrollRef}
          headerList={[
            'NO',
            '주문날짜',
            '거래처',
            '제품명',
            '판매수',
            '매출',
            '정산액',
            '원가',
            '택배비',
            '순익',
            '순익율',
            '주문번호',
          ]}
          title=""
          rowList={rows.map((item, idx) => {
            const cellValues = item.map((cell) => {
              const values = Object.values(cell) as any[];
              return values[0];
            });

            return [idx + 1, ...cellValues];
          })}
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            minHeight: 800,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', height: 10 }}>
          {isLoading && <CommonLoading />}
        </Box>
      </Stack>
    </>
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
  const profit = getProfit({
    accPayCost: payCost,
    accWonCost: wonCost,
    accDeliveryCost: deliveryCost,
  });

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
      profit: getNumberToString(profit, 'comma'),
    },
    {
      profit: getNumberToString(getProfitRate(profit, totalPayment), 'percent'),
    },
    {
      orderNumber: orderNumber,
    },
  ];

  return list;
}
