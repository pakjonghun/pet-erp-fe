import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const deleteAccount = graphql(`
  mutation RemoveUser($id: String!) {
    removeUser(id: $id) {
      id
    }
  }
`);

export const useDeleteAccount = () => {
  return useMutation(deleteAccount, {
    update: (cache, { data }) => {
      if (!data) return data;
      const userId = data.removeUser.id;
      const type = data.removeUser.__typename!;
      cache.evict({ id: `${type}:${userId}` });
      cache.gc();
    },
  });
};
