import { Product } from './../../codegen/graphql';
import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductFragmentFragmentDoc, ProductSaleFragmentFragmentDoc } from '../../codegen/graphql';

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
            console.log('new data', data);
            if (!data) return existingProducts;

            const newProductRef = cache.writeFragment({
              data: data.createProduct as Product,
              fragment: ProductFragmentFragmentDoc,
              fragmentName: 'ProductFragment',
            });

            const newProducts = {
              totalCount: existingProducts.totalCount,
              data: [newProductRef, ...existingProducts.data],
            };
            console.log(111, newProducts);
            return newProducts;
          },
        },
      });
    },
  });
};
