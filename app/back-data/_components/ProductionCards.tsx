import { FC, useEffect, useState } from 'react';
import { Product } from '@/api/graphql/codegen/graphql';
import { useProducts } from '@/api/graphql/hooks/product/useProducts';
import { LIMIT, TABLE_MAX_HEIGHT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Grid, SxProps } from '@mui/material';
import { SelectedProductOption } from '../types';
import RemoveProductModal from './RemoveProductModal';
import EditProductModal from './EditProductModal';
import ProductDetailPopover from './ProductDetailPopover';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import ProductCard from './ProductCard';

interface Props {
  keyword: string;
  sx?: SxProps;
}

const ProductionCards: FC<Props> = ({ keyword, sx }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);
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

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', selectedProduct);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', selectedProduct);
  };

  const handleClosePopover = () => setPopoverAnchor(null);

  const scrollRef = useInfinityScroll({ callback });
  const isEmpty = rows.length === 0;

  return (
    <Grid
      sx={{
        ...sx,
        p: 2,
        maxHeight: TABLE_MAX_HEIGHT,
        overflow: 'auto',
      }}
      container
      spacing={2}
    >
      <EmptyItem isEmpty={isEmpty} />
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

      {rows.map((item, index) => {
        const product = item as unknown as Product;
        const isLast = index === rows.length - 1;
        return (
          <Grid key={product._id} item xs={12} lg={6}>
            <ProductCard
              onClickRow={(event, product: Product) => {
                setPopoverPosition({ left: event.clientX, top: event.clientY });
                setPopoverAnchor(event.currentTarget);
                setSelectedProduct(product);
              }}
              product={product}
              scrollRef={isLast ? scrollRef : null}
              onClickOption={handleClickOption}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductionCards;
