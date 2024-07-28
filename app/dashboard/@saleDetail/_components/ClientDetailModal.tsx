'use client';

import { FC } from 'react';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import BaseModal from '@/components/ui/modal/BaseModal';
import { DateRange } from '@/components/calendar/dateFilter/type';
import TotalSaleText from '../../_components/TotalSaleText';
import { getNumberToString, getParsedSaleData, getProfit, getProfitRate } from '@/utils/sale';
import SaleOrders from '../SaleOrders';

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

        <TableContainer>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>{`${name} 채널의 제품 판매수 순`}</Typography>
          <Table
            size="small"
            sx={{
              '& th, & td': {
                border: (theme) => `1px solid ${theme.palette.divider}`,
                py: 1,
                px: 0.4,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              },
            }}
          >
            <TableHead>
              {['이름', '판매수', '매출', '수이익', '순이익율'].map((head, index) => {
                return (
                  <TableCell sx={{ textAlign: index ? 'right' : 'left' }} key={head}>
                    {head}
                  </TableCell>
                );
              })}
            </TableHead>
            <TableBody>
              {products.map((product) => {
                const profit = getProfit({
                  accDeliveryCost: product.accDeliveryCost,
                  accPayCost: product.accPayCost,
                  accWonCost: product.accWonCost,
                });
                return (
                  <TableRow key={product.name}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      {getNumberToString(product.accCount ?? 0, 'comma')}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      {getNumberToString(product.accTotalPayment ?? 0, 'comma')}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      {getNumberToString(profit ?? 0, 'comma')}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      {getNumberToString(getProfitRate(profit, product.accPayCost ?? 0), 'percent')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <SaleOrders initDateRange={initDateRange} />
        </Box>
      </Stack>
    </BaseModal>
  );
};

export default ClientSaleModal;
