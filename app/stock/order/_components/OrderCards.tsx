import { FC, useState } from 'react';
import { ProductOrder } from '@/http/graphql/codegen/graphql';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import OrderCard from './OrderCard';
import LoadingCard from '../../../../components/ui/loading/LoadingCard';
import { CommonListProps } from '@/types';
import EditOrderModal from '../../_components/EditOrderModal';
import RemoveOrderModal from '../../_components/RemoveOrderModal';
import OrderDetailPopover from './OrderDetailPopover';

interface Props extends CommonListProps<ProductOrder> {
  sx?: SxProps;
}

const OrderCards: FC<Props> = ({ isLoading, isEmpty, data, scrollRef, sx }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<null | ProductOrder>(null);
  const [optionType, setOptionType] = useState<null | any>(null);

  const handleClickOption = (option: any | null, client: ProductOrder | null) => {
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
    <Grid
      sx={{
        ...sx,
        p: 2,
        maxHeight: TABLE_MAX_HEIGHT,
        overflow: 'auto',
      }}
      container
      spacing={2}
    >
      <EmptyItem isEmpty={isEmpty} />

      {selectedOrder && (
        <EditOrderModal
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          selectedOrder={selectedOrder}
        />
      )}

      {selectedOrder && (
        <RemoveOrderModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedOrder={selectedOrder}
        />
      )}

      {selectedOrder && (
        <OrderDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedOrder={selectedOrder}
        />
      )}

      {data.map((item, index) => {
        const client = item as unknown as ProductOrder;
        const isLast = index === data.length - 1;
        return (
          <Grid key={client._id} item xs={12} lg={6}>
            <OrderCard
              onClickRow={(event, client: ProductOrder) => {
                setPopoverPosition({ left: event.clientX, top: event.clientY });
                setPopoverAnchor(event.currentTarget);
                setSelectedOrder(client);
              }}
              client={client}
              scrollRef={isLast ? scrollRef : null}
              onClickOption={handleClickOption}
            />
          </Grid>
        );
      })}
      <LoadingCard isLoading={isLoading} />
    </Grid>
  );
};

export default OrderCards;
