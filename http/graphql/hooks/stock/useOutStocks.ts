import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const outStock = graphql(`
  mutation outStock($outStocksInput: CreateStockInput!) {
    outStock(outStocksInput: $outStocksInput) {
      _id
    }
  }
`);

export const useOutStocks = () => {
  return useMutation(outStock);
};
