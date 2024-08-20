import { FC, useEffect, useState } from 'react';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { useSaleMenuClients } from '@/http/graphql/hooks/client/useSaleMenuClients';
import { ClientSaleMenu, CommonSaleByMall } from '@/http/graphql/codegen/graphql';
import ClientSaleModal from './_components/ClientDetailModal';
import ClientCardContent from './ClientCardContent';
import ClientTableContent from './ClientTableContent';
import { Box } from '@mui/material';
import { useCommonSaleByMall } from '@/http/graphql/hooks/client/useSaleMenuDetail';

interface Props {
  sort: string;
  order: number;
  dateRange: DateRange;
  keyword: string;
  detailSort: string;
  detailOrder: number;
  setTotalDataCount: (value: number) => void;
}

const ClientDetailContent: FC<Props> = ({
  setTotalDataCount,
  dateRange: { from, to },
  keyword,
  order,
  sort,
  detailSort,
  detailOrder,
}) => {
  const { data, networkStatus } = useSaleMenuClients({
    keyword,
    from: from.toISOString(),
    to: to.toISOString(),
    order,
    sort,
    detailSort,
    detailOrder,
  });

  const { data: products } = useCommonSaleByMall({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const productByMallId = new Map<string, CommonSaleByMall[]>(
    (products?.commonSaleByMall ?? []).map((p) => {
      return [p._id, p.products ?? []];
    })
  );

  useEffect(() => {
    if (data?.saleMenuClients.totalCount == null) return;

    setTotalDataCount(data.saleMenuClients.totalCount);
  }, [data?.saleMenuClients.totalCount]);

  const [selectedClient, setSelectedClient] = useState<null | ClientSaleMenu>(null);
  const clientSaleMenu = data?.saleMenuClients.data.map((d) => {
    const products = productByMallId.get(d.name) ?? [];
    const accAdPrice = products.reduce((acc, cur) => (cur.accAdPrice ?? 0) + acc, 0);
    return { ...d, accAdPrice: Math.floor(accAdPrice), products };
  });
  const rows = (clientSaleMenu as unknown as ClientSaleMenu[]) ?? [];
  const onClickItem = (data: ClientSaleMenu) => {
    const nextItem =
      selectedClient?._id === data._id //
        ? null
        : data;
    setSelectedClient(nextItem);
  };

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
