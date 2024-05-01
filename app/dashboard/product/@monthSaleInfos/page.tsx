'use client';

import DashboardTable from '@/app/dashboard/_components/Table';
import { useDashboardProducts } from '@/http/graphql/hooks/product/useDashboardProducts';
import { saleRange } from '@/store/saleStore';
import { useReactiveVar } from '@apollo/client';

const DateSaleInfoPage = () => {
  const { from, to } = useReactiveVar(saleRange);

  const { data: monthDatas } = useDashboardProducts({
    from: from.startOf('month').toISOString(),
    to: to.endOf('month').toISOString(),
  });
  return (
    <>
      <DashboardTable
        title={`${from.format('MM월')} BEST 제품`}
        saleInfos={monthDatas?.dashboardProducts ?? []}
      />
    </>
  );
};

export default DateSaleInfoPage;
