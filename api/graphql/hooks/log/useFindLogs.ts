import { graphql } from '../../codegen';
import { useQuery } from '@apollo/client';
import { FindLogsDto, QueryLogsArgs } from '../../codegen/graphql';

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
  return useQuery(findLogDocument, { variables });
};
