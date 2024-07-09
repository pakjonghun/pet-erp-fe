import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { ClientsInput } from '../../codegen/graphql';

const clients = graphql(`
  query clients($clientsInput: ClientsInput!) {
    clients(clientsInput: $clientsInput) {
      totalCount
      data {
        ...OutClientFragment
      }
    }
  }
`);

export const useClients = (clientsInput: ClientsInput) => {
  return useQuery(clients, { variables: { clientsInput }, notifyOnNetworkStatusChange: true });
};
