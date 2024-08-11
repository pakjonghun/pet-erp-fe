import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const createAd = graphql(`
  mutation createAd($createAdInput: CreateAdInput!) {
    createAd(createAdInput: $createAdInput) {
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

export const useCreateAd = () => {
  return useMutation(createAd);
};
