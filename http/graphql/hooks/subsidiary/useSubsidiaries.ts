import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';
import { SubsidiariesInput } from '../../codegen/graphql';

const subsidiaries = graphql(`
  query subsidiaries($subsidiariesInput: SubsidiariesInput!) {
    subsidiaries(subsidiariesInput: $subsidiariesInput) {
      totalCount
      data {
        ...SubsidiaryFragment
      }
    }
  }
`);

export const useSubsidiaries = (subsidiariesInput: SubsidiariesInput) => {
  return useMutation(subsidiaries, {
    variables: {
      subsidiariesInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
