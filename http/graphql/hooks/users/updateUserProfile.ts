import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateUserDocument = graphql(`
  mutation updateUser($updateUserInput: UpdateUserDTO!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      role
      createdAt
    }
  }
`);

export const useUpdateUser = () => {
  return useMutation(updateUserDocument);
};
