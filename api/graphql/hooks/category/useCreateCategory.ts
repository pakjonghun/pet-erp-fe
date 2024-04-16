import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const createCategory = graphql(`
  mutation createCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      _id
      name
    }
  }
`);

export const useCreateCategory = () => {
  return useMutation(createCategory);
};
