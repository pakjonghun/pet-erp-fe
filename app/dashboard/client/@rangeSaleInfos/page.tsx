'use client';

import DashboardTable from '@/app/dashboard/_components/Table';
import { DASHBOARD_LIMIT } from '@/constants';
import { useDashboardClients } from '@/http/graphql/hooks/client/useDashboardClients';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Skeleton } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from, to } = useReactiveVar(saleRange);

  const {
    data: rangeData,
    networkStatus,
    fetchMore,
  } = useDashboardClients({
    from: from.toISOString(),
    to: to.toISOString(),
    limit: DASHBOARD_LIMIT,
    skip: 0,
    idenifier: 'range_client',
  });

  const range = `${from.format('YYYY-MM-DD')}~${to.format('YYYY-MM-DD')}`;
  const isInitLoading = networkStatus === 2 || networkStatus === 1;
  const isLoading = isInitLoading || networkStatus === 3;
  const rows = rangeData?.dashboardClients?.data ?? [];
  const totalCount = rangeData?.dashboardClients?.totalCount ?? 0;
  const hasMore = totalCount > rows.length;
  const fetchMoreData = () => {
    if (isLoading || !hasMore) return;

    fetchMore({
      variables: {
        dashboardClientsInput: {
          from: from.toISOString(),
          to: to.toISOString(),
          limit: DASHBOARD_LIMIT,
          skip: rows.length,
          idenifier: 'range_client',
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
      saleInfos={rows}
      title={`${range} BEST 거래처`}
    />
  );
};

export default DateSaleInfoPage;
