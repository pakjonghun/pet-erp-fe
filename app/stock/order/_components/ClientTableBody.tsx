import { FC, useState } from 'react';
import { Client, ProductOrder } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ClientBodyRow from './ClientBodyRow';
import RemoveClientModal from './RemoveClientModal';
import ClientDetailPopover from './ClientDetailPopover';
// import { SelectOption } from '../../types';
import LoadingRow from '@/components/table/LoadingRow';
import { OrderHeaderList } from '../constants';
import EditPClientModal from './EditPClientModal';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<ProductOrder> {}

const ClientTableBody: FC<Props> = ({
  isLoading,
  isEmpty,
  data,
  scrollRef,
}) => {
  console.log('data : ', data);
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = useState<null | ProductOrder>(
    null
  );
  const [optionType, setOptionType] = useState<null | any>(null);

  const handleClickOption = (
    option: any | null,
    client: ProductOrder | null
  ) => {
    setSelectedClient(client);
    setOptionType(option);
  };

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', selectedClient);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', selectedClient);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setSelectedClient(null);
  };

  return (
    <TableBody>
      {/* {selectedClient && (
        <RemoveClientModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedClient={selectedClient}
        />
      )}

      {selectedClient && (
        <EditPClientModal
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
      )} */}
      <EmptyRow colSpan={OrderHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const client = item as unknown as ProductOrder;
        const isLast = index === data.length - 1;
        return (
          <ClientBodyRow
            onClickRow={(event, client: ProductOrder) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedClient(client);
            }}
            key={client._id}
            client={client}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
      <LoadingRow isLoading={isLoading} colSpan={OrderHeaderList.length} />
    </TableBody>
  );
};

export default ClientTableBody;
