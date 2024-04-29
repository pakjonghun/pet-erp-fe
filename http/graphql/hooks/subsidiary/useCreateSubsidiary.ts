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
            const newCategoryCacheKey = `${newSubsidiary.category?.__typename}:${newSubsidiary?.category?._id}`;
            const newCategoryRef = cache.readFragment({
              id: newCategoryCacheKey,
              fragment: SubsidiaryCategoryFragmentFragmentDoc,
            });

            const isExistingCategory = (existing.data as SubsidiaryCategory[]).some((item) => {
              if ((item as unknown as { __ref: string }).__ref) {
                return (item as unknown as { __ref: string }).__ref === newCategoryCacheKey;
              } else {
                return item._id === newCategoryRef?._id;
              }

              ``;
            });

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
