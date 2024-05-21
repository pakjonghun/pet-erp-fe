import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import {
  SubsidiariesInput,
  SubsidiariesOutput,
  SubsidiariesQueryVariables,
} from '../../codegen/graphql';

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

export const useSubsidiaries = (subsidiariesInput: SubsidiariesInput, skip: boolean = false) => {
  return useQuery<{ subsidiaries: SubsidiariesOutput }, SubsidiariesQueryVariables>(subsidiaries, {
    variables: {
      subsidiariesInput,
    },
    notifyOnNetworkStatusChange: true,
    skip,
  });
};
