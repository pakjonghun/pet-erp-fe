'use client';
import DashboardCard from '@/app/dashboard/_components/Card';
import DashboardCardContent from '@/app/dashboard/_components/CardContent';
import { getProfit, getProfitRate } from '@/utils/sale';
import { useDashboardProduct } from '@/http/graphql/hooks/product/useDashboardProduct';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Grid, Skeleton, Typography } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from } = useReactiveVar(saleRange);

  const { data: monthData, networkStatus } = useDashboardProduct({
    from: from.startOf('month').toISOString(),
    to: from.endOf('month').toISOString(),
  });

  const month = from.format('MM월');
  const isLoading = networkStatus === 2 || networkStatus === 3 || networkStatus === 1;

  const current = monthData?.dashboardProduct?.current;
  const currentProfit = current ? getProfit(current) : 0;
  const prev = monthData?.dashboardProduct?.previous;
  const prevProfit = prev ? getProfit(prev) : 0;

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
      >{`${month}`}</Typography>
      <Grid rowSpacing={3} container>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            label={`매출`}
            current={monthData?.dashboardProduct?.current?.accTotalPayment ?? 0}
            previous={monthData?.dashboardProduct?.previous?.accTotalPayment ?? 0}
          />
        </Grid>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            numberType="comma"
            label={`판매량`}
            current={monthData?.dashboardProduct?.current?.accCount ?? 0}
            previous={monthData?.dashboardProduct?.previous?.accCount ?? 0}
          />
        </Grid>

        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent label={`수익`} current={currentProfit} previous={prevProfit} />
        </Grid>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            numberType="percent"
            label={`수익율`}
            current={getProfitRate(currentProfit, current?.accPayCost ?? 0)}
            previous={getProfitRate(prevProfit, prev?.accPayCost ?? 0)}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default DateSaleInfoPage;
