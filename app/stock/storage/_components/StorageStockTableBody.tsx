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

interface Props extends CommonListProps<StockStorageOutput> {
  openAddStock: () => void;
  openOutStock: () => void;
  storageStock: null | StockStorageOutput;
  setStorageStock: (item: null | StockStorageOutput) => void;
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
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);

  const [optionType, setOptionType] = useState<null | string>(null);

  const handleClickOption = (
    option: any | null,
    stock: StockStorageOutput | null
  ) => {
    setStorageStock(storageStock);
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
    setStorageStock(null);
  };

  return (
    <TableBody>
      <EmptyRow colSpan={StockStorageHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const stock = item as unknown as StockStorageOutput;
        const isLast = index === data.length - 1;
        return (
          <StorageStockBodyRow
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
