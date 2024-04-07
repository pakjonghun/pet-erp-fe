import { useMutation } from '@apollo/client';
import { graphql } from '../codegen';
import { UserFragment } from '../fragments/userFragment';

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
      const deleteId = data?.__typename ?? '' + data?.removeUser.id ?? '';
      const r = cache.readFragment({ id: deleteId, fragment: UserFragment });
      console.log('r', r);
      console.log(data);
      cache.evict({ id: deleteId });
      cache.gc();
    },
  });
};
