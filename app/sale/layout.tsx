import SubHeader from '@/components/layout/header/SubHeader';
import { Box, Stack } from '@mui/material';
import { FC, ReactNode } from 'react';
interface Props {
  productSales: ReactNode;
  topClients: ReactNode;
}

const SaleLayout: FC<Props> = ({ productSales, topClients }) => {
  return (
    <Box sx={{ height: '100%' }}>
      <SubHeader sx={{ boxShadow: 'none' }} title="판매" />
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            xl: 'row',
          },
        }}
      >
        {topClients}
        {productSales}
      </Stack>
    </Box>
  );
};

export default SaleLayout;
