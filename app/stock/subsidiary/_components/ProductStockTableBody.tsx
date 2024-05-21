import { FC, useState } from 'react';
import { StockColumn, SubsidiaryStockColumn } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ProductStockBodyRow from './ProductStockBodyRow';
import LoadingRow from '@/components/table/LoadingRow';
import { ProductStockHeaderList } from '../constants';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<SubsidiaryStockColumn> {
  openAddStock: () => void;
  openOutStock: () => void;
  productStock: null | SubsidiaryStockColumn;
  setProductStock: (item: null | SubsidiaryStockColumn) => void;
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

  const handleClickOption = (option: any | null, product: SubsidiaryStockColumn | null) => {
    setProductStock(product);
    if (option == 'add') {
      openAddStock();
    }

    if (option == 'out') {
      openOutStock();
    }
  };

  return (
    <TableBody>
      <EmptyRow colSpan={ProductStockHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const stock = item as unknown as SubsidiaryStockColumn;
        const isLast = index === data.length - 1;
        return (
          <ProductStockBodyRow
            onClickRow={(event, stock: SubsidiaryStockColumn) => {
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
      <LoadingRow isLoading={isLoading} colSpan={ProductStockHeaderList.length} />
    </TableBody>
  );
};

export default ProductStockTableBody;
