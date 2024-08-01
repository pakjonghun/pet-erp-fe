'use client';

import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import BaseModal from '../../../../../components/ui/modal/BaseModal';
import { ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import { useProductSaleChart } from '@/http/graphql/hooks/product/useProductSaleChart';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import { EMPTY } from '@/constants';

interface Props {
  selectedProductSale: ProductSaleMenu;
  open: boolean;
  onClose: () => void;
}

const ProductSaleModal: FC<Props> = ({
  selectedProductSale: { clients, name, leadTime, wonPrice, code, stock, recentCreateDate },
  open,
  onClose,
}) => {
  const { data } = useProductSaleChart(code);
  const dates = data?.productSale?.map((item) => new Date(item._id).getTime()) ?? [];
  const accProfits = data?.productSale?.map((item) => item.accProfit) ?? [];
  const accPayCosts = data?.productSale?.map((item) => item.accPayCost) ?? [];
  const clonedClients = clients.map((client) => Object.assign({}, client));

  return (
    <BaseModal open={open} onClose={onClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        제품 상세정보
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={3} mb={2}>
        <LabelText label="이름" text={name} />
        <LabelText label="코드" text={code} />
        <LabelText label="원가" text={wonPrice ? getKCWFormat(wonPrice) : EMPTY} />
        <LabelText label="리드타임" text={leadTime ?? EMPTY} />
        <LabelText label="재고합계" text={stock} />
        <LabelText
          label="최근 제작완료 예정일"
          text={recentCreateDate == null ? '알수없음' : recentCreateDate}
        />
      </Stack>

      <LabelText
        label="거래처별 판매수량"
        text={clonedClients.length > 0 ? '' : '판매 기록 없음'}
        sx={{ color: 'gray' }}
      />
      <Stack direction="row" flexWrap="wrap" rowGap={1} columnGap={2} mt={1}>
        {(clonedClients ?? []).map((client) => {
          return (
            <LabelText
              key={client?.name ?? ''}
              label={client?.name ?? ''}
              text={getNumberWithComma(client.accCount ?? 0)}
            />
          );
        })}
      </Stack>
      {/* <Box sx={{ bgcolor: 'grey.200', width: '100%', height: 320, color: 'white', mt: 2, pt: 2 }}>
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
      </Box> */}
    </BaseModal>
  );
};

export default ProductSaleModal;
