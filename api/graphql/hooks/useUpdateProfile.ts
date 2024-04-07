import { useMutation } from '@apollo/client';
import { graphql } from '../codegen';

const updateProfileDocument = graphql(`
  mutation UpdateProfile($updateProfileInput: UpdateProfileDTO!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      id
      role
    }
  }
`);

export const useUpdateProfile = () => {
  return useMutation(updateProfileDocument);
};
