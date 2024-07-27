import React, { FC, ReactNode } from 'react';
import { CardContent, Stack, Typography } from '@mui/material';
import { SaleInfoProps } from '../types';

interface Props {
  title: ReactNode;
  saleInfo: SaleInfoProps;
}

const SaleCardContent: FC<Props> = ({
  title,
  saleInfo: { accTotalPayment, accCount, accProfit, accProfitRate },
}) => {
  const content = (
    <Stack gap={1} flexDirection="row">
      <span>{`판매수 ${accCount}`} </span>
      <span>{`순이익 ${accProfit}`} </span>
      <span>{`순이익율 ${accProfitRate}`} </span>
    </Stack>
  );
  return (
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        gap: {
          xs: 0,
          md: 2,
        },
        py: 0.4,
      }}
    >
      <Stack direction="row" alignContent="center" gap={3}>
        <Typography color="GrayText" sx={{ display: 'flex', alignItems: 'center' }}>
          {title}
        </Typography>
        <Typography
          variant="h6"
          component="span"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {accTotalPayment}
        </Typography>
      </Stack>
      <Typography
        sx={{
          display: {
            xs: 'flex',
            md: 'none',
          },
          alignItems: 'flex-end',
        }}
        color="GrayText"
        variant="caption"
      >
        <span>{content}</span>
      </Typography>
      <Typography
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
          alignItems: 'center',
        }}
        color="GrayText"
        variant="body1"
      >
        {content}
      </Typography>
    </CardContent>
  );
};

export default SaleCardContent;
