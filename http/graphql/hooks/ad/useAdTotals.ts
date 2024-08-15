import { AdsTotalInput } from '../../codegen/graphql';
import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

const adsTotal = graphql(`
  query adsTotal($adsTotalInput: AdsTotalInput!) {
    adsTotal(adsTotalInput: $adsTotalInput) {
      accPrice
    }
  }
`);

export const useAdTotals = (adsTotalInput: AdsTotalInput) => {
  return useQuery(adsTotal, {
    variables: {
      adsTotalInput,
    },
  });
};
