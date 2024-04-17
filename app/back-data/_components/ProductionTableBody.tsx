import { FC, useEffect, useState } from 'react';
import { Product } from '@/api/graphql/codegen/graphql';
import { useProducts } from '@/api/graphql/hooks/product/useProducts';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Button, Stack, TableBody, Typography } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ProductBodyRow from './ProductBodyRow';
import { SelectedProductOption } from '../types';
import BaseModal from '@/components/ui/modal/BaseModal';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import RemoveProductModal from './RemoveProductModal';

interface Props {
  keyword: string;
}

const ProductionTableBody: FC<Props> = ({ keyword }) => {
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);
  const [optionType, setOptionType] = useState<null | SelectedProductOption>(null);
  const { data, networkStatus, fetchMore, refetch } = useProducts({
    keyword,
    skip: 0,
    limit: LIMIT,
  });

  useEffect(() => {
    refetch();
  }, [keyword, refetch]);

  const rows = data?.products.data ?? [];

  const handleClickOption = (option: SelectedProductOption | null, product: Product | null) => {
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
      <BaseModal
        onClose={() => handleClickOption(null, null)}
        open={!!selectedProduct && optionType === 'edit'}
      >
        <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
          계정 삭제
        </Typography>
        <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
          해당 계정이 삭제됩니다.
        </Typography>
      </BaseModal>
      <EmptyRow colSpan={6} isEmpty={isEmpty} />
      {rows.map((item, index) => {
        const product = item as unknown as Product;
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
