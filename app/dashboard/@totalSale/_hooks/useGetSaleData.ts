'use client';

import { Dayjs } from 'dayjs';
import { getNumberToString, getProfit, getProfitRate } from '@/utils/sale';
import { useDashboardClient } from '@/http/graphql/hooks/client/useDashboardClient';
import { SaleInfo } from '@/http/graphql/codegen/graphql';

interface Props {
  from: Dayjs;
  to: Dayjs;
}

const useGetSaleData = ({ from, to }: Props) => {
  const { data: todayData, loading } = useDashboardClient({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const current = todayData?.dashboardClient?.current as SaleInfo;
  const { accTotalPayment, accCount, accProfit, accProfitRate } = getSaleData(current);

  const parsedSaleInfo = {
    accTotalPayment: getNumberToString(accTotalPayment, 'comma'),
    accCount: getNumberToString(accCount, 'comma'),
    accProfit: getNumberToString(accProfit, 'comma'),
    accProfitRate: getNumberToString(accProfitRate, 'percent'),
  };

  return {
    saleInfo: parsedSaleInfo,
    loading,
  };
};

export default useGetSaleData;

function getSaleData(saleInfo?: SaleInfo) {
  const accProfit = saleInfo ? getProfit(saleInfo) : 0;
  const accTotalPayment = saleInfo?.accTotalPayment ?? 0;
  return {
    accProfit,
    accCount: saleInfo?.accCount ?? 0,
    accTotalPayment,
    accProfitRate: getProfitRate(accProfit, accTotalPayment),
  };
}
