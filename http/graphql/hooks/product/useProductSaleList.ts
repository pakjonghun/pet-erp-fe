import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductSaleInput } from '../../codegen/graphql';

const productSales = graphql(`
  query productSales($productSalesInput: ProductSaleInput!) {
    productSales(productSalesInput: $productSalesInput) {
      totalCount
      data {
        code
        barCode
        name
        wonPrice
        salePrice
        leadTime
        accPayCost
        accWonCost
        accCount
        stock
        recentCreateDate
        clients {
          accCount
          name
        }
        prevAccCount
        prevAccPayCost
        prevAccWonCost
        prevAccDeliveryCost
        accDeliveryCost
        accTotalPayment
        prevAccTotalPayment
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
