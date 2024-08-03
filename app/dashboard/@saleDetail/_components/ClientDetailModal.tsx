'use client';

import { FC } from 'react';
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
              hasFullText
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
          headerList={['판매수', '매출', '정산액', '원가', '택배비', '수익', '수익율']}
          rowList={[
            [
              getNumberToString(monthSales?.accCount ?? 0, 'comma'),
              getNumberToString(monthSales?.accTotalPayment ?? 0, 'comma'),
              getNumberToString(monthSales?.accPayCost ?? 0, 'comma'),
              getNumberToString(monthSales?.accWonCost ?? 0, 'comma'),
              getNumberToString(monthSales?.accDeliveryCost ?? 0, 'comma'),
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
                'comma'
              ),
            ],
          ]}
        />

        <CommonAnyTypeTable
          title={`${name} 채널의 제품별 판매수 순`}
          headerList={[
            'NO',
            '이름',
            '판매수',
            '매출',
            '정산액',
            '원가',
            '택배비',
            '수익',
            '순익율',
          ]}
          rowList={products.map((p, i) => {
            const no = i + 1;
            const dataList = createTableRow(p);
            return [no, ...dataList];
          })}
        />
        <Box sx={{ pr: 3 }}>
          <SaleOrders initProductName="" initMallId={name} initDateRange={initDateRange} />
        </Box>
      </Stack>
    </BaseModal>
  );
};

export default ClientSaleModal;

function createTableRow(product: ProductSaleInfo) {
  const profit = getProfit({
    accDeliveryCost: product.accDeliveryCost,
    accPayCost: product.accPayCost,
    accWonCost: product.accWonCost,
  });

  const result = [
    product.name,
    getNumberToString(product.accCount ?? 0, 'comma'),
    getNumberToString(product.accTotalPayment ?? 0, 'comma'),
    getNumberToString(product.accPayCost ?? 0, 'comma'),
    getNumberToString(product.accWonCost ?? 0, 'comma'),
    getNumberToString(product.accDeliveryCost ?? 0, 'comma'),
    getNumberToString(profit ?? 0, 'comma'),
    getNumberToString(getProfitRate(profit, product.accPayCost ?? 0), 'percent'),
  ];

  return result;
}
