import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateProductOrder = graphql(`
  mutation completeOrder($completeOrderInput: CompleteOrderInput!) {
    completeOrder(completeOrderInput: $completeOrderInput) {
      ...ProductOrderFragment
    }
  }
`);

export const useCompleteProductOrder = () => {
  return useMutation(updateProductOrder);
};
