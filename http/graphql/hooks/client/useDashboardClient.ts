import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { FindDateInput } from '../../codegen/graphql';

const dashboardClient = graphql(`
  query dashboardClient($dashboardClientInput: FindDateInput!) {
    dashboardClient(dashboardClientInput: $dashboardClientInput) {
      current {
        accPayCost
        accCount
        name
        accDeliveryCost
        accTotalPayment
        accWonCost
      }
      previous {
        accPayCost
        accCount
        name
        accDeliveryCost
        accTotalPayment
        accWonCost
      }
    }
  }
`);

export const useDashboardClient = (dashboardClientInput: FindDateInput) => {
  return useQuery(dashboardClient, {
    variables: {
      dashboardClientInput,
    },
  });
};
