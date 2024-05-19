import { FC, ReactNode } from 'react';
import { Grid } from '@mui/material';

interface Props {
  dateSaleInfo: ReactNode;
  dateSaleInfos: ReactNode;
  monthSaleInfo: ReactNode;
  monthSaleInfos: ReactNode;
  rangeSaleInfo: ReactNode;
  rangeSaleInfos: ReactNode;
}

const ProductLayout: FC<Props> = ({
  dateSaleInfo,
  dateSaleInfos,
  monthSaleInfo,
  monthSaleInfos,
  rangeSaleInfo,
  rangeSaleInfos,
}) => {
  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          {monthSaleInfo}
        </Grid>
        <Grid item xs={12} md={6}>
          {dateSaleInfo}
        </Grid>
      </Grid>
      <Grid container sx={{ my: 2 }} rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12} lg={6}>
          {monthSaleInfos}
        </Grid>
        <Grid item xs={12} lg={6}>
          {dateSaleInfos}
        </Grid>
      </Grid>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12} lg={6}>
          {rangeSaleInfo}
        </Grid>
        <Grid item xs={12} lg={6}>
          {rangeSaleInfos}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductLayout;
