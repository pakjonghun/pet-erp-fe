'use client';

import { Box, Grid, Tab, Tabs } from '@mui/material';
import { DashboardTabs } from './constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SubHeader from '@/components/layout/header/SubHeader';
import DashboardCard from '@/components/dashboard/Card';
import DashboardChart from '@/components/dashboard/Chart';
import DashboardTable from '@/components/dashboard/Table';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { useReactiveVar } from '@apollo/client';
import { saleRange } from '@/store/saleStore';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import { useEffect, useState } from 'react';
import { useDashboardProduct } from '@/http/graphql/hooks/product/useDashboardProduct';
import { useDashboardProducts } from '@/http/graphql/hooks/product/useDashboardProducts';
import { getToday } from '@/components/calendar/dateFilter/utils';
import { getProfitRate } from '@/components/dashboard/utils';

export default function Home() {
  const pathname = usePathname();
  const tabs = Object.keys(DashboardTabs) as (keyof typeof DashboardTabs)[];
  const currentTabIndex = tabs.findIndex((item) => {
    return `/${item}` === pathname;
  });

  const { from, to } = useReactiveVar(saleRange);
  const setRange = (value: DateRange) => saleRange(value);
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  const { data: monthData } = useDashboardProduct({
    from: from.startOf('month').toISOString(),
    to: to.endOf('month').toISOString(),
  });

  const { data: todayData } = useDashboardProduct({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const { data: todayDatas } = useDashboardProducts({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const { data: monthDatas } = useDashboardProducts({
    from: from.startOf('month').toISOString(),
    to: to.endOf('month').toISOString(),
  });

  useEffect(() => {
    return () => {
      saleRange(getToday());
    };
  }, []);

  return (
    <Box sx={{ height: '100%', bgcolor: (theme) => theme.palette.primary.light }}>
      <SubHeader title="대시보드">
        <Tabs sx={{ mt: 2 }} value={currentTabIndex} indicatorColor="primary">
          {tabs.map((tab) => {
            const tabItem = DashboardTabs[tab];
            return (
              <Tab
                sx={{
                  transition: 'all .3s',
                  fontSize: 16,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.action.selected,
                  },
                  '&.Mui-selected': {
                    fontWeight: 800,
                  },
                }}
                href={`/${tab}`}
                component={Link}
                label={tabItem.label}
                key={tab}
              />
            );
          })}
        </Tabs>
      </SubHeader>
      <Box sx={{ p: 3 }}>
        <SwitchDate
          range={{ from, to }}
          setRange={setRange}
          searchStandard={searchStandard}
          setSearchStandard={setSearchStandard}
        />
        <Grid container rowSpacing={3} columnSpacing={3} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12} sm={6}>
                <DashboardCard
                  label="월 매출"
                  current={monthData?.dashboardProduct?.current?.accPayCost ?? 0}
                  previous={monthData?.dashboardProduct?.previous?.accPayCost ?? 0}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DashboardCard
                  numberType="comma"
                  label="월 판매수량"
                  current={monthData?.dashboardProduct?.current?.accCount ?? 0}
                  previous={monthData?.dashboardProduct?.previous?.accCount ?? 0}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DashboardCard
                  label="월 수익"
                  current={monthData?.dashboardProduct?.current?.accProfit ?? 0}
                  previous={monthData?.dashboardProduct?.previous?.accProfit ?? 0}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DashboardCard
                  numberType="percent"
                  label="월 수익율"
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12} sm={6}>
                <DashboardCard
                  label="일 매출"
                  current={todayData?.dashboardProduct?.current?.accPayCost ?? 0}
                  previous={todayData?.dashboardProduct?.previous?.accPayCost ?? 0}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DashboardCard
                  numberType="comma"
                  label="일 판매수량"
                  current={todayData?.dashboardProduct?.current?.accCount ?? 0}
                  previous={todayData?.dashboardProduct?.previous?.accCount ?? 0}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DashboardCard
                  label="일 수익"
                  current={todayData?.dashboardProduct?.current?.accProfit ?? 0}
                  previous={todayData?.dashboardProduct?.previous?.accProfit ?? 0}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DashboardCard
                  numberType="percent"
                  label="일 수익율"
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
          </Grid>
        </Grid>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12} lg={6}>
            <DashboardTable
              title={`${from.get('month') + 1}월 BEST 상품`}
              saleInfos={monthDatas?.dashboardProducts ?? []}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DashboardTable
              title={`${from.format('MM월 DD일')} BEST 상품`}
              saleInfos={todayDatas?.dashboardProducts ?? []}
            />
          </Grid>
        </Grid>
        <Box>
          <DashboardChart />
        </Box>
      </Box>
    </Box>
  );
}
