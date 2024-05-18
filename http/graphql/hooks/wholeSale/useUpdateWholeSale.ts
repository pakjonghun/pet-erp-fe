import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateWholeSale = graphql(`
  mutation updateWholeSale($updateWholeSaleInput: UpdateWholeSaleInput!) {
    updateWholeSale(updateWholeSaleInput: $updateWholeSaleInput) {
      _id
    }
  }
`);

export const useUpdateWholeSale = () => {
  return useMutation(updateWholeSale);
};
