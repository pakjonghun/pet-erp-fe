'use client';
import DashboardCard from '@/app/dashboard/_components/Card';
import DashboardCardContent from '@/app/dashboard/_components/CardContent';
import { getProfitRate } from '@/utils/sale';
import { useDashboardProduct } from '@/http/graphql/hooks/product/useDashboardProduct';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Grid, Skeleton } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from, to } = useReactiveVar(saleRange);

  const { data: rangeDate, networkStatus } = useDashboardProduct({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const isLoading = networkStatus === 2 || networkStatus === 3 || networkStatus === 1;
  const range = `${from.format('YYYY.MM.DD')} ~ ${to.format('YYYY.MM.DD.')}`;

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height="100%" sx={{ minHeight: '139px' }} />;
  }
  return (
    <DashboardCard>
      <Grid rowSpacing={3} container>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            label={`${range} 매출`}
            current={rangeDate?.dashboardProduct?.current?.accPayCost ?? 0}
            previous={rangeDate?.dashboardProduct?.previous?.accPayCost ?? 0}
          />
        </Grid>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            numberType="comma"
            label={`${range} 판매량`}
            current={rangeDate?.dashboardProduct?.current?.accCount ?? 0}
            previous={rangeDate?.dashboardProduct?.previous?.accCount ?? 0}
          />
        </Grid>

        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            label={`${range} 수익`}
            current={rangeDate?.dashboardProduct?.current?.accProfit ?? 0}
            previous={rangeDate?.dashboardProduct?.previous?.accProfit ?? 0}
          />
        </Grid>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            numberType="percent"
            label={`${range} 수익율`}
            current={getProfitRate(
              rangeDate?.dashboardProduct?.current?.accProfit ?? 0,
              rangeDate?.dashboardProduct?.current?.accPayCost ?? 0
            )}
            previous={getProfitRate(
              rangeDate?.dashboardProduct?.previous?.accProfit ?? 0,
              rangeDate?.dashboardProduct?.previous?.accPayCost ?? 0
            )}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default DateSaleInfoPage;
