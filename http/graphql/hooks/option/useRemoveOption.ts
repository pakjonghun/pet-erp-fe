import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const removeOption = graphql(`
  mutation removeOption($id: String!) {
    removeOption(id: $id) {
      _id
      name
    }
  }
`);

export const useRemoveOption = () => {
  return useMutation(removeOption, {
    notifyOnNetworkStatusChange: true,
    update(cache, { data }) {
      const id = data?.removeOption._id;
      const type = 'OutputOption';
      cache.evict({ id: `${type}:${id}` });
      cache.gc();
      cache.modify({
        fields: {
          options: (existingData = { totalCount: 0, data: [] }) => {
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
