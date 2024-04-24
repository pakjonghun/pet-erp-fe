import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { CategoriesInput } from '../../codegen/graphql';

const findManyCategory = graphql(`
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

export const useFindManyCategory = (categoriesInput: CategoriesInput) => {
  return useQuery(findManyCategory, {
    variables: {
      categoriesInput,
    },
    notifyOnNetworkStatusChange: true,
  });
};
