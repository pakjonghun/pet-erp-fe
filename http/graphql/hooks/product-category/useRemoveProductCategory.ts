import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const removeProductCategory = graphql(`
  mutation removeCategory($_id: String!) {
    removeCategory(_id: $_id) {
      _id
      name
    }
  }
`);

export const useRemoveProductCategory = () => {
  return useMutation(removeProductCategory, {
    update(cache, { data }) {
      const typeName = data?.removeCategory.__typename;
      const id = data?.removeCategory._id;
      cache.evict({ id: `${typeName}:${id}` });
      cache.gc();
      cache.modify({
        fields: {
          categories(existingCategory = { totalCount: 0, data: [] }) {
            return { totalCount: existingCategory.totalCount - 1, data: existingCategory.data };
          },
        },
      });
    },
  });
};
