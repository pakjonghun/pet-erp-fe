import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const removeProduct = graphql(`
  mutation removeProduct($_id: String!) {
    removeProduct(_id: $_id) {
      _id
      name
    }
  }
`);

export const useRemoveProduct = () => {
  return useMutation(removeProduct, {
    update(cache, { data }) {
      const type = data?.removeProduct.__typename;
      const id = data?.removeProduct._id;

      cache.evict({ id: `${type}:${id}` });
      cache.gc();
      cache.modify({
        fields: {
          products(existingProduct = { totalCount: 0, data: [] }) {
            return { totalCount: existingProduct.totalCount - 1, data: existingProduct.data };
          },
        },
      });
    },
  });
};
