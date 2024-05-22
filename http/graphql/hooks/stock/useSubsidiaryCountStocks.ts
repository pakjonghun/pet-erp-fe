import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductCountStocksInput } from '../../codegen/graphql';

const subsidiaryCountStocks = graphql(`
  query subsidiaryCountStocks($productCountStocksInput: ProductCountStocksInput!) {
    subsidiaryCountStocks(productCountStocksInput: $productCountStocksInput) {
      totalCount
      data {
        name
        count
      }
    }
  }
`);

export const useSubsidiaryCountStocks = (
  productCountStocksInput: ProductCountStocksInput,
  skip = false
) => {
  return useQuery(subsidiaryCountStocks, {
    variables: {
      productCountStocksInput,
    },
    notifyOnNetworkStatusChange: true,
    skip,
  });
};
