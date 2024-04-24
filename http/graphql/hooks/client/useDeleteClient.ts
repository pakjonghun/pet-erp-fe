import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const removeClient = graphql(`
  mutation removeClient($_id: String!) {
    removeClient(_id: $_id) {
      ...ClientFragment
    }
  }
`);

export const useRemoveClient = () => {
  return useMutation(removeClient, { notifyOnNetworkStatusChange: true });
};
