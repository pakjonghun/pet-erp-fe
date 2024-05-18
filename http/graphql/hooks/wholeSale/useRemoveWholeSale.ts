import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const removeWholeSale = graphql(`
  mutation removeWholeSale($_id: String!) {
    removeWholeSale(_id: $_id) {
      _id
    }
  }
`);
export const useRemoveWholeSale = () => {
  return useMutation(removeWholeSale, {
    update(cache, { data }) {
      const { removeWholeSale: res } = data as {
        removeWholeSale: { __typename: string; _id: string };
      };
      cache.evict({ id: `${res.__typename}:${res._id}` });
      cache.gc();
      cache.modify({
        fields: {
          wholeSales(existingSales = { totalCount: 0, data: [] }) {
            const totalCount = existingSales.totalCount;
            return {
              ...existingSales,
              totalCount: totalCount == 0 ? 0 : totalCount - 1,
            };
          },
        },
      });
    },
  });
};
