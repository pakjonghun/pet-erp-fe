import { FC, useEffect, useState } from 'react';
import { ProductOutput } from '@/api/graphql/codegen/graphql';
import { useProducts } from '@/api/graphql/hooks/product/useProducts';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ProductBodyRow from './ProductBodyRow';
import { SelectedProductOption } from '../types';
import RemoveProductModal from './RemoveProductModal';
import EditProductModal from './EditProductModal';

interface Props {
  keyword: string;
}

const ProductionTableBody: FC<Props> = ({ keyword }) => {
  const [selectedProduct, setSelectedProduct] = useState<null | ProductOutput>(null);
  const [optionType, setOptionType] = useState<null | SelectedProductOption>(null);
  const { data, networkStatus, fetchMore, refetch, client } = useProducts({
    keyword,
    skip: 0,
    limit: LIMIT,
  });

  useEffect(() => {
    refetch();
  }, [keyword, client, refetch]);

  const rows = data?.products.data ?? [];

  const handleClickOption = (
    option: SelectedProductOption | null,
    product: ProductOutput | null
  ) => {
    setSelectedProduct(product);
    setOptionType(option);
  };

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (networkStatus != 3 && networkStatus != 1) {
        const totalCount = data?.products.totalCount;
        if (totalCount != null && totalCount > rows.length) {
          fetchMore({
            variables: {
              productsInput: {
                keyword,
                skip: rows.length,
                limit: LIMIT,
              },
            },
          });
        }
      }
    }
  };

  const scrollRef = useInfinityScroll({ callback });
  const isEmpty = rows.length === 0;

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

      <EmptyRow colSpan={6} isEmpty={isEmpty} />
      {rows.map((item, index) => {
        const product = item as unknown as ProductOutput;
        const isLast = index === rows.length - 1;
        return (
          <ProductBodyRow
            key={product._id}
            product={product}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
    </TableBody>
  );
};

export default ProductionTableBody;
