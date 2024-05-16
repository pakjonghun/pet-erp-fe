import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

const stocksOrder = graphql(`
  query stocksOrder($productName: String!) {
    stocksOrder(productName: $productName) {
      ...ProductOrderFragment
    }
  }
`);

export const useStocksOrder = (productName: string) => {
  return useQuery(stocksOrder, {
    variables: { productName },
    notifyOnNetworkStatusChange: true,
  });
};
