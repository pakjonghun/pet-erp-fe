import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const updateOption = graphql(`
  mutation updateOption($updateOptionInput: UpdateOptionInput!) {
    updateOption(updateOptionInput: $updateOptionInput) {
      ...OptionFragment
    }
  }
`);

export const useUpdateOption = () => {
  return useMutation(updateOption, { notifyOnNetworkStatusChange: true });
};
