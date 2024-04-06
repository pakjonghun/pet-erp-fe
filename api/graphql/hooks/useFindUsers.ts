import { gql, useMutation } from '@apollo/client';
import { graphql } from '../codegen';

const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserDTO!) {
    createUser(createUserInput: $createUserInput) {
      id
      role
    }
  }
`);

export const useCreateUser = () => {
  return useMutation(createUserDocument);
};
