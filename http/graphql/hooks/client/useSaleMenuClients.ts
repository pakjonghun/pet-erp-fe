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
        accProfit
        profitRate
        prevAccCount
        prevAccPayCost
        prevAccWonCost
        prevAccProfit
        prevProfitRate
        prevDeliveryCost
        deliveryCost
        products {
          name
          accCount
        }
      }
    }
  }
`);

export const useSaleMenuClients = (saleMenuClientsInput: FindDateScrollInput) => {
  return useQuery(saleMenuClients, {
    variables: {
      saleMenuClientsInput,
    },
  });
};
