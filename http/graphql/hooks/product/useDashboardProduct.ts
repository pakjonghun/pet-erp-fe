import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { FindDateInput } from '../../codegen/graphql';

const dashboardProduct = graphql(`
  query dashboardProduct($dashboardProductInput: FindDateInput!) {
    dashboardProduct(dashboardProductInput: $dashboardProductInput) {
      current {
        name
        accPayCost
        accCount
        accDeliveryCost
        accTotalPayment
        accWonCost
      }
      previous {
        name
        accPayCost
        accCount
        accDeliveryCost
        accTotalPayment
        accWonCost
      }
    }
  }
`);

export const useDashboardProduct = (dashboardProductInput: FindDateInput) => {
  return useQuery(dashboardProduct, {
    variables: {
      dashboardProductInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
