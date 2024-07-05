import { gql, useMutation, useQuery } from '@apollo/client';

const saleOut = gql`
  mutation OutSaleData {
    outSaleData
  }
`;
export const useSaleOut = () => {
  return useMutation(saleOut);
};
