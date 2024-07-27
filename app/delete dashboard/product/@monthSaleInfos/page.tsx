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
    data: monthDatas,
    fetchMore,
    networkStatus,
  } = useDashboardProducts({
    from: from.startOf('month').toISOString(),
    to: from.endOf('month').toISOString(),
    limit: DASHBOARD_LIMIT,
    skip: 0,
    idenifier: 'month',
  });

  const isInitLoading = networkStatus === 2 || networkStatus === 1;
  const isLoading = isInitLoading || networkStatus === 3;
  const rows = monthDatas?.dashboardProducts?.data ?? [];
  const totalCount = monthDatas?.dashboardProducts?.totalCount ?? 0;
  const hasMore = totalCount > rows.length;
  const fetchMoreData = () => {
    if (isLoading || !hasMore) return;

    fetchMore({
      variables: {
        dashboardProductsInput: {
          from: from.startOf('month').toISOString(),
          to: from.endOf('month').toISOString(),
          limit: DASHBOARD_LIMIT,
          skip: rows.length,
          idenifier: 'month',
        },
      },
    });
  };

  if (isInitLoading) {
    return <Skeleton variant="rounded" width="100%" height={'100%'} sx={{ minHeight: '958px' }} />;
  }
  return (
    <DashboardTable
      isLoading={isLoading}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
      title={`${from.format('MM월')} BEST 제품`}
      saleInfos={rows}
    />
  );
};

export default DateSaleInfoPage;
