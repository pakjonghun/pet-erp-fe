import { FC, useState } from 'react';
import { Product } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ProductBodyRow from './ProductBodyRow';
import { SelectOption } from '../../types';
import RemoveProductModal from './RemoveProductModal';
import EditProductModal from './EditProductModal';
import ProductDetailPopover from './ProductDetailPopover';
import LoadingRow from '@/components/table/LoadingRow';
import { ProductHeaderList } from '../constants';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<Product> {
  selectedProduct: null | Product;
  setSelectedProduct: (product: null | Product) => void;
}

const ProductionTableBody: FC<Props> = ({
  data,
  isLoading,
  isEmpty,
  scrollRef,
  selectedProduct,
  setSelectedProduct,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);

  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (
    option: SelectOption | null,
    product: Product | null
  ) => {
    setSelectedProduct(product);
    setOptionType(option);
  };

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', selectedProduct);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', selectedProduct);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setSelectedProduct(null);
  };

  return (
    <TableBody
      sx={{
        '& .MuiTableCell-root': {
          px: 1,
          py: 1,
          fontWeight: 500,
        },
      }}
    >
      {/* {selectedProduct && (
        <RemoveProductModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedProduct={selectedProduct}
        />
      )}

      {selectedProduct && (
        <EditProductModal
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          selectedProduct={selectedProduct}
        />
      )} */}
      {/* {selectedProduct && (
        <ProductDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedProduct={selectedProduct}
        />
      )} */}
      <EmptyRow colSpan={ProductHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const product = item as unknown as Product;
        const isLast = index === data.length - 1;
        const isSelected = selectedProduct?._id === product._id;
        return (
          <ProductBodyRow
            isSelected={isSelected}
            onClickRow={(event, product: Product) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedProduct(product);
            }}
            key={product._id}
            product={product}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
      <LoadingRow isLoading={isLoading} colSpan={ProductHeaderList.length} />
    </TableBody>
  );
};

export default ProductionTableBody;
