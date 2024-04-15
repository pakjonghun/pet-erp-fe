import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

const productSaleChart = graphql(`
  query productSale($productCode: String!) {
    productSale(productCode: $productCode) {
      _id
      accPayCost
      accProfit
    }
  }
`);

export const useProductSaleChart = (productCode: string) => {
  return useQuery(productSaleChart, {
    variables: {
      productCode,
    },
  });
};
