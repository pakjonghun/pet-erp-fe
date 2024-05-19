'use client';

import DashboardTable from '@/app/dashboard/_components/Table';
import { useDashboardClients } from '@/http/graphql/hooks/client/useDashboardClients';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Skeleton } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from } = useReactiveVar(saleRange);

  const { data: todayDatas, networkStatus } = useDashboardClients({
    from: from.toISOString(),
    to: from.endOf('day').toISOString(),
  });

  const isLoading = networkStatus === 2 || networkStatus === 3 || networkStatus === 1;

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={'100%'} sx={{ minHeight: '958px' }} />;
  }
  return (
    <DashboardTable
      title={`${from.format('MM월 DD일')} BEST 거래처`}
      saleInfos={todayDatas?.dashboardClients ?? []}
    />
  );
};

export default DateSaleInfoPage;
