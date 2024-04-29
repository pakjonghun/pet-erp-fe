import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { FindDateInput } from '../../codegen/graphql';

const dashboardProducts = graphql(`
  query dashboardProducts($dashboardProductsInput: FindDateInput!) {
    dashboardProducts(dashboardProductsInput: $dashboardProductsInput) {
      name
      accPayCost
      accCount
      accProfit
      averagePayCost
    }
  }
`);

export const useDashboardProducts = (dashboardProductsInput: FindDateInput) => {
  return useQuery(dashboardProducts, {
    variables: {
      dashboardProductsInput,
    },
  });
};
