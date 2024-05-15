import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { StocksInput } from '../../codegen/graphql';

export const stocks = graphql(`
  query stocks($stocksInput: StocksInput!) {
    stocks(stocksInput: $stocksInput) {
      totalCount
      data {
        ...StockColumnFragment
      }
    }
  }
`);

export const useStocks = (stocksInput: StocksInput) => {
  return useQuery(stocks, {
    variables: {
      stocksInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
