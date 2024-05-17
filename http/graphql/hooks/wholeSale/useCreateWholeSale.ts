import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const createWholeSale = graphql(`
  mutation createWholeSale($createWholeSaleInput: CreateWholeSaleInput!) {
    createWholeSale(createWholeSaleInput: $createWholeSaleInput) {
      mallId
    }
  }
`);

export const useCreateWholeSale = () => {
  return useMutation(createWholeSale);
};
