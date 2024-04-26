import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateProductCategory = graphql(`
  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      _id
      name
    }
  }
`);

export const useUpdateProductCategory = () => {
  return useMutation(updateProductCategory);
};
