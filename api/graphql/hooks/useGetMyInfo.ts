import { useQuery } from '@apollo/client';
import { graphql } from '../codegen';

const getMyInfoDocument = graphql(`
  query myInfo {
    myInfo {
      id
      role
    }
  }
`);

export const useGetMyInfo = () => {
  return useQuery(getMyInfoDocument);
};
