import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductsInput, ProductsOutput, QueryProductsArgs } from '../../codegen/graphql';

const products = graphql(`
  query products($productsInput: ProductsInput!) {
    products(productsInput: $productsInput) {
      totalCount
      data {
        ...ProductFragment
      }
    }
  }
`);

export const useProducts = (productsInput: ProductsInput, skip: boolean = false) => {
  return useQuery<{ products: ProductsOutput }, QueryProductsArgs>(products, {
    variables: {
      productsInput,
    },
    notifyOnNetworkStatusChange: true,
    skip,
  });
};
