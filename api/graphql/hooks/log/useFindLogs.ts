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

export const useFindLogs = (findLogsQuery: FindLogsDto) => {
  return useQuery(findLogDocument, {
    variables: {
      findLogsQuery,
    },
    notifyOnNetworkStatusChange: true,
  });
};
