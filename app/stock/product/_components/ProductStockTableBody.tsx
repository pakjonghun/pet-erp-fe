import { FC, useState } from 'react';
import {
  Client,
  TotalProductStockOutput,
} from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ProductStockBodyRow from './ProductStockBodyRow';
import RemoveProductStockModal from './RemoveProductStockModal';
import ClientDetailPopover from './ClientDetailPopover';
// import { SelectOption } from '../../types';
import LoadingRow from '@/components/table/LoadingRow';
import { ClientHeaderList } from '../constants';
import EditPClientModal from './EditPClientModal';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<TotalProductStockOutput> {}

const ProductStockTableBody: FC<Props> = ({
  isLoading,
  isEmpty,
  data,
  scrollRef,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [productStock, setProductStock] =
    useState<null | TotalProductStockOutput>(null);
  // const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (
    option: any | null,
    client: TotalProductStockOutput | null
  ) => {
    setProductStock(client);
    // setOptionType(option);
  };

  const handleClickEdit = () => {
    handleClosePopover();
    // handleClickOption('edit', selectedClient);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    // handleClickOption('delete', selectedClient);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setProductStock(null);
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
      )} */}
      {/* {selectedClient && (
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
      <EmptyRow colSpan={ClientHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const stock = item as unknown as TotalProductStockOutput;
        const isLast = index === data.length - 1;
        return (
          <ProductStockBodyRow
            onClickRow={(event, stock: TotalProductStockOutput) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setProductStock(stock);
            }}
            key={stock._id}
            productStock={stock}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
      <LoadingRow isLoading={isLoading} colSpan={ClientHeaderList.length} />
    </TableBody>
  );
};

export default ProductStockTableBody;
