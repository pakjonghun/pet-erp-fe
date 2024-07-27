import { Dayjs } from 'dayjs';
import { FC } from 'react';
import useGetSaleData from '../_hooks/useGetSaleData';
import TotalSaleText from '../_components/TotalSaleText';
import CommonLoading from '@/components/ui/loading/CommonLoading';

interface Props {
  from: Dayjs;
  to: Dayjs;
}

const TotalSaleCaption: FC<Props> = ({ from, to }) => {
  const saleData = useGetSaleData({ from, to });

  if (saleData.loading) {
    return <CommonLoading />;
  }

  return <TotalSaleText hasFullText saleInfo={saleData.saleInfo} />;
};

export default TotalSaleCaption;
