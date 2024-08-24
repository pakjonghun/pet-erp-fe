import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { CommonSaleMonthAgoInput } from '../../codegen/graphql';

const commonSaleByMall = graphql(`
  query commonSaleMonthAgoByMall($commonSaleMonthAgoInput: CommonSaleMonthAgoInput!) {
    commonSaleMonthAgoByMall(commonSaleMonthAgoInput: $commonSaleMonthAgoInput) {
      _id
      accPayCost
      accWonCost
      accCount
      accDeliveryCost
      accTotalPayment
    }
  }
`);

export const useCommonMonthAgoByMall = (
  commonSaleMonthAgoInput: CommonSaleMonthAgoInput,
  skip: boolean = false
) => {
  return useQuery(commonSaleByMall, {
    variables: {
      commonSaleMonthAgoInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
