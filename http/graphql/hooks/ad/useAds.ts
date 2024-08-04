import { AdsInput } from './../../codegen/graphql';
import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';

const ads = graphql(`
  query ads($adsInput: AdsInput!) {
    ads(adsInput: $adsInput) {
      totalCount
      data {
        productCodeList {
          name
          code
        }
        clientCode {
          name
          code
        }
        price
        type
        from
        to
      }
    }
  }
`);

export const useAds = (adsInput: AdsInput) => {
  return useQuery(ads, {
    variables: {
      adsInput,
    },
  });
};
