import { graphql } from '../codegen';

export const UserFragment = graphql(`
  fragment UserFragment on User {
    id
    role
    createdAt
  }
`);
