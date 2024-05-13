import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { Storage, StorageFragmentFragmentDoc } from '../../codegen/graphql';
const createStorage = graphql(`
  mutation createStorage($createStorageInput: CreateStorageInput!) {
    createStorage(createStorageInput: $createStorageInput) {
      ...StorageFragment
    }
  }
`);

export const useCreateStorage = () => {
  return useMutation(createStorage, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          storages(existingStorages = { totalCount: 0, data: [] }) {
            const newCategoryRef = cache.writeFragment({
              data: data?.createStorage as Storage,
              fragment: StorageFragmentFragmentDoc,
            });
            return {
              totalCount: existingStorages.totalCount + 1,
              data: [newCategoryRef, ...existingStorages.data],
            };
          },
        },
      });
    },
  });
};
