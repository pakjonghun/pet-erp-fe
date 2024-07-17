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

export const useDashboardClients = (dashboardClientsInput: FindDateInput) => {
  return useQuery(dashboardClients, {
    variables: {
      dashboardClientsInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
