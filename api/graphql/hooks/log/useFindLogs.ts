import { graphql } from '../../codegen';
import { useSuspenseQuery } from '@apollo/client';
import { QueryLogsArgs } from '../../codegen/graphql';

const findLogDocument = graphql(`
  query logs($findLogsQuery: FindLogsDTO!) {
    logs(findLogsQuery: $findLogsQuery) {
      totalCount
      data {
        ...LogFragment
      }
    }
  }
`);

export const useFindLogs = (variables: QueryLogsArgs) => {
  return useSuspenseQuery(findLogDocument, { variables, returnPartialData: true });
};
