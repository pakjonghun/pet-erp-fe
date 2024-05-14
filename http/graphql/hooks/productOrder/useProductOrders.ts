import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { OrdersInput } from '../../codegen/graphql';

const productOrders = graphql(`
  query orders($ordersInput: OrdersInput!) {
    orders(ordersInput: $ordersInput) {
      totalCount
      data {
        ...ProductOrderFragment
      }
    }
  }
`);

export const useProductOrders = (ordersInput: OrdersInput) => {
  return useQuery(productOrders, {
    variables: {
      ordersInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
