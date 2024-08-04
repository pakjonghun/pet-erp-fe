import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductSaleInput } from '../../codegen/graphql';

const productSales = graphql(`
  query productSales($productSalesInput: ProductSaleInput!) {
    productSales(productSalesInput: $productSalesInput) {
      totalCount
      data {
        isFreeDeliveryFee
        code
        barCode
        name
        wonPrice
        leadTime
        salePrice
        accPayCost
        accWonCost
        accCount
        leadTime
        stock
        recentCreateDate
        clients {
          accCount
          accPayCost
          accWonCost
          accDeliveryCost
          accTotalPayment
          name
        }
        # prevAccCount
        # prevAccPayCost
        # prevAccWonCost
        # prevAccDeliveryCost
        # prevAccTotalPayment
        accDeliveryCost
        accTotalPayment

        accProfit
        accProfitRate
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
