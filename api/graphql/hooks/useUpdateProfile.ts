import { useMutation } from '@apollo/client';
import { graphql } from '../codegen';
import { UserFragment } from '../fragments/userFragment';
import { getMyInfoDocument } from './useGetMyInfo';

const updateProfileDocument = graphql(`
  mutation UpdateProfile($updateProfileInput: UpdateProfileDTO!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      id
      role
    }
  }
`);

export const useUpdateProfile = () => {
  return useMutation(updateProfileDocument, {
    refetchQueries: [getMyInfoDocument, 'myInfo'],
  });
};
