import { EMPTY } from '@/constants';
import { Product } from '@/http/graphql/codegen/graphql';

export function getProductList(productList?: Product[] | null) {
  const isEmpty = !productList || !productList[0]?.name || productList.length === 0;
  if (isEmpty) return EMPTY;

  const productNameList = productList.map((item) => item.name).join(', ');
  return productNameList;
}
