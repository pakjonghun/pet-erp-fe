import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { StoragesInput } from '../../codegen/graphql';

const storages = graphql(`
  query storages($storagesInput: StoragesInput!) {
    storages(storagesInput: $storagesInput) {
      totalCount
      data {
        ...StorageFragment
      }
    }
  }
`);

export const useStorages = (storagesInput: StoragesInput) => {
  return useQuery(storages, {
    variables: {
      storagesInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
