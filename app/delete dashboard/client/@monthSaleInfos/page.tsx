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
    data: monthDatas,
    networkStatus,
    fetchMore,
  } = useDashboardClients({
    from: from.startOf('month').toISOString(),
    to: from.endOf('month').toISOString(),
    skip: 0,
    limit: DASHBOARD_LIMIT,
    idenifier: 'month_client',
  });

  const isInitLoading = networkStatus === 2 || networkStatus === 1;
  const isLoading = isInitLoading || networkStatus === 3;
  const rows = monthDatas?.dashboardClients?.data ?? [];
  const totalCount = monthDatas?.dashboardClients?.totalCount ?? 0;
  const hasMore = totalCount > rows.length;

  const fetchMoreData = () => {
    if (isLoading || !hasMore) return;

    fetchMore({
      variables: {
        dashboardClientsInput: {
          from: from.startOf('month').toISOString(),
          to: from.endOf('month').toISOString(),
          limit: DASHBOARD_LIMIT,
          skip: rows.length,
          idenifier: 'month_client',
        },
      },
    });
  };

  if (isInitLoading) {
    return <Skeleton variant="rounded" width="100%" height={'100%'} sx={{ minHeight: '958px' }} />;
  }
  return (
    <DashboardTable
      title={`${from.format('MM월')} BEST 거래처`}
      saleInfos={rows}
      isLoading={isLoading}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default DateSaleInfoPage;
