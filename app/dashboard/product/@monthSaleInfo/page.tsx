'use client';
import DashboardCard from '@/app/dashboard/_components/Card';
import DashboardCardContent from '@/app/dashboard/_components/CardContent';
import { getProfitRate } from '@/app/dashboard/utils';
import { useDashboardProduct } from '@/http/graphql/hooks/product/useDashboardProduct';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Grid } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from, to } = useReactiveVar(saleRange);

  const { data: monthData } = useDashboardProduct({
    from: from.startOf('month').toISOString(),
    to: to.endOf('month').toISOString(),
  });

  const month = from.format('MM월');
  return (
    <DashboardCard>
      <Grid rowSpacing={3} container>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            label={`${month} 매출`}
            current={monthData?.dashboardProduct?.current?.accPayCost ?? 0}
            previous={monthData?.dashboardProduct?.previous?.accPayCost ?? 0}
          />
        </Grid>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            numberType="comma"
            label={`${month} 판매량`}
            current={monthData?.dashboardProduct?.current?.accCount ?? 0}
            previous={monthData?.dashboardProduct?.previous?.accCount ?? 0}
          />
        </Grid>

        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            label={`${month} 수익`}
            current={monthData?.dashboardProduct?.current?.accProfit ?? 0}
            previous={monthData?.dashboardProduct?.previous?.accProfit ?? 0}
          />
        </Grid>
        <Grid item xs={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DashboardCardContent
            numberType="percent"
            label={`${month} 수익율`}
            current={getProfitRate(
              monthData?.dashboardProduct?.current?.accProfit ?? 0,
              monthData?.dashboardProduct?.current?.accPayCost ?? 0
            )}
            previous={getProfitRate(
              monthData?.dashboardProduct?.previous?.accProfit ?? 0,
              monthData?.dashboardProduct?.previous?.accPayCost ?? 0
            )}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default DateSaleInfoPage;
