import { Grid } from '@mui/material';
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
          {dateSaleInfos}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductLayout;
