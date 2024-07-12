import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

const saleOutCheck = graphql(`
  query saleOutCheck {
    saleOutCheck {
      isChecked
    }
  }
`);

export const useSaleOutCheck = () => {
  return useQuery(saleOutCheck, {
    notifyOnNetworkStatusChange: true,
  });
};
