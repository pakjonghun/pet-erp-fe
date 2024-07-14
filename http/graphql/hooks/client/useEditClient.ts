import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateClient = graphql(`
  mutation updateClient($updateClientInput: UpdateClientInput!) {
    updateClient(updateClientInput: $updateClientInput) {
      ...OutClientFragment
    }
  }
`);

export const useUpdateClient = () => {
  return useMutation(updateClient, { notifyOnNetworkStatusChange: true });
};
