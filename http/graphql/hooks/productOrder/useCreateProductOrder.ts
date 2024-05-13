import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { Factory, FactoryFragmentFragmentDoc, ProductOrder } from '../../codegen/graphql';
const createProductOrder = graphql(`
  mutation createOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      _id
    }
  }
`);

export const useCreateProductOrder = () => {
  return useMutation(createProductOrder, {
    update(cache, { data }) {
      // cache.modify({
      //   fields: {
      //     factories(existingFactories = { totalCount: 0, data: [] }) {
      //       const newCategoryRef = cache.writeFragment({
      //         data: data?.createOrder as ProductOrder,
      //         fragment: FactoryFragmentFragmentDoc,
      //       });
      //       return {
      //         totalCount: existingFactories.totalCount + 1,
      //         data: [newCategoryRef, ...existingFactories.data],
      //       };
      //     },
      //   },
      // });
    },
  });
};
