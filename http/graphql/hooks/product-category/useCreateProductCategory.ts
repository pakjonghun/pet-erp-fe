import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductCategory, ProductCategoryFragmentFragmentDoc } from '../../codegen/graphql';

const createProductCategory = graphql(`
  mutation createCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      _id
      name
    }
  }
`);

export const useCreateProductCategory = () => {
  return useMutation(createProductCategory, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          categories(existingCategories = { totalCount: 0, data: [] }) {
            const newCategoryRef = cache.writeFragment({
              data: data?.createCategory as ProductCategory,
              fragment: ProductCategoryFragmentFragmentDoc,
            });
            return {
              totalCount: existingCategories.totalCount + 1,
              data: [newCategoryRef, ...existingCategories.data],
            };
          },
        },
      });
    },
  });
};
