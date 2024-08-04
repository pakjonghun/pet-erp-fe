import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { UpdateAdInput } from '../../codegen/graphql';

const updateAd = graphql(`
  mutation updateAd($updateAdInput: UpdateAdInput!) {
    updateAd(updateAdInput: $updateAdInput) {
      productCodeList {
        name
        code
      }
      clientCode {
        name
        code
      }
      type
      from
      to
      price
    }
  }
`);

export const useCreateAd = (updateAdInput: UpdateAdInput) => {
  return useMutation(updateAd, {
    variables: {
      updateAdInput,
    },
  });
};
