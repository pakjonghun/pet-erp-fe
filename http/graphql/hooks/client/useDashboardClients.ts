import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { FindDateInput } from '../../codegen/graphql';

const dashboardClients = graphql(`
  query dashboardClients($dashboardClientsInput: FindDateInput!) {
    dashboardClients(dashboardClientsInput: $dashboardClientsInput) {
      data {
        _id
        name
        accPayCost
        accCount
        accProfit
        averagePayCost
        averagePayCost
        prevAccPayCost
        prevAccCount
        prevAccProfit
        prevAveragePayCost
      }
      totalCount
    }
  }
`);

export const useDashboardClients = (dashboardClientsInput: FindDateInput) => {
  return useQuery(dashboardClients, {
    variables: {
      dashboardClientsInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
