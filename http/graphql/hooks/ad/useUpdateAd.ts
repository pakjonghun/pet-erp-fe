import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateAd = graphql(`
  mutation updateAd($updateAdInput: UpdateAdInput!) {
    updateAd(updateAdInput: $updateAdInput) {
      _id
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

export const useUpdateAd = () => {
  return useMutation(updateAd);
};
