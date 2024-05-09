import { FC, Fragment, useState } from 'react';
import { TotalProductStockOutput } from '@/http/graphql/codegen/graphql';
import { Box, Collapse, Tab, TableBody, TableCell, TableRow, Tabs } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ProductStockBodyRow from './ProductStockBodyRow';
// import { SelectOption } from '../../types';
import LoadingRow from '@/components/table/LoadingRow';
import { ClientHeaderList } from '../constants';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<TotalProductStockOutput> {
  openAddStock: () => void;
  openOutStock: () => void;
  productStock: null | TotalProductStockOutput;
  setProductStock: (item: null | TotalProductStockOutput) => void;
}

const ProductStockTableBody: FC<Props> = ({
  isLoading,
  isEmpty,
  data,
  scrollRef,
  openAddStock,
  openOutStock,
  productStock,
  setProductStock,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);

  const [optionType, setOptionType] = useState<null | string>(null);

  const handleClickOption = (option: any | null, product: TotalProductStockOutput | null) => {
    setProductStock(product);
    if (option == 'add') {
      console.log('add');
      openAddStock();
    }

    if (option == 'out') {
      console.log('out');
      openOutStock();
    }
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
            productStock={stock}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
            key={`${index}_${item._id}`}
          />
        );
      })}
      <LoadingRow isLoading={isLoading} colSpan={ClientHeaderList.length} />
    </TableBody>
  );
};

export default ProductStockTableBody;
