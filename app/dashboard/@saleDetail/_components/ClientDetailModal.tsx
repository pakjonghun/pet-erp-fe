'use client';

import { FC, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ClientSaleMenu, ProductSaleInfo } from '@/http/graphql/codegen/graphql';
import BaseModal from '@/components/ui/modal/BaseModal';
import { DateRange } from '@/components/calendar/dateFilter/type';
import TotalSaleText from '../../_components/TotalSaleText';
import {
  getFixedTwo,
  getNumberToString,
  getParsedSaleData,
  getProfit,
  getProfitRate,
} from '@/utils/sale';
import SaleOrders from '../SaleOrders';
import CommonAnyTypeTable from '@/components/table/CommonAnyTypeTable';
import { EMPTY } from '@/constants';
import { ClientTypeToHangle } from '@/app/back-data/client/constants';
import { SaleToNumber } from '../type';
import { detailHeader, detailHeaderMapper, detailHeaderMapperToHangle } from '../constants';
import { createTableRowToRawData, createTableRowToString } from '../util';

interface Props {
  initDateRange: DateRange;
  selectedClient: ClientSaleMenu;
  open: boolean;
  onClose: () => void;
}

const ClientSaleModal: FC<Props> = ({
  initDateRange,
  selectedClient: {
    clientType,
    code,
    businessName,
    businessNumber,
    feeRate,
    monthSales,
    isSabangService,
    payDate,
    inActive,
    name,
    products,
    accCount,
    accDeliveryCost,
    accPayCost,
    accTotalPayment,
    accWonCost,
  },
  open,
  onClose,
}) => {
  const from = initDateRange.from.format('YYYY-MM-DD');
  const to = initDateRange.to.format('YYYY-MM-DD');
  const dateStringRange = from == to ? from : `${from} ~ ${to}`;

  const profit = getProfit({
    accPayCost: accPayCost,
    accWonCost: accWonCost,
    accDeliveryCost: accDeliveryCost,
  });

  const [detailSort, setDetailSort] = useState<keyof SaleToNumber>('accCount');
  const [detailOrder, setDetailOrder] = useState(-1);

  const onClickSort = (headerName: string) => {
    const targetKey = detailHeaderMapper[headerName];
    if (!targetKey) return;

    if (detailSort == targetKey) {
      setDetailOrder((prev) => (prev == 1 ? -1 : 1));
    } else {
      setDetailSort(targetKey);
      setDetailOrder(-1);
    }
  };

  const rowList = products
    .map((item) => {
      return createTableRowToRawData(item);
    })
    .toSorted((a, b) => {
      const aValue = a[detailSort]!;
      const bValue = b[detailSort]!;
      const finalOrder = detailOrder == -1 ? 1 : -1;

      if (aValue > bValue) {
        return finalOrder * -1;
      } else {
        return finalOrder;
      }
    })
    .map((p, i) => {
      const no = i + 1;
      const dataList = createTableRowToString(p);
      return [no, ...dataList];
    });

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      sx={{
        width: '90%',
        height: '90%',
        borderRadius: 1,
        px: 2,
      }}
    >
      <Typography variant="h6" component="h6" sx={{ fontWeight: 600 }}>
        {`${name} 거래처 상세정보`}
      </Typography>

      <Stack direction="column" gap={3}>
        <Stack sx={{ my: 2, direction: 'column', gap: 0 }}>
          <Typography sx={{ fontWeight: 600 }}>{`${dateStringRange} 매출현황`}</Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 12,
                md: 14,
              },
            }}
          >
            <TotalSaleText
              saleInfo={getParsedSaleData({
                accCount: accCount ?? 0,
                accProfit: profit,
                accProfitRate: getProfitRate(profit, accTotalPayment ?? 0),
                accTotalPayment: accTotalPayment ?? 0,
              })}
            />
          </Typography>
        </Stack>

        <CommonAnyTypeTable
          sx={{ mb: 2 }}
          title="거래처 정보"
          hover={false}
          headerList={[
            '사방넷 연동여부',
            '수수료율',
            '1달 평균 수수료율',
            '코드',
            '분류',
            '상호',
            '사업자번호',
          ]}
          rowList={[
            [
              isSabangService ? '지원' : '미지원',
              feeRate == null ? EMPTY : getFixedTwo(feeRate * 100) + '%',
              monthSales == null
                ? EMPTY
                : getFixedTwo(
                    (1 - (monthSales.accPayCost ?? 0) / (monthSales?.accTotalPayment ?? 1)) * 100
                  ) + '%',
              code,
              ClientTypeToHangle[clientType],

              businessName,
              businessNumber,
            ],
          ]}
        />

        <CommonAnyTypeTable
          sx={{ mb: 2 }}
          title="최근 1달 매출"
          hover={false}
          headerList={['판매수', '매출', '정산액', '원가', '택배비', '순익', '순익율']}
          rowList={[
            [
              getNumberToString(monthSales?.accCount ?? 0, 'comma'),
              getNumberToString(monthSales?.accTotalPayment ?? 0, 'comma'),
              getNumberToString(monthSales?.accPayCost ?? 0, 'comma'),
              getNumberToString(monthSales?.accWonCost ?? 0, 'comma'),
              getNumberToString(Math.floor(monthSales?.accDeliveryCost ?? 0), 'comma'),
              getNumberToString(
                getProfit({
                  accPayCost: monthSales?.accPayCost ?? 0,
                  accWonCost: monthSales?.accWonCost ?? 0,
                  accDeliveryCost: monthSales?.accDeliveryCost,
                }),
                'comma'
              ),
              getNumberToString(
                getProfitRate(
                  getProfit({
                    accPayCost: monthSales?.accPayCost ?? 0,
                    accWonCost: monthSales?.accWonCost ?? 0,
                    accDeliveryCost: monthSales?.accDeliveryCost,
                  }),
                  monthSales?.accTotalPayment ?? 0
                ),
                'percent'
              ),
            ],
          ]}
        />

        <CommonAnyTypeTable
          onClickSort={onClickSort}
          sort={detailHeaderMapperToHangle[detailSort]}
          order={detailOrder}
          title={`${name} 채널의 제품`}
          headerList={detailHeader}
          rowList={rowList}
        />
        <Box sx={{ pr: 3 }}>
          <SaleOrders initProductName="" initMallId={name} initDateRange={initDateRange} />
        </Box>
      </Stack>
    </BaseModal>
  );
};

export default ClientSaleModal;
