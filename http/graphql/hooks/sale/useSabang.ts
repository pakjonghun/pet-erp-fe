import { useMutation, useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

const loadSabangData = graphql(`
  mutation loadSabangData {
    loadSabangData {
      month
    }
  }
`);

export const useLoadSabangData = () => {
  return useMutation(loadSabangData);
};
