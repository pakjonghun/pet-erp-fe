import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

export const getMyInfoDocument = graphql(`
  query myInfo {
    myInfo {
      id
      role
      createdAt
    }
  }
`);

export const useGetMyInfo = () => {
  return useQuery(getMyInfoDocument, {
    errorPolicy: 'ignore',
    notifyOnNetworkStatusChange: true,
  });
};
