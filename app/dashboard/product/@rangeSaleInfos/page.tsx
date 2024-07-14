'use client';

import DashboardTable from '@/app/dashboard/_components/Table';
import { DASHBOARD_LIMIT } from '@/constants';
import { useDashboardProducts } from '@/http/graphql/hooks/product/useDashboardProducts';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Skeleton } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from, to } = useReactiveVar(saleRange);
  const range = `${from.format('YYYY.MM.DD')} ~ ${to.format('YYYY.MM.DD.')}`;

  const {
    data: monthDatas,
    networkStatus,
    fetchMore,
  } = useDashboardProducts({
    from: from.toISOString(),
    to: to.toISOString(),
    limit: DASHBOARD_LIMIT,
    skip: 0,
    idenifier: 'range',
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
          from: from.toISOString(),
          to: to.toISOString(),
          limit: DASHBOARD_LIMIT,
          skip: rows.length,
          idenifier: 'range',
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
      hasMore={hasMore}
      isLoading={isLoading}
      title={`${range} BEST 제품`}
      saleInfos={rows}
    />
  );
};

export default DateSaleInfoPage;
