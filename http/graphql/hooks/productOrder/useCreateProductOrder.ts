import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { ProductOrder, ProductOrderFragmentFragmentDoc } from '../../codegen/graphql';
const createProductOrder = graphql(`
  mutation createOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      ...ProductOrderFragment
    }
  }
`);

export const useCreateProductOrder = () => {
  return useMutation(createProductOrder, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          orders(existingOrders = { totalCount: 0, data: [] }) {
            const newOrder = cache.writeFragment({
              data: data?.createOrder as ProductOrder,
              fragment: ProductOrderFragmentFragmentDoc,
            });
            return {
              totalCount: existingOrders.totalCount + 1,
              data: [newOrder, ...existingOrders.data],
            };
          },
        },
      });
    },
  });
};
