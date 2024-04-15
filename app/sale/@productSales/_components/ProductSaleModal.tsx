import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import BaseModal from '../../../../components/ui/modal/BaseModal';
import { ProductSaleData } from '@/api/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';

interface Props {
  selectedProductSale: ProductSaleData;
  open: boolean;
  onClose: () => void;
}

const ProductSaleModal: FC<Props> = ({
  selectedProductSale: {
    clients,
    name,
    thisMonth,
    lastWeek,
    thisWeek,
    today,
    leadTime,
    barCode,
    code,
  },
  open,
  onClose,
}) => {
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
      <Stack direction="row" flexWrap="wrap" gap={3} mb={3}>
        <LabelText label="지난주 판매량" text={lastWeek?.accCount ?? ''} />
        <LabelText label="지난주 매출" text={lastWeek?.accPayCost ?? ''} />
        <LabelText label="지난주 수익" text={lastWeek?.accProfit ?? ''} />
        <LabelText label="지난주 평균 매출" text={lastWeek?.averagePayCost ?? ''} />
      </Stack>

      <LabelText label="채널별 판매수량" text={''} />
      <Stack direction="row" flexWrap="wrap" rowGap={1} columnGap={2} mt={1}>
        {(clients ?? []).map((client) => {
          return (
            <LabelText key={client._id.mallId} label={client._id.mallId} text={client.accCount} />
          );
        })}
      </Stack>
      <Box sx={{ bgcolor: 'grey', width: '100%', height: 200, color: 'white', mt: 2 }}>
        매출 차트위치(꺽은선 그래프)
      </Box>
    </BaseModal>
  );
};

export default ProductSaleModal;
