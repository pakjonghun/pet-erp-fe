'use client';

import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import BaseModal from '../../../../components/ui/modal/BaseModal';
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import { useProductSaleChart } from '@/http/graphql/hooks/product/useProductSaleChart';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';

interface Props {
  selectedProductSale: ProductSaleData;
  open: boolean;
  onClose: () => void;
}

const ProductSaleModal: FC<Props> = ({
  selectedProductSale: { clients, name, leadTime, barCode, code, sales },
  open,
  onClose,
}) => {
  const { data } = useProductSaleChart(code);
  const dates = data?.productSale?.map((item) => new Date(item._id).getTime()) ?? [];
  const accProfits = data?.productSale?.map((item) => item.accProfit) ?? [];
  const accPayCosts = data?.productSale?.map((item) => item.accPayCost) ?? [];
  const clonedClients = clients.map((client) => Object.assign({}, client));
  clonedClients.sort((a, b) => {
    if (a?.accCount == null || b?.accCount == null) return 0;
    if (a.accCount > b.accCount) return -1;
    else return 1;
  });

  return (
    <BaseModal open={open} onClose={onClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        제품 상세정보
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={3} mb={2}>
        <LabelText label="이름" text={name} />
        <LabelText label="코드" text={code} />
        <LabelText label="바코드" text={barCode ?? ''} />
        <LabelText label="리드타임" text={leadTime ?? ''} />
      </Stack>
      {/* <Stack direction="row" flexWrap="wrap" gap={3} mb={3}>
        <LabelText label="지난주 판매량" text={getKCWFormat(lastWeek?.accCount ?? 0)} />
        <LabelText label="지난주 매출" text={getKCWFormat(lastWeek?.accPayCost ?? 0)} />
        <LabelText label="지난주 수익" text={getKCWFormat(lastWeek?.accProfit ?? 0)} />
        <LabelText label="지난주 평균 매출" text={getKCWFormat(lastWeek?.averagePayCost ?? 0)} />
      </Stack> */}

      <LabelText label="채널별 판매수량" text={''} />
      <Stack direction="row" flexWrap="wrap" rowGap={1} columnGap={2} mt={1}>
        {(clonedClients ?? []).map((client) => {
          return (
            <LabelText
              key={client?._id?.mallId ?? ''}
              label={client?._id?.mallId ?? ''}
              text={getNumberWithComma(client.accCount ?? 0)}
            />
          );
        })}
      </Stack>
      <Box sx={{ bgcolor: 'grey.200', width: '100%', height: 320, color: 'white', mt: 2, pt: 2 }}>
        {!!data ? (
          <LineChart
            xAxis={[
              {
                data: dates,
                id: 'dates',
                scaleType: 'time',
                valueFormatter: (value) => dayjs(value).format('MM월DD일'),
              },
            ]}
            series={[
              {
                id: 'accPayCosts',
                label: '매출',
                data: accPayCosts as number[],
                showMark: false,
              },
              {
                id: 'accProfits',
                label: '순이익',
                data: accProfits as number[],
                showMark: false,
              },
            ]}
            margin={{
              left: 90,
            }}
            height={300}
          />
        ) : (
          <CommonLoading />
        )}
      </Box>
    </BaseModal>
  );
};

export default ProductSaleModal;
