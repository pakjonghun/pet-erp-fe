'use client';

import DashboardTable from '@/app/dashboard/_components/Table';
import { useDashboardClients } from '@/http/graphql/hooks/client/useDashboardClients';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Skeleton } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from, to } = useReactiveVar(saleRange);

  const { data: monthDatas, networkStatus } = useDashboardClients({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const range = `${from.format('YYYY-MM-DD')}~${to.format('YYYY-MM-DD')}`;
  const isLoading = networkStatus === 2 || networkStatus === 3 || networkStatus === 1;

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={'100%'} sx={{ minHeight: '958px' }} />;
  }
  return (
    <>
      <DashboardTable
        title={`${range} BEST 거래처`}
        saleInfos={monthDatas?.dashboardClients ?? []}
      />
    </>
  );
};

export default DateSaleInfoPage;
