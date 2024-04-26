import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { CategoriesInput } from '../../codegen/graphql';

const findManyProductCategory = graphql(`
  query categories($categoriesInput: CategoriesInput!) {
    categories(categoriesInput: $categoriesInput) {
      totalCount
      data {
        _id
        name
      }
    }
  }
`);

export const useFindManyProductCategory = (categoriesInput: CategoriesInput) => {
  return useQuery(findManyProductCategory, {
    variables: {
      categoriesInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
