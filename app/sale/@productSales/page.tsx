'use client';

import { useProductSales } from '@/api/graphql/hooks/product/useProductSaleList';

const ProductSales = () => {
  const { data } = useProductSales({ keywordTarget: 'code', keyword: '', limit: 10, skip: 0 });
  return <div>productSales</div>;
};

export default ProductSales;
