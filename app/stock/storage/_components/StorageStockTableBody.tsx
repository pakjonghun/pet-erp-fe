import { FC, Fragment, useState } from 'react';
import {
  StockStorageOutput,
  TotalProductStockOutput,
} from '@/http/graphql/codegen/graphql';
import {
  Box,
  Collapse,
  Tab,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
} from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import StorageStockBodyRow from './StorageStockBodyRow';
// import { SelectOption } from '../../types';
import LoadingRow from '@/components/table/LoadingRow';
import { StockStorageHeaderList } from '../constants';
import { CommonListProps } from '@/types';
import AddOrderModal from '../../_components/AddOrderModal';

interface Props extends CommonListProps<StockStorageOutput> {
  openAddStock: () => void;
  openOutStock: () => void;
  storageStock: null | StockStorageOutput;
  setStorageStock: (item: null | StockStorageOutput) => void;
  setProductName: (productName: string) => void;
  productName: string;
}

const StorageStockTableBody: FC<Props> = ({
  isLoading,
  isEmpty,
  data,
  scrollRef,
  openAddStock,
  openOutStock,
  storageStock,
  setStorageStock,
  setProductName,
  productName,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);

  const [optionType, setOptionType] = useState<null | string>(null);

  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openMoveModal, setOpenMoveModal] = useState(false);

  const handleClickOption = (option: any | null, stock: StockStorageOutput) => {
    setStorageStock(storageStock);
    if (option == 'add') {
      openAddStock();
      setStorageStock(stock);
    }

    if (option == 'out') {
      openOutStock();
      setStorageStock(stock);
    }

    if (option == 'order') {
      setOpenOrderModal(true);
    }

    if (option == 'move') {
      setOpenMoveModal(true);
      setStorageStock(stock);
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
    setStorageStock(null);
  };

  return (
    <TableBody>
      {/* storageStock
openOrderModal
openMoveModal */}
      {openOrderModal && (
        <AddOrderModal
          product={productName}
          open={openOrderModal}
          onClose={() => {
            setOpenOrderModal(false);
            setStorageStock(null);
          }}
        />
      )}

      <EmptyRow colSpan={StockStorageHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const stock = item as unknown as StockStorageOutput;
        const isLast = index === data.length - 1;
        return (
          <StorageStockBodyRow
            setProductName={setProductName}
            onClickRow={(event, stock: StockStorageOutput) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setStorageStock(stock);
            }}
            storageStock={stock}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
            key={`${index}_${item._id}`}
          />
        );
      })}
      <LoadingRow
        isLoading={isLoading}
        colSpan={StockStorageHeaderList.length}
      />
    </TableBody>
  );
};

export default StorageStockTableBody;
