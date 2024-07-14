import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { OptionsInput } from '../../codegen/graphql';

const options = graphql(`
  query options($optionsInput: OptionsInput!) {
    options(optionsInput: $optionsInput) {
      totalCount
      data {
        id
        name
        count
        productCodeList {
          code
          name
        }
      }
    }
  }
`);

export const useOptions = (optionsInput: OptionsInput) => {
  return useQuery(options, { variables: { optionsInput }, notifyOnNetworkStatusChange: true });
};
