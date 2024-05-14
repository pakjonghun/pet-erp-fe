import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductOrder } from '../../codegen/graphql';

const removeProductOrder = graphql(`
  mutation removeOrder($_id: String!) {
    removeOrder(_id: $_id) {
      ...ProductOrderFragment
    }
  }
`);
export const useRemoveProductOrder = () => {
  return useMutation(removeProductOrder, {
    update(cache, { data }) {
      const typeName = data?.removeOrder.__typename;
      const id = (data?.removeOrder as ProductOrder)._id;
      cache.evict({ id: `${typeName}:${id}` });
      cache.gc();
      cache.modify({
        fields: {
          orders(existingOrders = { totalCount: 0, data: [] }) {
            return { totalCount: existingOrders.totalCount - 1, data: existingOrders.data };
          },
        },
      });
    },
  });
};
