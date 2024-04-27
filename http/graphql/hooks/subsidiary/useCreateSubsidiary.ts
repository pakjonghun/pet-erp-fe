import { SubsidiaryCategory, SubsidiaryCategoryFragmentFragmentDoc } from './../../codegen/graphql';
import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { Subsidiary, SubsidiaryFragmentFragmentDoc } from '../../codegen/graphql';

const createSubsidiary = graphql(`
  mutation createSubsidiary($createSubsidiaryInput: CreateSubsidiaryInput!) {
    createSubsidiary(createSubsidiaryInput: $createSubsidiaryInput) {
      ...SubsidiaryFragment
    }
  }
`);

export const useCreateSubsidiary = () => {
  return useMutation(createSubsidiary, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          subsidiaries(existing = { totalCount: 0, data: [] }) {
            const newDataRef = cache.writeFragment({
              data: data?.createSubsidiary as Subsidiary,
              fragment: SubsidiaryFragmentFragmentDoc,
            });

            return { totalCount: existing.totalCount + 1, data: [newDataRef, ...existing.data] };
          },
        },
      });

      cache.modify({
        fields: {
          subsidiaryCategories(existing = { totalCount: 0, data: [] }) {
            const newSubsidiary = data?.createSubsidiary as Subsidiary;
            const newCategoryRef = cache.readFragment({
              id: `${newSubsidiary.category?.__typename}:${newSubsidiary?.category?._id}`,
              fragment: SubsidiaryCategoryFragmentFragmentDoc,
            });

            const isExistingCategory = (existing.data as SubsidiaryCategory[]).some(
              (item) => item._id === newSubsidiary.category?._id
            );

            return isExistingCategory
              ? existing
              : {
                  totalCount: existing.totalCount,
                  data: [newCategoryRef, ...existing.data],
                };
          },
        },
      });
    },
  });
};
