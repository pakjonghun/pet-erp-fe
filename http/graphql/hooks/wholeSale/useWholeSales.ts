import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { WholeSalesInput } from '../../codegen/graphql';

const wholeSales = graphql(`
  query wholeSales($wholeSalesInput: WholeSalesInput!) {
    wholeSales(wholeSalesInput: $wholeSalesInput) {
      totalCount
      data {
        _id
        mallId
        saleAt
        telephoneNumber1
        totalPayCost
        totalWonCost
        totalCount
        productList {
          productName
          productCode
          count
          payCost
          wonCost
        }
      }
    }
  }
`);

export const useWholeSales = (wholeSalesInput: WholeSalesInput) => {
  return useQuery(wholeSales, {
    variables: {
      wholeSalesInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
