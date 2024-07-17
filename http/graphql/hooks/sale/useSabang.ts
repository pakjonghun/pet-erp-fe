import { ProductCodeName } from './../../codegen/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

const loadSabangData = graphql(`
  mutation loadSabangData {
    loadSabangData {
      orderNumber
      productName
      productCode
      count
      mallId
    }
  }
`);

export const useLoadSabangData = () => {
  return useMutation(loadSabangData);
};
