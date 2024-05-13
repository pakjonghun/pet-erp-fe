import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { Storage } from '../../codegen/graphql';

const removeStorage = graphql(`
  mutation removeStorage($_id: String!) {
    removeStorage(_id: $_id) {
      ...StorageFragment
    }
  }
`);
export const useRemoveStorage = () => {
  return useMutation(removeStorage, {
    update(cache, { data }) {
      const typeName = data?.removeStorage.__typename;
      const id = (data?.removeStorage as Storage)._id;
      cache.evict({ id: `${typeName}:${id}` });
      cache.gc();
      cache.modify({
        fields: {
          storages(existingStorages = { totalCount: 0, data: [] }) {
            return { totalCount: existingStorages.totalCount - 1, data: existingStorages.data };
          },
        },
      });
    },
  });
};
