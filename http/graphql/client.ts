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

      fragment OptionFragment on OutputOption {
        id
        name
        productOptionList {
          productCode {
            code
            name
          }
          count
        }
      }

      fragment StockColumnFragment on StockColumn {
        stockCount
        leadTime
        leftDate
        monthSaleCount
        productName
        productCode
        wonPrice
      }

      fragment SubsidiaryStockColumnFragment on SubsidiaryStockColumn {
        stockCount
        leadTime
        productList
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
        orderDate
      }

      fragment FactoryFragment on Factory {
        _id
        name
        address
        phoneNumber
        note
        productList
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
        createdAt
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
        storageId
        category {
          ...ProductCategoryFragment
        }
        isFreeDeliveryFee
      }

      fragment OutClientFragment on OutClient {
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
        storageId
        deliveryFreeProductCodeList {
          name
          code
        }
        deliveryNotFreeProductCodeList {
          name
          code
        }
      }

      fragment ClientFragment on OutClient {
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
        storageId
      }

      fragment SaleInfo on SaleInfo {
        accPayCost
        accCount
        name
        accDeliveryCost
        accTotalPayment
      }
    `),
    typePolicies: {
      SaleInfos: {
        keyFields: () => {
          return [
            '_id',
            'name',
            'accPayCost',
            'accCount',
            'prevAccPayCost',
            'prevAccCount',
            'accDeliveryCost',
            'accTotalPayment',
          ];
        },
      },
      Query: {
        fields: {
          logs: {
            keyArgs: ['findLogsQuery', ['keyword', 'from', 'to', 'keywordTarget']],
            merge,
          },
          stockLogs: {
            keyArgs: ['findStockLogs', ['keyword', 'from', 'to', 'productCode']],
            merge,
          },
          topClients: {
            keyArgs: ['topClientInput', ['from', 'to']],
            merge,
          },
          subsidiaries: {
            keyArgs: ['clientsInput', ['keyword']],
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
          subsidiaryStocks: {
            keyArgs: ['stocksInput', ['keyword', 'storageName']],
            merge,
          },
          wholeSales: {
            keyArgs: ['wholeSalesInput', ['keyword', 'from', 'to']],
            merge,
          },
          productSales: {
            keyArgs: ['productSalesInput', ['keyword', 'from', 'to', 'sort', 'order']],
            merge,
          },
          saleMenuClients: {
            keyArgs: ['saleMenuClientsInput', ['keyword', 'from', 'to']],
            merge,
          },
          options: {
            keyArgs: ['optionsInput', ['keyword']],
            merge,
          },
          saleOrders: {
            keyArgs: [
              'saleOrdersInput',
              ['productName', 'mallId', 'from', 'to', 'orderNumber', 'sort', 'order'],
            ],
            merge,
          },
        },
      },
    },
  }),
  link,
});
