import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { StocksInput } from '../../codegen/graphql';

export const subsidiaryStocks = graphql(`
  query subsidiaryStocks($stocksInput: StocksInput!) {
    subsidiaryStocks(stocksInput: $stocksInput) {
      totalCount
      data {
        ...SubsidiaryStockColumnFragment
      }
    }
  }
`);

export const useSubsidiaryStocks = (stocksInput: StocksInput) => {
  return useQuery(subsidiaryStocks, {
    variables: {
      stocksInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
