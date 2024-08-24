import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { CommonSaleByInput } from '../../codegen/graphql';

const commonSaleByProduct = graphql(`
  query commonSaleByProduct($commonSaleByInput: CommonSaleByInput!) {
    commonSaleByProduct(commonSaleByInput: $commonSaleByInput) {
      _id
      clients {
        accPayCost
        accWonCost
        accCount
        accDeliveryCost
        accTotalPayment
        accAdPrice
        name
      }
    }
  }
`);

export const useCommonSaleByProduct = (commonSaleByInput: CommonSaleByInput) => {
  return useQuery(commonSaleByProduct, {
    variables: {
      commonSaleByInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
