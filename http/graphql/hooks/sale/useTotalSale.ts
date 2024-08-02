import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { FindDateInput } from '../../codegen/graphql';

const totalSale = graphql(`
  query totalSale($totalSaleInput: FindDateInput!) {
    totalSale(totalSaleInput: $totalSaleInput) {
      current {
        accPayCost
        accCount
        name
        accDeliveryCost
        accTotalPayment
        accWonCost
      }
      previous {
        accPayCost
        accCount
        name
        accDeliveryCost
        accTotalPayment
        accWonCost
      }
    }
  }
`);

export const useTotalSale = (totalSaleInput: FindDateInput) => {
  return useQuery(totalSale, {
    variables: {
      totalSaleInput,
    },
  });
};
