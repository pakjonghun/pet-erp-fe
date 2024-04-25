import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const removeClient = graphql(`
  mutation removeClient($_id: String!) {
    removeClient(_id: $_id) {
      _id
      name
    }
  }
`);

export const useRemoveClient = () => {
  return useMutation(removeClient, {
    notifyOnNetworkStatusChange: true,
    update(cache, { data }) {
      const id = data?.removeClient._id;
      const type = data?.removeClient.__typename;
      cache.evict({ id: `${type}:${id}` });
      cache.gc();
      cache.modify({
        fields: {
          clients: (existingClients = { totalCount: 0, data: [] }) => {
            if (existingClients.totalCount === 0) {
              return existingClients;
            }
            return { totalCount: existingClients.totalCount - 1, data: existingClients.data };
          },
        },
      });
    },
  });
};
