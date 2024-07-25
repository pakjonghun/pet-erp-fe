'use client';

import { FC, ReactNode, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { saleRange } from '@/store/saleStore';
import { client } from '@/http/graphql/client';

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
  const { from, to } = useReactiveVar(saleRange);

  useEffect(() => {
    const cache = client.cache;
    cache.evict({ fieldName: 'dashboardClients' });
    cache.evict({ fieldName: 'dashboardProducts' });
    cache.gc();
    // })
  }, [from, to]);

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} xl={4}>
          {monthSaleInfo}
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          {dateSaleInfo}
        </Grid>
        <Grid item xs={12} xl={4}>
          {rangeSaleInfo}
        </Grid>
      </Grid>

      <Grid sx={{ my: 2 }} container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12} md={6} xl={4}>
          {monthSaleInfos}
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          {dateSaleInfos}
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          {rangeSaleInfos}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductLayout;
