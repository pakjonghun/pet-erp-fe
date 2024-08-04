import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const removeAd = graphql(`
  mutation removeAd($_id: String!) {
    removeAd(_id: $_id) {
      productCodeList {
        name
        code
      }
      clientCode {
        name
        code
      }
      price
      type
      from
      to
    }
  }
`);

export const useRemoveAd = (removeAdInput: string) => {
  return useMutation(removeAd, {
    variables: {
      _id: removeAdInput,
    },
  });
};
