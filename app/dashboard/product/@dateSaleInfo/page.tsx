'use client';

import DashboardCard from '@/app/dashboard/_components/Card';
import DashboardCardContent from '@/app/dashboard/_components/CardContent';
import { getProfitRate } from '@/utils/sale';
import { useDashboardProduct } from '@/http/graphql/hooks/product/useDashboardProduct';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Grid, Skeleton, Typography } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from } = useReactiveVar(saleRange);
  const date = from.format('MM월 DD일');

  const { data: todayData, networkStatus } = useDashboardProduct({
    from: from.toISOString(),
    to: from.endOf('day').toISOString(),
  });

  const isLoading = networkStatus === 2 || networkStatus === 3 || networkStatus === 1;

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height="100%" sx={{ minHeight: '139px' }} />;
  }

  return (
    <DashboardCard>
      <Typography
        sx={{ mb: 2 }}
        variant="body2"
        fontWeight="bold"
        color="gray"
      >{`${date}`}</Typography>
      <Grid rowSpacing={3} container>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            label={`매출`}
            current={todayData?.dashboardProduct?.current?.accPayCost ?? 0}
            previous={todayData?.dashboardProduct?.previous?.accPayCost ?? 0}
          />
        </Grid>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            numberType="comma"
            label={`판매량`}
            current={todayData?.dashboardProduct?.current?.accCount ?? 0}
            previous={todayData?.dashboardProduct?.previous?.accCount ?? 0}
          />
        </Grid>

        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            label={`수익`}
            current={todayData?.dashboardProduct?.current?.accProfit ?? 0}
            previous={todayData?.dashboardProduct?.previous?.accProfit ?? 0}
          />
        </Grid>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            numberType="percent"
            label={`수익율`}
            current={getProfitRate(
              todayData?.dashboardProduct?.current?.accProfit ?? 0,
              todayData?.dashboardProduct?.current?.accPayCost ?? 0
            )}
            previous={getProfitRate(
              todayData?.dashboardProduct?.previous?.accProfit ?? 0,
              todayData?.dashboardProduct?.previous?.accPayCost ?? 0
            )}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default DateSaleInfoPage;
