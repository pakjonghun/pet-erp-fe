'use client';
import DashboardCard from '@/app/dashboard/_components/Card';
import DashboardCardContent from '@/app/dashboard/_components/CardContent';
import { getProfit, getProfitRate } from '@/utils/sale';
import { useDashboardClient } from '@/http/graphql/hooks/client/useDashboardClient';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Grid, Skeleton, Typography } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from, to } = useReactiveVar(saleRange);

  const { data: monthData, networkStatus } = useDashboardClient({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const range = `${from.format('YYYY-MM-DD')}~${to.format('YYYY-MM-DD')}`;
  const isLoading = networkStatus === 2 || networkStatus === 3 || networkStatus === 1;

  const current = monthData?.dashboardClient?.current;
  const currentProfit = current ? getProfit(current) : 0;

  const prev = monthData?.dashboardClient?.previous;
  const prevProfit = prev ? getProfit(prev) : 0;

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height="100%" sx={{ minHeight: '139px' }} />;
  }
  return (
    <DashboardCard>
      <Typography sx={{ mb: 2 }} variant="body2" fontWeight="bold" color="gray">
        {range}
      </Typography>
      <Grid rowSpacing={3} container>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            label={`매출`}
            current={monthData?.dashboardClient?.current?.accTotalPayment ?? 0}
            previous={monthData?.dashboardClient?.previous?.accTotalPayment ?? 0}
          />
        </Grid>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            numberType="comma"
            label={`판매량`}
            current={monthData?.dashboardClient?.current?.accCount ?? 0}
            previous={monthData?.dashboardClient?.previous?.accCount ?? 0}
          />
        </Grid>

        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent label={`수익`} current={currentProfit} previous={prevProfit} />
        </Grid>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            numberType="percent"
            label={`수익율`}
            current={getProfitRate(currentProfit, current?.accTotalPayment ?? 0)}
            previous={getProfitRate(prevProfit, prev?.accTotalPayment ?? 0)}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default DateSaleInfoPage;
