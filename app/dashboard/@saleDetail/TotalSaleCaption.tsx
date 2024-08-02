import { FC } from 'react';
import useGetSaleData from '../_hooks/useGetSaleData';
import TotalSaleText from '../_components/TotalSaleText';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { DateRange } from '@/components/calendar/dateFilter/type';

interface Props {
  dateRange: DateRange;
}

const TotalSaleCaption: FC<Props> = ({ dateRange: { from, to } }) => {
  const saleData = useGetSaleData({ from, to });

  return <TotalSaleText hasFullText saleInfo={saleData.saleInfo} />;
};

export default TotalSaleCaption;
