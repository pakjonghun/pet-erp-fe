import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateFactory = graphql(`
  mutation updateFactory($updateFactoryInput: UpdateFactoryInput!) {
    updateFactory(updateFactoryInput: $updateFactoryInput) {
      ...FactoryFragment
    }
  }
`);

export const useEditFactory = () => {
  return useMutation(updateFactory);
};
