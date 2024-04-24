import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductsInput } from '../../codegen/graphql';

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

export const useProducts = (productsInput: ProductsInput) => {
  return useQuery(products, {
    variables: {
      productsInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
