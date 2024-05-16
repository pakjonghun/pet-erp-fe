import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

export const stocksState = graphql(`
  query stocksState($productName: String!) {
    stocksState(productName: $productName) {
      productName
      count
      location
      orderCompleteDate
      state
    }
  }
`);

export const useStocksState = (productName: string) => {
  return useQuery(stocksState, {
    variables: {
      productName,
    },
    notifyOnNetworkStatusChange: true,
  });
};
