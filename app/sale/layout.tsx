import SubHeader from '@/components/layout/header/SubHeader';
import { Stack } from '@mui/material';
import { FC, ReactNode } from 'react';
interface Props {
  productSales: ReactNode;
  topClients: ReactNode;
}

const SaleLayout: FC<Props> = ({ productSales, topClients }) => {
  return (
    <>
      <SubHeader title="판매" />
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            lg: 'row',
          },
        }}
      >
        {topClients}
        {productSales}
      </Stack>
    </>
  );
};

export default SaleLayout;
