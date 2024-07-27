'use client';

import DashboardTable from '@/app/dashboard/_components/Table';
import { DASHBOARD_LIMIT } from '@/constants';
import { useDashboardClients } from '@/http/graphql/hooks/client/useDashboardClients';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Skeleton } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from } = useReactiveVar(saleRange);
  const {
    data: todayDatas,
    networkStatus,
    fetchMore,
  } = useDashboardClients({
    from: from.toISOString(),
    to: from.endOf('day').toISOString(),
    limit: DASHBOARD_LIMIT,
    skip: 0,
    idenifier: 'day_client',
  });
  const isInitLoading = networkStatus === 2 || networkStatus === 1;
  const isLoading = isInitLoading || networkStatus === 3;
  const rows = todayDatas?.dashboardClients?.data ?? [];
  const totalCount = todayDatas?.dashboardClients?.totalCount ?? 0;
  const hasMore = totalCount > rows.length;

  const fetchMoreData = () => {
    if (isLoading || !hasMore) return;

    fetchMore({
      variables: {
        dashboardClientsInput: {
          from: from.toISOString(),
          to: from.endOf('day').toISOString(),
          limit: DASHBOARD_LIMIT,
          skip: rows.length,
          idenifier: 'day_client',
        },
      },
    });
  };

  if (isInitLoading) {
    return <Skeleton variant="rounded" width="100%" height={'100%'} sx={{ minHeight: '958px' }} />;
  }
  return (
    <DashboardTable
      title={`${from.format('MM월 DD일')} BEST 거래처`}
      saleInfos={rows}
      isLoading={isLoading}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default DateSaleInfoPage;
