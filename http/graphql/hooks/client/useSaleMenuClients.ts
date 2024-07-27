import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { FindDateScrollInput } from '../../codegen/graphql';

const saleMenuClients = graphql(`
  query saleMenuClients($saleMenuClientsInput: FindDateScrollInput!) {
    saleMenuClients(saleMenuClientsInput: $saleMenuClientsInput) {
      totalCount
      data {
        _id
        name
        code
        accPayCost
        accWonCost
        accCount
        prevAccCount
        prevAccPayCost
        prevAccWonCost
        prevAccDeliveryCost
        accDeliveryCost
        accTotalPayment
        prevAccTotalPayment
        products {
          name
          accCount
        }
      }
    }
  }
`);

export const useSaleMenuClients = (saleMenuClientsInput: FindDateScrollInput, skip?: boolean) => {
  return useQuery(saleMenuClients, {
    variables: {
      saleMenuClientsInput,
    },
    skip,
    notifyOnNetworkStatusChange: true,
  });
};
