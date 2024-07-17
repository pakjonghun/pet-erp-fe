import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { FindDateInput } from '../../codegen/graphql';

const dashboardProducts = graphql(`
  query dashboardProducts($dashboardProductsInput: FindDateInput!) {
    dashboardProducts(dashboardProductsInput: $dashboardProductsInput) {
      data {
        _id
        name
        accPayCost
        accCount
        prevAccPayCost
        prevAccCount
        accDeliveryCost
        accTotalPayment
        accWonCost
        prevAccWonCost
      }
      totalCount
    }
  }
`);

export const useDashboardProducts = (dashboardProductsInput: FindDateInput) => {
  return useQuery(dashboardProducts, {
    variables: {
      dashboardProductsInput,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });
};

//
