import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

const usersDocument = graphql(`
  query Users {
    users {
      id
      role
      createdAt
    }
  }
`);

export const useGetUserList = () => {
  return useQuery(usersDocument);
};
