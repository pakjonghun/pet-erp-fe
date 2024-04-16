import { useQuery } from '@apollo/client';
import { graphql } from '../../codegen';
import { FindManyCategoryInput } from '../../codegen/graphql';

const findManyCategory = graphql(`
  query categories($findManyCategoryInput: FindManyCategoryInput!) {
    categories(findManyCategoryInput: $findManyCategoryInput) {
      totalCount
      data {
        _id
        name
      }
    }
  }
`);

export const useFindManyCategory = (findManyCategoryInput: FindManyCategoryInput) => {
  return useQuery(findManyCategory, {
    variables: {
      findManyCategoryInput,
    },
  });
};
