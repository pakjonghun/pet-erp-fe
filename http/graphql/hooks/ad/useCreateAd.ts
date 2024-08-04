import { useMutation, useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { CreateAdInput } from '../../codegen/graphql';

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

export const useCreateAd = (createAdInput: CreateAdInput) => {
  return useMutation(createAd, {
    variables: {
      createAdInput,
    },
  });
};
