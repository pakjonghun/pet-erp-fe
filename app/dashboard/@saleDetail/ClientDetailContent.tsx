import { FC, useEffect, useState } from 'react';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { LIMIT } from '@/constants';
import { useSaleMenuClients } from '@/http/graphql/hooks/client/useSaleMenuClients';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import ClientSaleModal from './_components/ClientDetailModal';
import ClientCardContent from './ClientCardContent';
import ClientTableContent from './ClientTableContent';
import { Box } from '@mui/material';

interface Props {
  sort: string;
  order: number;
  dateRange: DateRange;
  keyword: string;
  setTotalDataCount: (value: number) => void;
}

const ClientDetailContent: FC<Props> = ({
  setTotalDataCount,
  dateRange: { from, to },
  keyword,
  order,
  sort,
}) => {
  const { data, fetchMore, networkStatus } = useSaleMenuClients({
    keyword,
    from: from.toISOString(),
    to: to.toISOString(),
    limit: LIMIT,
    skip: 0,
    order,
    sort,
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
              order,
              sort,
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
      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
      >
        <ClientCardContent
          rows={rows}
          selectedClient={selectedClient}
          isLoading={isLoading}
          onClickItem={onClickItem}
          cardScrollRef={cardScrollRef}
        />
      </Box>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <ClientTableContent
          rows={rows}
          selectedClient={selectedClient}
          isLoading={isLoading}
          onClickItem={onClickItem}
          tableScrollRef={tableScrollRef}
        />
      </Box>
      {!!selectedClient && (
        <ClientSaleModal
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

export default ClientDetailContent;
