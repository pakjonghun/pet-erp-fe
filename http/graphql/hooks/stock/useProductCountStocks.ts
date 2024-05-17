import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductCountStocksInput } from '../../codegen/graphql';

const productCountStocks = graphql(`
  query productCountStocks($productCountStocksInput: ProductCountStocksInput!) {
    productCountStocks(productCountStocksInput: $productCountStocksInput) {
      totalCount
      data {
        name
        count
        salePrice
        wonPrice
        code
      }
    }
  }
`);

export const useProductCountStocks = (productCountStocksInput: ProductCountStocksInput) => {
  return useQuery(productCountStocks, {
    variables: {
      productCountStocksInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
