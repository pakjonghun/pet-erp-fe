import { graphql } from '../../codegen';
import { useQuery, useSuspenseQuery } from '@apollo/client';
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
  return useQuery(findLogDocument, { variables, returnPartialData: true });
};
