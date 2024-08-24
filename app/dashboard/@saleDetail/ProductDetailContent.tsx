import { FC, useEffect, useState } from 'react';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { useProductSales } from '@/http/graphql/hooks/product/useProductSaleList';
import { CommonSaleByProductOutput, ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import ProductCardContent from './ProductCardContent';
import ProductTableContent from './ProductTableContent';
import ProductDetailModal from './_components/ProductDetailModal';
import { Box } from '@mui/material';
import { useCommonSaleByProduct } from '@/http/graphql/hooks/client/useCommonSaleByProduct';

interface Props {
  dateRange: DateRange;
  keyword: string;
  setTotalDataCount: (value: number) => void;
  sort: string;
  order: number;
}

const ProductDetailContent: FC<Props> = ({
  setTotalDataCount,
  dateRange: { from, to },
  keyword,
  sort,
  order,
}) => {
  const { data, networkStatus } = useProductSales({
    keyword,
    from: from.toISOString(),
    to: to.toISOString(),
    sort,
    order,
  });

  const { data: products } = useCommonSaleByProduct({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const productByProductCode = new Map<string, CommonSaleByProductOutput>(
    (products?.commonSaleByProduct ?? []).map((p) => [p._id, p])
  );

  useEffect(() => {
    if (data?.productSales?.totalCount == null) return;

    setTotalDataCount(data.productSales.totalCount);
  }, [data?.productSales?.totalCount]);

  const [selectedProduct, setSelectedProduct] = useState<null | ProductSaleMenu>(null);
  const rows: ProductSaleMenu[] = (data?.productSales?.data ?? []).map((d) => {
    const productCode = d.code;
    const targetProduct = productByProductCode.get(productCode);
    const result = {
      ...d,
      clients: targetProduct?.clients ?? [],
    };

    return result as ProductSaleMenu;
  });

  const onClickItem = (data: ProductSaleMenu) => {
    const nextItem =
      selectedProduct?.code === data.code //
        ? null
        : data;
    setSelectedProduct(nextItem);
  };

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
        <ProductTableContent rows={rows} isLoading={isLoading} onClickItem={onClickItem} />
      </Box>

      {!!selectedProduct && (
        <ProductDetailModal
          setSelectedProduct={setSelectedProduct}
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
