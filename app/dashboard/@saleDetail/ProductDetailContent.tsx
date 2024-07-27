import { FC } from 'react';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { useProductSales } from '@/http/graphql/hooks/product/useProductSaleList';
import { LIMIT } from '@/constants';

interface Props {
  dateRange: DateRange;
  keyword: string;
}

const ProductDetailContent: FC<Props> = ({ dateRange: { from, to }, keyword }) => {
  const { data, networkStatus, fetchMore } = useProductSales({
    keyword,
    limit: LIMIT,
    skip: 0,
    from: from.toISOString(),
    to: to.toISOString(),
  });

  return <div>producion</div>;
};

export default ProductDetailContent;
