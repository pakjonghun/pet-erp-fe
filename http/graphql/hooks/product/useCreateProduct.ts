import { Product, ProductFragmentFragmentDoc } from './../../codegen/graphql';
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
    },
  });
};
