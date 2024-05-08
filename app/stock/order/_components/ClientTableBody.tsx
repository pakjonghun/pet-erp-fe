import { FC, useState } from 'react';
import { ProductOrder } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ClientBodyRow from './ClientBodyRow';
// import { SelectOption } from '../../types';
import LoadingRow from '@/components/table/LoadingRow';
import { OrderHeaderList } from '../constants';
import { CommonListProps } from '@/types';
import EditOrderModal from './EditOrderModal';

interface Props extends CommonListProps<ProductOrder> {}

const ClientTableBody: FC<Props> = ({
  isLoading,
  isEmpty,
  data,
  scrollRef,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<null | ProductOrder>(null);
  const [optionType, setOptionType] = useState<null | any>(null);

  const handleClickOption = (
    option: any | null,
    client: ProductOrder | null
  ) => {
    setSelectedOrder(client);
    setOptionType(option);
  };

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', selectedOrder);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', selectedOrder);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setSelectedOrder(null);
  };

  return (
    <TableBody>
      {selectedOrder && (
        <EditOrderModal
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          selectedOrder={selectedOrder}
        />
      )}

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
        const order = item as unknown as ProductOrder;
        const isLast = index === data.length - 1;
        return (
          <ClientBodyRow
            onClickRow={(event, client: ProductOrder) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedOrder(client);
            }}
            key={order._id}
            client={order}
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
