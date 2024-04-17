import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { Category, CategoryFragmentFragmentDoc } from '../../codegen/graphql';

const createCategory = graphql(`
  mutation createCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      _id
      name
    }
  }
`);

export const useCreateCategory = () => {
  return useMutation(createCategory, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          categories(existingCategories = { totalCount: 0, data: [] }) {
            const newCategoryRef = cache.writeFragment({
              data: data?.createCategory as Category,
              fragment: CategoryFragmentFragmentDoc,
            });
            return {
              totalCount: existingCategories.totalCount,
              data: [newCategoryRef, ...existingCategories.data],
            };
          },
        },
      });
    },
  });
};
