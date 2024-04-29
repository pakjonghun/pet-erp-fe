import {
  Product,
  ProductCategory,
  ProductCategoryFragmentFragmentDoc,
  ProductFragmentFragmentDoc,
} from './../../codegen/graphql';
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
  return useMutation(createProduct, {
    notifyOnNetworkStatusChange: true,
    update(cache, { data }) {
      cache.modify({
        fields: {
          products(
            existingProducts = {
              totalCount: 0,
              data: [],
            }
          ) {
            if (!data) return existingProducts;

            const newProductRef = cache.writeFragment({
              data: data.createProduct as Product,
              fragment: ProductFragmentFragmentDoc,
              fragmentName: 'ProductFragment',
            });

            const newProducts = {
              totalCount: existingProducts.totalCount + 1,
              data: [newProductRef, ...existingProducts.data],
            };
            return newProducts;
          },
        },
      });

      const newCategory = (data?.createProduct as Product).category;
      if (!newCategory) return;

      cache.modify({
        fields: {
          categories(existing = { totalCount: 0, data: [] }) {
            const newCategoryRef = cache.readFragment({
              id: `${newCategory.__typename}:${newCategory._id}`,
              fragment: ProductCategoryFragmentFragmentDoc,
            });

            const isExistCategory = (existing.data as ProductCategory[]).find((item) => {
              if ((item as unknown as { __ref: string }).__ref) {
                return (
                  (item as unknown as { __ref: string }).__ref ===
                  `${newCategory.__typename}:${newCategory._id}`
                );
              }
              return item._id === newCategory._id;
            });

            return isExistCategory //
              ? existing
              : {
                  totalCount: existing.totalCount + 1,
                  data: [newCategoryRef, ...existing.data],
                };
          },
        },
      });
    },
  });
};
