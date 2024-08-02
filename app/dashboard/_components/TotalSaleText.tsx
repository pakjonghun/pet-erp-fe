import { Stack } from '@mui/material';
import { FC } from 'react';
import { SaleInfoProps } from '../types';

interface Props {
  saleInfo: SaleInfoProps;
  hasFullText?: boolean;
}

const TotalSaleText: FC<Props> = ({
  saleInfo: { accCount, accProfit, accProfitRate, accTotalPayment },
  hasFullText = false,
}) => {
  return (
    <Stack
      sx={{
        gap: 1,
        my: 1,
      }}
      flexDirection="row"
      flexWrap="wrap"
      lineHeight={0.7}
      color="GrayText"
    >
      {hasFullText && <span>{`매출 ${accTotalPayment}`} </span>}
      <span>{`판매수 ${accCount}`} </span>
      <span>{`순이익 ${accProfit}`} </span>
      <span>{`순이익율 ${accProfitRate}`} </span>
    </Stack>
  );
};

export default TotalSaleText;
