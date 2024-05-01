'use client';

import DashboardTable from '@/app/dashboard/_components/Table';
import { useDashboardProducts } from '@/http/graphql/hooks/product/useDashboardProducts';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';

const DateSaleInfoPage = () => {
  const { from, to } = useReactiveVar(saleRange);

  const { data: todayDatas } = useDashboardProducts({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  return (
    <DashboardTable
      title={`${from.format('MM월 DD일')} BEST 제품`}
      saleInfos={todayDatas?.dashboardProducts ?? []}
    />
  );
};

export default DateSaleInfoPage;
