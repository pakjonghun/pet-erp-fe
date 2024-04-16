import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const createProduct = graphql(`
  mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      ...ProductFragment
    }
  }
`);

export const useCreateProduct = () => {
  return useMutation(createProduct);
};
