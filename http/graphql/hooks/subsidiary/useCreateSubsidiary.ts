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
    },
  });
};
