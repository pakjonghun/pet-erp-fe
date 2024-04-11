import { QueryLogsArgs } from './codegen/graphql';
import { BASE_URL } from '@/api/constants';
import { PUBLIC_PATH } from '@/constants';
import { isLogin } from '@/store/isLogin';
import { getFirstPath } from '@/util';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';

const merge = (existing = { totalCount: 0, data: [] }, incoming: any, { args }: any) => {
  const { args: _args } = args as unknown as { args: QueryLogsArgs };
  const existingData = existing.data;
  const incomingData = incoming.data;
  const mergedData = [...existingData, ...incomingData];
  return { totalCount: incoming.totalCount, data: mergedData };
};

const logoutLink = onError(({ networkError, graphQLErrors }) => {
  const networkStatusCode = networkError && 'statusCode' in networkError && networkError.statusCode;
  const graphqlStatusCodeError =
    graphQLErrors && 'statusCode' in graphQLErrors?.[0] && graphQLErrors?.[0].statusCode;
  const isUnAuthorized = networkStatusCode === 401 || graphqlStatusCodeError === 401;
  const firstPath = getFirstPath(location.pathname);
  const isPrivatePath = !PUBLIC_PATH.includes(firstPath);
  if (isUnAuthorized && isPrivatePath) {
    isLogin(false);
  }
});

const link = createHttpLink({
  uri: `${BASE_URL}/graphql`,
  credentials: 'include',
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(gql`
      fragment LogFragment on Log {
        _id
        userId
        description
        logType
      }

      fragment UserFragment on User {
        id
        role
        createdAt
      }
    `),
    typePolicies: {
      Query: {
        fields: {
          logs: {
            keyArgs: false,
            merge,
          },
        },
      },
    },
  }),

  link: logoutLink.concat(link),
  connectToDevTools: true,
});
