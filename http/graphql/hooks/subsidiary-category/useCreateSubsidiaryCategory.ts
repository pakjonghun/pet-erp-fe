import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { SubsidiaryCategory, SubsidiaryCategoryFragmentFragmentDoc } from '../../codegen/graphql';

const createSubsidiaryCategory = graphql(`
  mutation createSubsidiaryCategory(
    $createSubsidiaryCategoryInput: CreateSubsidiaryCategoryInput!
  ) {
    createSubsidiaryCategory(createSubsidiaryCategoryInput: $createSubsidiaryCategoryInput) {
      ...SubsidiaryCategoryFragment
    }
  }
`);

export const useCreateSubsidiaryCategory = () => {
  return useMutation(createSubsidiaryCategory, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          subsidiaryCategories(existingData = { totalCount: 0, data: [] }) {
            const newDataRef = cache.writeFragment({
              data: data?.createSubsidiaryCategory as SubsidiaryCategory,
              fragment: SubsidiaryCategoryFragmentFragmentDoc,
            });

            return {
              totalCount: existingData.totalCount + 1,
              data: [newDataRef, ...existingData.data],
            };
          },
        },
      });
    },
  });
};
