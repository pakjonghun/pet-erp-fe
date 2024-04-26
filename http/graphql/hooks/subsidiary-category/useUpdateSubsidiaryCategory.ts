import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateSubsidiaryCategory = graphql(
  `
    mutation updateSubsidiaryCategory(
      $updateSubsidiaryCategoryInput: UpdateSubsidiaryCategoryInput!
    ) {
      updateSubsidiaryCategory(updateSubsidiaryCategoryInput: $updateSubsidiaryCategoryInput) {
        ...SubsidiaryCategoryFragment
      }
    }
  `
);

export const useUpdateSubsidiaryCategory = () => {
  return useMutation(updateSubsidiaryCategory);
};
