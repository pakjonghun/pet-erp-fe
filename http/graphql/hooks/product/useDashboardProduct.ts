import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { FindDateInput } from '../../codegen/graphql';

const dashboardProduct = graphql(`
  query dashboardProduct($dashboardProductInput: FindDateInput!) {
    dashboardProduct(dashboardProductInput: $dashboardProductInput) {
      current {
        accPayCost
        accCount
        name
        accProfit
        averagePayCost
      }
      previous {
        accPayCost
        accCount
        name
        accProfit
        averagePayCost
      }
    }
  }
`);

export const useDashboardProduct = (dashboardProductInput: FindDateInput) => {
  return useQuery(dashboardProduct, {
    variables: {
      dashboardProductInput,
    },
  });
};
