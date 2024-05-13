import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { FactoriesInput } from '../../codegen/graphql';

const factories = graphql(`
  query factories($factoriesInput: FactoriesInput!) {
    factories(factoriesInput: $factoriesInput) {
      totalCount
      data {
        ...FactoryFragment
      }
    }
  }
`);

export const useFactories = (factoriesInput: FactoriesInput) => {
  return useQuery(factories, {
    variables: {
      factoriesInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
