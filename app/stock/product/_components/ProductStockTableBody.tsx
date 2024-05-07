import { FC, useState } from 'react';
import { TotalProductStockOutput } from '@/http/graphql/codegen/graphql';
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
import AddProductStockModal from './AddProductStockModal';
import OutProductStockModal from './OutProductStockModal';

interface Props extends CommonListProps<TotalProductStockOutput> {}

const ProductStockTableBody: FC<Props> = ({ isLoading, isEmpty, data, scrollRef }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [productStock, setProductStock] = useState<null | TotalProductStockOutput>(null);
  const [optionType, setOptionType] = useState<null | string>(null);

  const handleClickOption = (option: any | null, product: TotalProductStockOutput | null) => {
    console.log(product);
    setProductStock(product);
    if (option == 'add') {
      setOpenAddStock(true);
    }

    if (option == 'out') {
      setOpenOutStock(true);
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

  const [openAddStock, setOpenAddStock] = useState(false);
  const [openOutStock, setOpenOutStock] = useState(false);

  return (
    <TableBody>
      {productStock?.product.name && (
        <AddProductStockModal
          product={productStock.product.name}
          open={openAddStock}
          onClose={() => setOpenAddStock(false)}
        />
      )}
      {productStock?.product.name && (
        <OutProductStockModal
          product={productStock.product.name}
          open={openOutStock}
          onClose={() => setOpenOutStock(false)}
        />
      )}

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
