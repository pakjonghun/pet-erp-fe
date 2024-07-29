'use client';

import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ClientSaleMenu, ProductSaleInfo } from '@/http/graphql/codegen/graphql';
import BaseModal from '@/components/ui/modal/BaseModal';
import { DateRange } from '@/components/calendar/dateFilter/type';
import TotalSaleText from '../../_components/TotalSaleText';
import { getNumberToString, getParsedSaleData, getProfit, getProfitRate } from '@/utils/sale';
import SaleOrders from '../SaleOrders';
import CommonAnyTypeTable from '@/components/table/CommonAnyTypeTable';

interface Props {
  initDateRange: DateRange;
  selectedClient: ClientSaleMenu;
  open: boolean;
  onClose: () => void;
}

const ClientSaleModal: FC<Props> = ({
  initDateRange,
  selectedClient: {
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
                accProfitRate: getProfitRate(profit, accPayCost ?? 0),
                accTotalPayment: accTotalPayment ?? 0,
              })}
            />
          </Typography>
        </Stack>
        <CommonAnyTypeTable
          title={`${name} 채널의 제품 판매수 순`}
          headerList={['NO', '이름', '판매수', '매출', '수이익', '순이익율']}
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
    getNumberToString(profit ?? 0, 'comma'),
    getNumberToString(getProfitRate(profit, product.accPayCost ?? 0), 'percent'),
  ];

  return result;
}
