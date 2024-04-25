import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { Client, ClientFragmentFragmentDoc } from '../../codegen/graphql';

const createClient = graphql(`
  mutation createClient($createClientInput: CreateClientInput!) {
    createClient(createClientInput: $createClientInput) {
      ...ClientFragment
    }
  }
`);

export const useCreateClient = () => {
  return useMutation(createClient, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          clients: (existingClients = { totalCount: 0, data: [] }) => {
            const newClientRef = cache.writeFragment({
              data: data?.createClient as Client,
              fragment: ClientFragmentFragmentDoc,
            });
            return {
              totalCount: existingClients + 1,
              data: [newClientRef, ...existingClients.data],
            };
          },
        },
      });
    },
  });
};
