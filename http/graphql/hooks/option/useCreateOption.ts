import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { OptionFragmentFragmentDoc, OutputOption } from '../../codegen/graphql';

const createOption = graphql(`
  mutation createOption($createOptionInput: CreateOptionInput!) {
    createOption(createOptionInput: $createOptionInput) {
      ...OptionFragment
    }
  }
`);

export const useCreateOption = () => {
  return useMutation(createOption, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          clients: (existingData = { totalCount: 0, data: [] }) => {
            const newClientRef = cache.writeFragment({
              data: data?.createOption as OutputOption,
              fragment: OptionFragmentFragmentDoc,
            });
            return {
              totalCount: existingData + 1,
              data: [newClientRef, ...existingData.data],
            };
          },
        },
      });
    },
  });
};
