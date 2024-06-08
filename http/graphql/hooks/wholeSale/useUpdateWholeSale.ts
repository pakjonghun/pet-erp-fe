import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateWholeSale = graphql(`
  mutation updateWholeSale($updateWholeSaleInput: UpdateWholeSaleInput!) {
    updateWholeSale(updateWholeSaleInput: $updateWholeSaleInput) {
      _id
      mallId
      saleAt
      telephoneNumber1
      totalPayCost
      totalWonCost
      totalCount
      isDone
      productList {
        storageName
        productName
        productCode
        count
        payCost
        wonCost
      }
    }
  }
`);

export const useUpdateWholeSale = () => {
  return useMutation(updateWholeSale);
};
