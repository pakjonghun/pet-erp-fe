import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateProduct = graphql(`
  mutation updateProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      ...ProductFragment
    }
  }
`);

export const useUpdateProduct = () => {
  return useMutation(updateProduct);
};
