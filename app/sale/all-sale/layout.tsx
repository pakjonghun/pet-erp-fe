'use client';

import { FC, ReactNode } from 'react';
import { Box, Stack } from '@mui/material';

interface Props {
  productSales: ReactNode;
  topClients: ReactNode;
}

const SaleLayout: FC<Props> = ({ productSales, topClients }) => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
          },
        }}
      >
        {productSales}
        {topClients}
      </Stack>
    </Box>
  );
};

export default SaleLayout;
