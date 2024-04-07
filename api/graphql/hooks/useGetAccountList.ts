import { useQuery } from '@apollo/client';
import { graphql } from '../codegen';

const usersDocument = graphql(`
  query Users {
    users {
      id
      role
    }
  }
`);

export const useGetUserList = () => {
  return useQuery(usersDocument);
};
