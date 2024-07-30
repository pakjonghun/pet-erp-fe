import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { SaleOrdersInput } from '../../codegen/graphql';

const saleOrders = graphql(`
  query saleOrders($saleOrdersInput: SaleOrdersInput!) {
    saleOrders(saleOrdersInput: $saleOrdersInput) {
      totalCount
      data {
        count
        deliveryCost
        mallId
        orderNumber
        payCost
        productName
        saleAt
        totalPayment
        wonCost
      }
      total {
        accCount
        accTotalPayment
        accWonCost
        accPayCost
        accDeliveryCost
      }
    }
  }
`);

export const useSaleOrders = (saleOrdersInput: SaleOrdersInput) => {
  return useQuery(saleOrders, {
    variables: {
      saleOrdersInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
