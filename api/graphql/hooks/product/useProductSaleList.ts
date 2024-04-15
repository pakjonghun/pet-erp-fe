import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductSaleInput } from '../../codegen/graphql';

const productSales = graphql(`
  query productSales($productSaleInput: ProductSaleInput!) {
    productSales(productSaleInput: $productSaleInput) {
      totalCount
      data {
        ...ProductSaleFragment
        clients {
          ...ClientInfo
        }
        today {
          ...SaleInfo
        }
        thisWeek {
          ...SaleInfo
        }
        lastWeek {
          ...SaleInfo
        }
        thisMonth {
          ...SaleInfo
        }
      }
    }
  }
`);
export const useProductSales = (productSaleInput: ProductSaleInput) => {
  return useQuery(productSales, {
    variables: {
      productSaleInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
