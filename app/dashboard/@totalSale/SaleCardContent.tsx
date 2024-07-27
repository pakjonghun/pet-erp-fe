import React, { FC, ReactNode } from 'react';
import { CardContent, Stack, Typography } from '@mui/material';
import { SaleInfoProps } from '../types';
import TotalSaleText from '../_components/TotalSaleText';

interface Props {
  title: ReactNode;
  saleInfo: SaleInfoProps;
}

const SaleCardContent: FC<Props> = ({ title, saleInfo }) => {
  const content = <TotalSaleText saleInfo={saleInfo} />;
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
          {saleInfo.accTotalPayment}
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
        {content}
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
