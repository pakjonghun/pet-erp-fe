import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateSubsidiary = graphql(`
  mutation updateSubsidiary($updateSubsidiaryInput: UpdateSubsidiaryInput!) {
    updateSubsidiary(updateSubsidiaryInput: $updateSubsidiaryInput) {
      ...SubsidiaryFragment
    }
  }
`);

export const useUpdateSubsidiary = () => {
  return useMutation(updateSubsidiary);
};
