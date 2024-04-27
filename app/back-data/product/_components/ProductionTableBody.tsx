import { FC, useState } from 'react';
import { Product } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ProductBodyRow from './ProductBodyRow';
import { CommonListProps, SelectOption } from '../../types';
import RemoveProductModal from './RemoveProductModal';
import EditProductModal from './EditProductModal';
import ProductDetailPopover from './ProductDetailPopover';
import LoadingRow from '@/components/table/LoadingRow';
import { ProductHeaderList } from '../constants';

interface Props extends CommonListProps<Product> {}

const ProductionTableBody: FC<Props> = ({ data, isLoading, isEmpty, scrollRef }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (option: SelectOption | null, product: Product | null) => {
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
    <TableBody>
      {selectedProduct && (
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
      )}
      {selectedProduct && (
        <ProductDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedProduct={selectedProduct}
        />
      )}
      <EmptyRow colSpan={ProductHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const product = item as unknown as Product;
        const isLast = index === data.length - 1;
        return (
          <ProductBodyRow
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
