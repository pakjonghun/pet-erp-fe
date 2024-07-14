import { FC, useState } from 'react';
import { StockColumn } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ProductStockBodyRow from './ProductStockBodyRow';
import LoadingRow from '@/components/table/LoadingRow';
import { ProductStockHeaderList } from '../constants';
import { CommonListProps } from '@/types';
import { CommonTableBody } from '@/components/commonStyles';

interface Props extends CommonListProps<StockColumn> {
  openAddStock: () => void;
  openOutStock: () => void;
  productStock: null | StockColumn;
  setProductStock: (item: null | StockColumn) => void;
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

  const handleClickOption = (
    option: any | null,
    product: StockColumn | null
  ) => {
    setProductStock(product);
    if (option == 'add') {
      openAddStock();
    }

    if (option == 'out') {
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
    <CommonTableBody>
      <EmptyRow colSpan={ProductStockHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const stock = item as unknown as StockColumn;
        const isLast = index === data.length - 1;
        const isSelected = productStock?.productName === stock.productName;
        return (
          <ProductStockBodyRow
            isSelected={isSelected}
            onClickRow={(event, stock: StockColumn) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setProductStock(stock);
            }}
            productStock={stock}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
            key={`${index}_${item.__typename}`}
          />
        );
      })}
      <LoadingRow
        isLoading={isLoading}
        colSpan={ProductStockHeaderList.length}
      />
    </CommonTableBody>
  );
};

export default ProductStockTableBody;
