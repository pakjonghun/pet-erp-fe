import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { SubsidiaryCategoriesInput } from '../../codegen/graphql';

const subsidiaryCategories = graphql(`
  query subsidiaryCategories($subsidiaryCategoriesInput: SubsidiaryCategoriesInput!) {
    subsidiaryCategories(subsidiaryCategoriesInput: $subsidiaryCategoriesInput) {
      totalCount
      data {
        _id
        name
      }
    }
  }
`);

export const useSubsidiaryCategories = (subsidiaryCategoriesInput: SubsidiaryCategoriesInput) => {
  return useQuery(subsidiaryCategories, {
    variables: {
      subsidiaryCategoriesInput,
    },
  });
};
