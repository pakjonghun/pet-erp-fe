import { graphql } from '../../codegen';
import { useQuery } from '@apollo/client';
import { TopClientInput } from '../../codegen/graphql';

const topClients = graphql(`
  query topClients($topClientInput: TopClientInput!) {
    topClients(topClientInput: $topClientInput) {
      totalCount
      data {
        accProfit
        accPayCost
        accCount
        name
      }
    }
  }
`);

export const useTopClients = (topClientInput: TopClientInput) => {
  return useQuery(topClients, {
    variables: {
      topClientInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
