import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { Factory, FactoryFragmentFragmentDoc } from '../../codegen/graphql';
const createFactory = graphql(`
  mutation createFactory($createFactoryInput: CreateFactoryInput!) {
    createFactory(createFactoryInput: $createFactoryInput) {
      ...FactoryFragment
    }
  }
`);

export const useCreateFactory = () => {
  return useMutation(createFactory, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          factories(existingFactories = { totalCount: 0, data: [] }) {
            const newCategoryRef = cache.writeFragment({
              data: data?.createFactory as Factory,
              fragment: FactoryFragmentFragmentDoc,
            });
            return {
              totalCount: existingFactories.totalCount + 1,
              data: [newCategoryRef, ...existingFactories.data],
            };
          },
        },
      });
    },
  });
};
