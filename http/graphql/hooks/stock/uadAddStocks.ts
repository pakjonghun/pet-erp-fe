import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const addStock = graphql(`
  mutation addStock($addStocksInput: CreateStockInput!) {
    addStock(addStocksInput: $addStocksInput) {
      _id
    }
  }
`);

export const useAddStock = () => {
  return useMutation(addStock);
};
