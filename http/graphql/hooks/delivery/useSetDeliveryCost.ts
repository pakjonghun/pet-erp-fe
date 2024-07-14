import { useMutation } from '@apollo/client';
import { graphql } from '../../codegen';

const setDeliveryCost = graphql(`
  mutation setDeliveryCost($setDeliveryCostInput: SetDeliveryCostInput!) {
    setDeliveryCost(setDeliveryCostInput: $setDeliveryCostInput) {
      deliveryCost
      year
      month
      monthDeliveryPayCost
    }
  }
`);

export const useSetDeliveryCost = () => {
  return useMutation(setDeliveryCost, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          deliveryCost: (existingData) => {
            return data?.setDeliveryCost ?? existingData;
          },
        },
      });
    },
  });
};
