import { Box, Grid, Skeleton } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  dateSaleInfo: ReactNode;
  dateSaleInfos: ReactNode;
  monthSaleInfo: ReactNode;
  monthSaleInfos: ReactNode;
}

const ProductLayout: FC<Props> = ({
  dateSaleInfo,
  dateSaleInfos,
  monthSaleInfo,
  monthSaleInfos,
}) => {
  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          {monthSaleInfo}
        </Grid>
        <Grid item xs={12} md={6}>
          {dateSaleInfo}
        </Grid>
      </Grid>

      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12} lg={6}>
          {monthSaleInfos}
        </Grid>
        <Grid item xs={12} lg={6}>
          {/* <Skeleton variant="rounded" width="100%" height={'100%'} sx={{ minHeight: 500 }} /> */}
          {dateSaleInfos}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductLayout;
