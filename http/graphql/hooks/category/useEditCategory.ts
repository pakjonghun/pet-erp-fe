import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateCategory = graphql(`
  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      _id
      name
    }
  }
`);

export const useUpdateCategory = () => {
  return useMutation(updateCategory);
};
