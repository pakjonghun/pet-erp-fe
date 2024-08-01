import { FC, useEffect, useState } from 'react';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { LIMIT } from '@/constants';
import { useSaleMenuClients } from '@/http/graphql/hooks/client/useSaleMenuClients';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import ClientSaleModal from './_components/ClientDetailModal';
import ClientTableContent from './ClientTableContent';
import ProductCardContent from './ProductCardContent';
import ProductTableContent from './ProductTableContent';
import ProductDetailModal from './_components/ProductDetailModal';

interface Props {
  dateRange: DateRange;
  keyword: string;
  setTotalDataCount: (value: number) => void;
}

const ProductContent: FC<Props> = ({ setTotalDataCount, dateRange: { from, to }, keyword }) => {
  const { data, fetchMore, networkStatus } = useSaleMenuClients({
    keyword,
    from: from.toISOString(),
    to: to.toISOString(),
    limit: LIMIT,
    skip: 0,
  });

  useEffect(() => {
    if (data?.saleMenuClients.totalCount == null) return;

    setTotalDataCount(data.saleMenuClients.totalCount);
  }, [data?.saleMenuClients.totalCount]);

  const [selectedClient, setSelectedClient] = useState<null | ClientSaleMenu>(null);
  const rows = (data?.saleMenuClients.data as ClientSaleMenu[]) ?? [];

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.saleMenuClients?.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            saleMenuClientsInput: {
              keyword,
              skip: rows.length,
              limit: LIMIT,
              from: from.toISOString(),
              to: to.toISOString(),
            },
          },
        });
      }
    }
  };

  const onClickItem = (data: ClientSaleMenu) => {
    const nextItem =
      selectedClient?._id === data._id //
        ? null
        : data;
    setSelectedClient(nextItem);
  };

  const tableScrollRef = useInfinityScroll({ callback });
  const cardScrollRef = useInfinityScroll({ callback });

  const isLoading = networkStatus <= 3;

  return (
    <>
      <ProductCardContent
        rows={rows}
        selectedProduct={selectedClient}
        isLoading={isLoading}
        onClickItem={onClickItem}
        cardScrollRef={cardScrollRef}
      />
      <ProductTableContent
        rows={rows}
        selectedClient={selectedClient}
        isLoading={isLoading}
        onClickItem={onClickItem}
        tableScrollRef={tableScrollRef}
      />

      {!!selectedClient && (
        <ProductDetailModal
          initDateRange={{ from, to }}
          onClose={() => {
            setSelectedClient(null);
          }}
          open={!!selectedClient}
          selectedClient={selectedClient}
        />
      )}
    </>
  );
};

export default ProductContent;
