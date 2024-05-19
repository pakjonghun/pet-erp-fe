import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

const deliveryCost = graphql(`
  query deliveryCost {
    deliveryCost {
      deliveryCost
      year
      month
    }
  }
`);

export const useDeliveryCost = () => {
  return useQuery(deliveryCost, { notifyOnNetworkStatusChange: true });
};
