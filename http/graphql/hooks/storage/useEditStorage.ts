import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateStorage = graphql(`
  mutation updateStorage($updateStorageInput: UpdateStorageInput!) {
    updateStorage(updateStorageInput: $updateStorageInput) {
      ...StorageFragment
    }
  }
`);

export const useEditStorage = () => {
  return useMutation(updateStorage);
};
