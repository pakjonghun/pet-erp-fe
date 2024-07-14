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
        accProfit
        averagePayCost
        deliveryCost
      }
      previous {
        accPayCost
        accCount
        name
        accProfit
        averagePayCost
        deliveryCost
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
