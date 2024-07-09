import { FC, useState } from 'react';
import { Product } from '@/http/graphql/codegen/graphql';
import EmptyRow from '@/components/table/EmptyRow';
import ProductBodyRow from './ProductBodyRow';
import { SelectOption } from '../../types';
import LoadingRow from '@/components/table/LoadingRow';
import { ProductHeaderList } from '../constants';
import { CommonListProps } from '@/types';
import { CommonTableBody } from '@/components/commonStyles';

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

  const handleClickOption = (option: SelectOption | null, product: Product | null) => {
    setSelectedProduct(product);
    setOptionType(option);
  };

  return (
    <CommonTableBody>
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
    </CommonTableBody>
  );
};

export default ProductionTableBody;
