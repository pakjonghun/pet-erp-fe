import { Sale } from './codegen/graphql';
import { BASE_URL } from '@/http/constants';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import { merge } from '@/utils/common';

const link = createHttpLink({
  uri: `${BASE_URL}/graphql`,
  credentials: 'include',
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(gql`
      fragment DeliveryCostFragment on DeliveryCost {
        deliveryCost
        year
        month
      }

      fragment StockColumnFragment on StockColumn {
        stockCount
        leadTime
        leftDate
        monthSaleCount
        productName
        wonPrice
      }

      fragment ProductOrderFragment on ProductOrder {
        _id
        factory {
          _id
          name
        }
        products {
          count
          product {
            _id
            name
            leadTime
          }
        }
        payCost
        notPayCost
        totalPayCost
        isDone
        createdAt
      }

      fragment FactoryFragment on Factory {
        _id
        name
        address
        phoneNumber
        note
      }

      fragment StorageFragment on Storage {
        _id
        name
        address
        phoneNumber
        note
      }

      fragment SubsidiaryCategoryFragment on SubsidiaryCategory {
        _id
        name
      }

      fragment SubsidiaryFragment on Subsidiary {
        _id
        code
        name
        productList {
          _id
          name
        }
        category {
          _id
          name
        }
        wonPrice
        leadTime
      }

      fragment LogFragment on Log {
        _id
        userId
        description
        logType
      }

      fragment ProductCategoryFragment on ProductCategory {
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
          ...ProductCategoryFragment
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
            keyArgs: ['findLogsQuery', ['keyword', 'from', 'to', 'keywordTarget']],
            merge,
          },

          topClients: {
            keyArgs: ['topClientInput', ['from', 'to']],
            merge,
          },
          clients: {
            keyArgs: ['clientsInput', ['keyword']],
            merge,
          },
          products: {
            keyArgs: ['productsInput', ['keyword']],
            merge,
          },
          categories: {
            keyArgs: ['categoriesInput', ['keyword']],
            merge,
          },
          subsidiaryCategories: {
            keyArgs: ['categoriesInput', ['keyword']],
            merge,
          },
          factories: {
            keyArgs: ['factoriesInput', ['keyword']],
            merge,
          },
          storages: {
            keyArgs: ['storagesInput', ['keyword']],
            merge,
          },
          orders: {
            keyArgs: ['ordersInput', ['keyword']],
            merge,
          },
          stocks: {
            keyArgs: ['stocksInput', ['keyword', 'storageName']],
            merge,
          },
          productCountStocks: {
            keyArgs: ['productCountStocksInput', ['keyword', 'storageName']],
            merge,
          },
          wholeSales: {
            keyArgs: ['wholeSalesInput', ['keyword', 'from', 'to']],
            merge,
          },
          productSales: {
            keyArgs: ['productSalesInput', ['keyword', 'from', 'to']],
            merge,
          },
        },
      },
    },
  }),
  link,
});
