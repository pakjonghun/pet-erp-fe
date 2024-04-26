import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const removeSubsidiaryCategory = graphql(`
  mutation removeSubsidiaryCategory($_id: String!) {
    removeSubsidiaryCategory(_id: $_id) {
      _id
      name
    }
  }
`);

export const useRemoveSubsidiaryCategory = () => {
  return useMutation(removeSubsidiaryCategory, {
    update(cache, { data }) {
      const type = data?.removeSubsidiaryCategory.__typename;
      const id = data?.removeSubsidiaryCategory._id;
      cache.evict({ id: `${type}:${id}` });
      cache.gc();

      cache.modify({
        fields: {
          subsidiaryCategories({ totalCount, data } = { totalCount: 0, data: [] }) {
            return {
              totalCount: totalCount - 1,
              data,
            };
          },
        },
      });
    },
  });
};
