import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { CommonSaleByMallInput } from '../../codegen/graphql';

const commonSaleByMall = graphql(`
  query commonSaleByMall($commonSaleByMallInput: CommonSaleByMallInput!) {
    commonSaleByMall(commonSaleByMallInput: $commonSaleByMallInput) {
      accPayCost
      accWonCost
      accCount
      accProfit
      accProfitRate
      accDeliveryCost
      accTotalPayment
      accAdPrice
    }
  }
`);

export const useCommonSaleByMall = (
  commonSaleByMallInput: CommonSaleByMallInput,
  skip: boolean
) => {
  return useQuery(commonSaleByMall, {
    variables: {
      commonSaleByMallInput,
    },
    notifyOnNetworkStatusChange: true,
    skip,
  });
};
