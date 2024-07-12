import { graphql } from '../../codegen';
import { useQuery } from '@apollo/client';
import { FindStockLogs } from '../../codegen/graphql';

const stockLogs = graphql(`
  query stockLogs($findStockLogs: FindStockLogs!) {
    stockLogs(findStockLogs: $findStockLogs) {
      totalCount
      data {
        ...LogFragment
      }
    }
  }
`);

export const useFindStockLogs = (findStockLogs: FindStockLogs) => {
  return useQuery(stockLogs, {
    variables: {
      findStockLogs,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });
};
