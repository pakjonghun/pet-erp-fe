import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateProductOrder = graphql(`
  mutation updateOrder($updateOrderInput: UpdateOrderInput!) {
    updateOrder(updateOrderInput: $updateOrderInput) {
      ...ProductOrderFragment
    }
  }
`);

export const useUpdateProductOrder = () => {
  return useMutation(updateProductOrder);
};
