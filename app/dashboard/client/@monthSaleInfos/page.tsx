'use client';

import DashboardTable from '@/app/dashboard/_components/Table';
import { useDashboardClients } from '@/http/graphql/hooks/client/useDashboardClients';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';
import { Skeleton } from '@mui/material';

const DateSaleInfoPage = () => {
  const { from } = useReactiveVar(saleRange);

  const { data: monthDatas, networkStatus } = useDashboardClients({
    from: from.startOf('month').toISOString(),
    to: from.endOf('month').toISOString(),
  });

  const isLoading = networkStatus === 2 || networkStatus === 3 || networkStatus === 1;

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={'100%'} sx={{ minHeight: '958px' }} />;
  }
  return (
    <>
      <DashboardTable
        title={`${from.format('MM월')} BEST 거래처`}
        saleInfos={monthDatas?.dashboardClients ?? []}
      />
    </>
  );
};

export default DateSaleInfoPage;
