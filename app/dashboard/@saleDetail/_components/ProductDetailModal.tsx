'use client';

import { FC, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import BaseModal from '@/components/ui/modal/BaseModal';
import { DateRange } from '@/components/calendar/dateFilter/type';
import TotalSaleText from '../../_components/TotalSaleText';
import { getNumberToString, getParsedSaleData, getProfit, getProfitRate } from '@/utils/sale';
import SaleOrders from '../SaleOrders';
import CommonAnyTypeTable from '@/components/table/CommonAnyTypeTable';
import { EMPTY } from '@/constants';
import { getKCWFormat } from '@/utils/common';
import { createTableRowToRawData, createTableRowToString } from '../util';
import { SaleToNumber } from '../type';
import { detailHeader, detailHeaderMapper, detailHeaderMapperToHangle } from '../constants';

interface Props {
  initDateRange: DateRange;
  selectedProduct: ProductSaleMenu;
  open: boolean;
  onClose: () => void;
  setSelectedProduct: (item: null | ProductSaleMenu) => void;
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
    salePrice,
    stock,
    wonPrice,
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

  const rowList = clients
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
          sort={detailHeaderMapperToHangle[detailSort]}
          order={detailOrder}
          onClickSort={onClickSort}
          title={`${name} 제품의 채널`}
          headerList={detailHeader}
          rowList={rowList}
        />
        <Box sx={{ pr: 3 }}>
          <SaleOrders initProductName={name} initMallId="" initDateRange={initDateRange} />
        </Box>
      </Stack>
    </BaseModal>
  );
};

export default ProductDetailModal;
