import { FC, useState } from 'react';
import { ProductOrder } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import OrderBodyRow from './OrderBodyRow';
import LoadingRow from '@/components/table/LoadingRow';
import { OrderHeaderList } from '../constants';
import { CommonListProps } from '@/types';
import EditOrderModal from '../../_components/EditOrderModal';
import RemoveOrderModal from '../../_components/RemoveOrderModal';
import OrderDetailPopover from './OrderDetailPopover';
import { CommonTableBody } from '@/components/commonStyles';

interface Props extends CommonListProps<ProductOrder> {
  selectedOrder: ProductOrder | null;
  setSelectedOrder: (item: ProductOrder | null) => void;
}

const OrderTableBody: FC<Props> = ({
  isLoading,
  isEmpty,
  data,
  scrollRef,
  selectedOrder,
  setSelectedOrder,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);

  const handleClickOption = (option: any | null, client: ProductOrder | null) => {
    setSelectedOrder(client);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setSelectedOrder(null);
  };

  return (
    <CommonTableBody>
      <EmptyRow colSpan={OrderHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const order = item as unknown as ProductOrder;
        const isLast = index === data.length - 1;
        const isSelected = item._id === selectedOrder?._id;
        return (
          <OrderBodyRow
            isSelected={isSelected}
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
    </CommonTableBody>
  );
};

export default OrderTableBody;
