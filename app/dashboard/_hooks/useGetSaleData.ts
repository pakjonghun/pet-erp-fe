'use client';

import { Dayjs } from 'dayjs';
import { getNumberToString, getProfit, getProfitRate } from '@/utils/sale';
import { useTotalSale } from '@/http/graphql/hooks/sale/useTotalSale';
import { SaleInfo } from '@/http/graphql/codegen/graphql';
import { useAdTotals } from '@/http/graphql/hooks/ad/useAdTotals';

interface Props {
  from: Dayjs;
  to: Dayjs;
}

const useGetSaleData = ({ from, to }: Props) => {
  const { data: todayData, loading } = useTotalSale({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const { data: adTotal } = useAdTotals({ from: from.toISOString(), to: to.toISOString() });

  const current = todayData?.totalSale?.current as SaleInfo;
  const accAdPrice = Math.floor(adTotal?.adsTotal.accPrice ?? 0);
  const { accTotalPayment, accCount, accProfit, accProfitRate } = getSaleData(current, accAdPrice);

  const parsedSaleInfo = {
    accTotalPayment: getNumberToString(accTotalPayment, 'comma'),
    accCount: getNumberToString(accCount, 'comma'),
    accProfit: getNumberToString(accProfit, 'comma'),
    accAdPrice: getNumberToString(accAdPrice, 'comma'),
    accProfitRate: getNumberToString(accProfitRate, 'percent'),
  };

  return {
    saleInfo: parsedSaleInfo,
    loading,
  };
};

export default useGetSaleData;

function getSaleData(saleInfo?: SaleInfo, addPrice?: number) {
  const accProfit = saleInfo ? getProfit(saleInfo, addPrice) : 0;
  const accTotalPayment = saleInfo?.accTotalPayment ?? 0;
  return {
    accProfit,
    accCount: saleInfo?.accCount ?? 0,
    accTotalPayment,
    accProfitRate: getProfitRate(accProfit, accTotalPayment),
  };
}
