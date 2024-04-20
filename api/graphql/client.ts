import { Product } from './codegen/graphql';
import { BASE_URL } from '@/api/constants';
import { PUBLIC_PATH } from '@/constants';
import { authState } from '@/store/isLogin';
import { getFirstPath } from '@/util';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';

const merge = (existing = { totalCount: 0, data: [] }, incoming: any, args: any) => {
  const existingData = existing.data as any[];

  const incomingData = incoming.data as any[];

  const merged = existingData ? existingData.slice(0) : [];
  for (let i = 0; i < incomingData.length; ++i) {
    merged[existingData.length + i] = incomingData[i];
  }

  return { totalCount: incoming.totalCount, data: merged };
};

const logoutLink = onError(({ networkError, graphQLErrors }) => {
  const networkStatusCode = networkError && 'statusCode' in networkError && networkError.statusCode;
  const graphqlStatusCodeError =
    graphQLErrors && 'statusCode' in graphQLErrors?.[0] && graphQLErrors?.[0].statusCode;
  const isUnAuthorized = networkStatusCode === 401 || graphqlStatusCodeError === 401;
  const firstPath = getFirstPath(location.pathname);
  const isPrivatePath = !PUBLIC_PATH.includes(firstPath);
  if (isUnAuthorized && isPrivatePath) {
    authState({ loading: true, isLogin: false });
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

      fragment CategoryFragment on Category {
        _id
        name
      }

      fragment UserFragment on User {
        id
        role
        createdAt
      }

      fragment ProductFragment on Product {
        _id
        code
        barCode
        name
        wonPrice
        salePrice
        leadTime
        maintainDate
        category {
          ...CategoryFragment
        }
      }

      fragment ClientFragment on Client {
        _id
        code
        name
        feeRate
        clientType
        businessName
        businessNumber
        payDate
        manager
        managerTel
        inActive
      }

      fragment ClientInfo on ClientInfo {
        _id {
          productCode
          mallId
        }
        averagePayCost
        accPayCost
        accCount
        accProfit
      }

      fragment SaleInfo on SaleInfo {
        accPayCost
        accCount
        name
        accProfit
        averagePayCost
      }
    `),
    typePolicies: {
      Query: {
        fields: {
          logs: {
            keyArgs: false,
            merge,
          },
          productSales: {
            keyArgs: false,
            merge,
          },
          topClients: {
            keyArgs: false,
            merge,
          },
          clients: {
            keyArgs: false,
            merge,
          },
          products: {
            keyArgs: false,
            merge,
          },
          categories: {
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
