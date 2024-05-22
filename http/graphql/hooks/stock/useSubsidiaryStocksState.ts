import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

export const subsidiaryStocksState = graphql(`
  query subsidiaryStocksState($productName: String!) {
    subsidiaryStocksState(productName: $productName) {
      productName
      count
      location
      state
    }
  }
`);

export const useSubsidiaryStocksState = (productName: string) => {
  return useQuery(subsidiaryStocksState, {
    variables: {
      productName,
    },
    notifyOnNetworkStatusChange: true,
  });
};
