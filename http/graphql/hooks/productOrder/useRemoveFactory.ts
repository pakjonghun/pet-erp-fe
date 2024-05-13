import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { Factory } from '../../codegen/graphql';

const removeFactory = graphql(`
  mutation removeFactory($_id: String!) {
    removeFactory(_id: $_id) {
      ...FactoryFragment
    }
  }
`);
export const useRemoveFactory = () => {
  return useMutation(removeFactory, {
    update(cache, { data }) {
      const typeName = data?.removeFactory.__typename;
      const id = (data?.removeFactory as Factory)._id;
      cache.evict({ id: `${typeName}:${id}` });
      cache.gc();
      cache.modify({
        fields: {
          factories(existingFactories = { totalCount: 0, data: [] }) {
            return { totalCount: existingFactories.totalCount - 1, data: existingFactories.data };
          },
        },
      });
    },
  });
};
