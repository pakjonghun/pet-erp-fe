import { FC, useEffect, useState } from 'react';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useProductSales } from '@/http/graphql/hooks/product/useProductSaleList';
import { ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import ProductCardContent from './ProductCardContent';
import ProductTableContent from './ProductTableContent';
import ProductDetailModal from './_components/ProductDetailModal';
import { Box } from '@mui/material';

interface Props {
  dateRange: DateRange;
  keyword: string;
  setTotalDataCount: (value: number) => void;
}

const ProductDetailContent: FC<Props> = ({
  setTotalDataCount,
  dateRange: { from, to },
  keyword,
}) => {
  const { data, fetchMore, networkStatus } = useProductSales({
    keyword,
    from: from.toISOString(),
    to: to.toISOString(),
    limit: LIMIT,
    skip: 0,
  });

  useEffect(() => {
    if (data?.productSales?.totalCount == null) return;

    setTotalDataCount(data.productSales.totalCount);
  }, [data?.productSales?.totalCount]);

  const [selectedProduct, setSelectedProduct] = useState<null | ProductSaleMenu>(null);
  const rows = (data?.productSales?.data as ProductSaleMenu[]) ?? [];

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.productSales?.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            productSalesInput: {
              keyword,
              skip: rows.length,
              limit: LIMIT,
              from: from.toISOString(),
              to: to.toISOString(),
            },
          },
        });
      }
    }
  };

  const onClickItem = (data: ProductSaleMenu) => {
    const nextItem =
      selectedProduct?.code === data.code //
        ? null
        : data;
    setSelectedProduct(nextItem);
  };

  const tableScrollRef = useInfinityScroll({ callback });
  const cardScrollRef = useInfinityScroll({ callback });
  const isLoading = networkStatus <= 3;

  return (
    <>
      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
      >
        <ProductCardContent
          rows={rows}
          selectedProduct={selectedProduct}
          isLoading={isLoading}
          onClickItem={onClickItem}
          cardScrollRef={cardScrollRef}
        />
      </Box>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <ProductTableContent
          rows={rows}
          isLoading={isLoading}
          onClickItem={onClickItem}
          tableScrollRef={tableScrollRef}
        />
      </Box>

      {!!selectedProduct && (
        <ProductDetailModal
          initDateRange={{ from, to }}
          onClose={() => {
            setSelectedProduct(null);
          }}
          open={!!selectedProduct}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
};

export default ProductDetailContent;
