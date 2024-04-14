import { graphql } from '../../codegen';
import { useQuery } from '@apollo/client';

const topClients = graphql(`
  query topClients {
    topClients {
      accProfit
      accPayCost
      accCount
      name
    }
  }
`);

export const useTopClients = () => {
  return useQuery(topClients);
};
