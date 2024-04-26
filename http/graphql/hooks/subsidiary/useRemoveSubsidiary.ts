import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const removeSubsidiary = graphql(`
  mutation removeSubsidiary($_id: String!) {
    removeSubsidiary(_id: $_id) {
      _id
      name
    }
  }
`);

export const useRemoveSubsidiary = () => {
  return useMutation(removeSubsidiary, {
    update(cache, { data }) {
      cache.evict({ id: `${data?.removeSubsidiary.__typename}:${data?.removeSubsidiary._id}` });
      cache.gc();
      cache.modify({
        fields: {
          subsidiaries(existing = { totalCount: 0, data: [] }) {
            return { totalCount: existing.totalCount - 1, data: existing.data };
          },
        },
      });
    },
  });
};
