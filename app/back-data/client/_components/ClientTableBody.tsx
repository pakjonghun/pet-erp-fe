import { FC, useEffect, useState } from 'react';
import { Product } from '@/api/graphql/codegen/graphql';
import { useProducts } from '@/api/graphql/hooks/product/useProducts';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ClientBodyRow from './ClientBodyRow';
import RemoveClientModal from './RemoveClientModal';
import EditClientModal from './EditClientModal';
import ClientDetailPopover from './ClientDetailPopover';
import { SelectOption } from '../../types';

interface Props {
  keyword: string;
}

const ClientTableBody: FC<Props> = ({ keyword }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = useState<null | Product>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);
  const { data, networkStatus, fetchMore, refetch, client } = useProducts({
    keyword,
    skip: 0,
    limit: LIMIT,
  });

  useEffect(() => {
    refetch();
  }, [keyword, client, refetch]);

  const rows = data?.products.data ?? [];

  const handleClickOption = (option: SelectOption | null, product: Product | null) => {
    setSelectedClient(product);
    setOptionType(option);
  };

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (networkStatus != 3 && networkStatus != 1) {
        const totalCount = data?.products.totalCount;
        if (totalCount != null && totalCount > rows.length) {
          fetchMore({
            variables: {
              productsInput: {
                keyword,
                skip: rows.length,
                limit: LIMIT,
              },
            },
          });
        }
      }
    }
  };

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', selectedClient);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', selectedClient);
  };

  const handleClosePopover = () => setPopoverAnchor(null);

  const scrollRef = useInfinityScroll({ callback });
  const isEmpty = rows.length === 0;

  return (
    <TableBody>
      {selectedClient && (
        <RemoveClientModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedClient={selectedClient}
        />
      )}

      {selectedClient && (
        <EditClientModal
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          selectedClient={selectedClient}
        />
      )}
      {selectedClient && (
        <ClientDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedClient={selectedClient}
        />
      )}
      <EmptyRow colSpan={6} isEmpty={isEmpty} />
      {rows.map((item, index) => {
        const product = item as unknown as Product;
        const isLast = index === rows.length - 1;
        return (
          <ClientBodyRow
            onClickRow={(event, product: Product) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedClient(product);
            }}
            key={product._id}
            product={product}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
    </TableBody>
  );
};

export default ClientTableBody;
