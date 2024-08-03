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
        businessName
        businessNumber
        clientType
        feeRate
        isSabangService
        payDate
        inActive
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
        monthSales {
          name
          accCount
          accPayCost
          accWonCost
          accDeliveryCost
          accTotalPayment
        }

        products {
          name
          accCount
          accPayCost
          accWonCost
          accDeliveryCost
          accTotalPayment
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
