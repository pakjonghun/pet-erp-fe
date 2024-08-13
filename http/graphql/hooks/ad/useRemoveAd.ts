import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const removeAd = graphql(`
  mutation removeAd($_id: String!) {
    removeAd(_id: $_id) {
      _id
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

export const useRemoveAd = () => {
  return useMutation(removeAd, {
    update(cache, { data }) {
      const id = data?.removeAd?._id;
      const type = 'AdsOutPutItem';
      cache.evict({ id: `${type}:${id}` });
      cache.gc();
      cache.modify({
        fields: {
          ads: (existingData = { totalCount: 0, data: [] }) => {
            if (existingData.totalCount === 0) {
              return existingData;
            }
            return { totalCount: existingData.totalCount - 1, data: existingData.data };
          },
        },
      });
    },
  });
};
