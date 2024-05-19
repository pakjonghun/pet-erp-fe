import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductSaleInput } from '../../codegen/graphql';

const productSales = graphql(`
  query productSales($productSalesInput: ProductSaleInput!) {
    productSales(productSalesInput: $productSalesInput) {
      totalCount
      data {
        stock
        recentCreateDate
        code
        name
        leadTime
        wonPrice
        clients {
          ...ClientInfo
        }
        sales {
          accPayCost
          accCount
          name
          accProfit
          averagePayCost
          prevAccPayCost
          prevAccCount
          prevAccProfit
          prevAveragePayCost
        }
      }
    }
  }
`);
export const useProductSales = (productSalesInput: ProductSaleInput) => {
  return useQuery(productSales, {
    variables: {
      productSalesInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
