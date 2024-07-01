'use client';

import DashboardTable from '@/app/dashboard/_components/Table';
import { DASHBOARD_LIMIT } from '@/constants';
import { useDashboardProducts } from '@/http/graphql/hooks/product/useDashboardProducts';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Skeleton } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from } = useReactiveVar(saleRange);

  const {
    data: todayDatas,
    networkStatus,
    fetchMore,
  } = useDashboardProducts({
    from: from.toISOString(),
    to: from.endOf('day').toISOString(),
    limit: DASHBOARD_LIMIT,
    skip: 0,
    idenifier: 'day',
  });

  const isInitLoading = networkStatus === 2 || networkStatus === 1;
  const isLoading = isInitLoading || networkStatus === 3;
  const rows = todayDatas?.dashboardProducts?.data ?? [];
  const totalCount = todayDatas?.dashboardProducts?.totalCount ?? 0;
  const hasMore = totalCount > rows.length;

  const fetchMoreData = () => {
    if (isLoading || !hasMore) return;

    fetchMore({
      variables: {
        dashboardProductsInput: {
          from: from.toISOString(),
          to: from.endOf('day').toISOString(),
          limit: DASHBOARD_LIMIT,
          skip: rows.length,
          idenifier: 'day',
        },
      },
    });
  };

  if (isInitLoading) {
    return <Skeleton variant="rounded" width="100%" height={'100%'} sx={{ minHeight: '958px' }} />;
  }
  return (
    <DashboardTable
      fetchMoreData={fetchMoreData}
      title={`${from.format('MM월 DD일')} BEST 제품`}
      hasMore={hasMore}
      isLoading={isLoading}
      saleInfos={rows}
    />
  );
};

export default DateSaleInfoPage;
