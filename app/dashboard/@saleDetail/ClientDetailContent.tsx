import { FC, useEffect, useState } from 'react';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { LIMIT } from '@/constants';
import { useSaleMenuClients } from '@/http/graphql/hooks/client/useSaleMenuClients';
import { Stack } from '@mui/material';
import SaleDetailItem from './_components/SaleDetailItem';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import ClientSaleModal from './_components/ClientDetailModal';

interface Props {
  dateRange: DateRange;
  keyword: string;
  setTotalDataCount: (value: number) => void;
}

const ClientDetailContent: FC<Props> = ({
  setTotalDataCount,
  dateRange: { from, to },
  keyword,
}) => {
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
    <Stack direction="column" gap={1}>
      {rows.map((data, index) => {
        const isLast = index + 1 === rows.length;
        return (
          <SaleDetailItem
            isSelected={selectedClient?._id === data._id}
            onClickItem={onClickItem}
            scrollRef={isLast ? cardScrollRef : undefined}
            key={data._id}
            index={index + 1}
            data={data}
          />
        );
      })}
      {isLoading && <CommonLoading />}
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
    </Stack>
  );
};

export default ClientDetailContent;
