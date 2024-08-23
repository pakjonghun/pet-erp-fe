import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { CommonSaleByMallInput } from '../../codegen/graphql';

const commonSaleByMall = graphql(`
  query commonSaleByMall($commonSaleByMallInput: CommonSaleByMallInput!) {
    commonSaleByMall(commonSaleByMallInput: $commonSaleByMallInput) {
      _id
      products {
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

export const useCommonSaleByMall = (commonSaleByMallInput: CommonSaleByMallInput) => {
  return useQuery(commonSaleByMall, {
    variables: {
      commonSaleByMallInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
