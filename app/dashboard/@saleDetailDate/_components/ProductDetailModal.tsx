'use client';

import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ClientInfoMenu, ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import BaseModal from '@/components/ui/modal/BaseModal';
import { DateRange } from '@/components/calendar/dateFilter/type';
import TotalSaleText from '../../_components/TotalSaleText';
import { getNumberToString, getParsedSaleData, getProfit, getProfitRate } from '@/utils/sale';
import SaleOrders from '../SaleOrders';
import CommonAnyTypeTable from '@/components/table/CommonAnyTypeTable';
import { EMPTY } from '@/constants';
import { getKCWFormat } from '@/utils/common';

interface Props {
  initDateRange: DateRange;
  selectedProduct: ProductSaleMenu;
  open: boolean;
  onClose: () => void;
}

const ProductDetailModal: FC<Props> = ({
  initDateRange,
  selectedProduct: {
    accCount,
    accDeliveryCost,
    accPayCost,
    accTotalPayment,
    accWonCost,
    barCode,
    clients,
    code,
    leadTime,
    name,
    recentCreateDate,
    salePrice,
    stock,
    wonPrice,
    prevAccCount,
    prevAccDeliveryCost,
    prevAccPayCost,
    prevAccTotalPayment,
    prevAccWonCost,
    isFreeDeliveryFee,
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
        {`${name} 제품 상세정보`}
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
          title="제품 정보"
          hover={false}
          headerList={[
            '코드',
            '착불여부',
            '원가',
            '판매가',
            '리드타임',
            '재고',
            // '최근 생산완료예정',
          ]}
          rowList={[
            [
              code,
              isFreeDeliveryFee ? '무료배송' : '유료배송',
              wonPrice == null ? EMPTY : getKCWFormat(wonPrice),
              salePrice == null ? EMPTY : getKCWFormat(salePrice),
              leadTime ? `${leadTime}일` : EMPTY,
              salePrice == null ? EMPTY : getNumberToString(stock ?? 0, 'comma'),
              // recentCreateDate,
            ],
          ]}
        />
        <CommonAnyTypeTable
          title={`${name} 제품의 채널별 판매수 순`}
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
          rowList={clients.map((p, i) => {
            const no = i + 1;
            const dataList = createTableRow(p);
            return [no, ...dataList];
          })}
        />
        <Box sx={{ pr: 3 }}>
          <SaleOrders initProductName={name} initMallId="" initDateRange={initDateRange} />
        </Box>
      </Stack>
    </BaseModal>
  );
};

export default ProductDetailModal;

function createTableRow(client: ClientInfoMenu) {
  const profit = getProfit({
    accDeliveryCost: client.accDeliveryCost,
    accPayCost: client.accPayCost,
    accWonCost: client.accWonCost,
  });

  const result = [
    client.name,
    getNumberToString(client.accCount ?? 0, 'comma'),
    getNumberToString(client.accTotalPayment ?? 0, 'comma'),
    getNumberToString(client.accPayCost ?? 0, 'comma'),
    getNumberToString(client.accWonCost ?? 0, 'comma'),
    getNumberToString(Math.floor(client.accDeliveryCost ?? 0), 'comma'),
    getNumberToString(profit ?? 0, 'comma'),
    getNumberToString(getProfitRate(profit, client.accTotalPayment ?? 0), 'percent'),
  ];

  return result;
}
