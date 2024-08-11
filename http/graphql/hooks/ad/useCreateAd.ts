import { useMutation, useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import {
  AdFragmentFragmentDoc,
  AdsOutput,
  AdsOutPutItem,
  CreateAdInput,
} from '../../codegen/graphql';

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
  return useMutation(createAd, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          ads: (existingData = { totalCount: 0, data: [] }) => {
            const newAdRef = cache.writeFragment({
              data: data?.createAd as AdsOutPutItem,
              fragment: AdFragmentFragmentDoc,
            });
            return {
              totalCount: existingData.totalCount + 1,
              data: [newAdRef, ...existingData.data],
            };
          },
        },
      });
    },
  });
};
