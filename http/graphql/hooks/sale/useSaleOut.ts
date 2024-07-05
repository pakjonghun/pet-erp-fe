import { gql, useMutation, useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

const saleOut = graphql(`
  mutation outSaleData {
    outSaleData {
      hasNoCountSale
      hasNoProductCodeSale
      hasNoMatchClientSale
      hasNoMatchStorageSale
      hasNoStockSale
      hasNoMatchStorageProductStockSale
      totalErrors
    }
  }
`);

export const useSaleOut = () => {
  return useMutation(saleOut);
};
