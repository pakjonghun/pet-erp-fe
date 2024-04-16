/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      fragment LogFragment on Log {\n        _id\n        userId\n        description\n        logType\n      }\n\n      fragment UserFragment on User {\n        id\n        role\n        createdAt\n      }\n\n      fragment ProductFragment on Product {\n        _id\n        barCode\n        code\n        leadTime\n        maintainDate\n        name\n        salePrice\n      }\n\n      fragment ProductSaleFragment on ProductSaleData {\n        _id\n        barCode\n        code\n        leadTime\n        maintainDate\n        name\n        salePrice\n      }\n\n      fragment ClientInfo on ClientInfo {\n        _id {\n          productCode\n          mallId\n        }\n        averagePayCost\n        accPayCost\n        accCount\n        accProfit\n      }\n\n      fragment SaleInfo on SaleInfo {\n        accPayCost\n        accCount\n        name\n        accProfit\n        averagePayCost\n      }\n    ": types.LogFragmentFragmentDoc,
    "\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      _id\n      name\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  query topClients($topClientInput: TopClientInput!) {\n    topClients(topClientInput: $topClientInput) {\n      totalCount\n      data {\n        accProfit\n        accPayCost\n        accCount\n        name\n      }\n    }\n  }\n": types.TopClientsDocument,
    "\n  query logs($findLogsQuery: FindLogsDTO!) {\n    logs(findLogsQuery: $findLogsQuery) {\n      totalCount\n      data {\n        ...LogFragment\n      }\n    }\n  }\n": types.LogsDocument,
    "\n  mutation createProduct($createProductInput: CreateProductInput!) {\n    createProduct(createProductInput: $createProductInput) {\n      ...ProductFragment\n    }\n  }\n": types.CreateProductDocument,
    "\n  query productSale($productCode: String!) {\n    productSale(productCode: $productCode) {\n      _id\n      accPayCost\n      accProfit\n    }\n  }\n": types.ProductSaleDocument,
    "\n  query productSales($productSaleInput: ProductSaleInput!) {\n    productSales(productSaleInput: $productSaleInput) {\n      totalCount\n      data {\n        ...ProductSaleFragment\n        clients {\n          ...ClientInfo\n        }\n        today {\n          ...SaleInfo\n        }\n        thisWeek {\n          ...SaleInfo\n        }\n        lastWeek {\n          ...SaleInfo\n        }\n        thisMonth {\n          ...SaleInfo\n        }\n      }\n    }\n  }\n": types.ProductSalesDocument,
    "\n  mutation updateUser($updateUserInput: UpdateUserDTO!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n      role\n      createdAt\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserDTO!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      role\n      createdAt\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation RemoveUser($id: String!) {\n    removeUser(id: $id) {\n      id\n    }\n  }\n": types.RemoveUserDocument,
    "\n  query Users {\n    users {\n      id\n      role\n      createdAt\n    }\n  }\n": types.UsersDocument,
    "\n  query myInfo {\n    myInfo {\n      id\n      role\n      createdAt\n    }\n  }\n": types.MyInfoDocument,
    "\n  mutation UpdateProfile($updateProfileInput: UpdateProfileDTO!) {\n    updateProfile(updateProfileInput: $updateProfileInput) {\n      id\n      role\n    }\n  }\n": types.UpdateProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment LogFragment on Log {\n        _id\n        userId\n        description\n        logType\n      }\n\n      fragment UserFragment on User {\n        id\n        role\n        createdAt\n      }\n\n      fragment ProductFragment on Product {\n        _id\n        barCode\n        code\n        leadTime\n        maintainDate\n        name\n        salePrice\n      }\n\n      fragment ProductSaleFragment on ProductSaleData {\n        _id\n        barCode\n        code\n        leadTime\n        maintainDate\n        name\n        salePrice\n      }\n\n      fragment ClientInfo on ClientInfo {\n        _id {\n          productCode\n          mallId\n        }\n        averagePayCost\n        accPayCost\n        accCount\n        accProfit\n      }\n\n      fragment SaleInfo on SaleInfo {\n        accPayCost\n        accCount\n        name\n        accProfit\n        averagePayCost\n      }\n    "): (typeof documents)["\n      fragment LogFragment on Log {\n        _id\n        userId\n        description\n        logType\n      }\n\n      fragment UserFragment on User {\n        id\n        role\n        createdAt\n      }\n\n      fragment ProductFragment on Product {\n        _id\n        barCode\n        code\n        leadTime\n        maintainDate\n        name\n        salePrice\n      }\n\n      fragment ProductSaleFragment on ProductSaleData {\n        _id\n        barCode\n        code\n        leadTime\n        maintainDate\n        name\n        salePrice\n      }\n\n      fragment ClientInfo on ClientInfo {\n        _id {\n          productCode\n          mallId\n        }\n        averagePayCost\n        accPayCost\n        accCount\n        accProfit\n      }\n\n      fragment SaleInfo on SaleInfo {\n        accPayCost\n        accCount\n        name\n        accProfit\n        averagePayCost\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      _id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      _id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query topClients($topClientInput: TopClientInput!) {\n    topClients(topClientInput: $topClientInput) {\n      totalCount\n      data {\n        accProfit\n        accPayCost\n        accCount\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query topClients($topClientInput: TopClientInput!) {\n    topClients(topClientInput: $topClientInput) {\n      totalCount\n      data {\n        accProfit\n        accPayCost\n        accCount\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query logs($findLogsQuery: FindLogsDTO!) {\n    logs(findLogsQuery: $findLogsQuery) {\n      totalCount\n      data {\n        ...LogFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query logs($findLogsQuery: FindLogsDTO!) {\n    logs(findLogsQuery: $findLogsQuery) {\n      totalCount\n      data {\n        ...LogFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createProduct($createProductInput: CreateProductInput!) {\n    createProduct(createProductInput: $createProductInput) {\n      ...ProductFragment\n    }\n  }\n"): (typeof documents)["\n  mutation createProduct($createProductInput: CreateProductInput!) {\n    createProduct(createProductInput: $createProductInput) {\n      ...ProductFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query productSale($productCode: String!) {\n    productSale(productCode: $productCode) {\n      _id\n      accPayCost\n      accProfit\n    }\n  }\n"): (typeof documents)["\n  query productSale($productCode: String!) {\n    productSale(productCode: $productCode) {\n      _id\n      accPayCost\n      accProfit\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query productSales($productSaleInput: ProductSaleInput!) {\n    productSales(productSaleInput: $productSaleInput) {\n      totalCount\n      data {\n        ...ProductSaleFragment\n        clients {\n          ...ClientInfo\n        }\n        today {\n          ...SaleInfo\n        }\n        thisWeek {\n          ...SaleInfo\n        }\n        lastWeek {\n          ...SaleInfo\n        }\n        thisMonth {\n          ...SaleInfo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query productSales($productSaleInput: ProductSaleInput!) {\n    productSales(productSaleInput: $productSaleInput) {\n      totalCount\n      data {\n        ...ProductSaleFragment\n        clients {\n          ...ClientInfo\n        }\n        today {\n          ...SaleInfo\n        }\n        thisWeek {\n          ...SaleInfo\n        }\n        lastWeek {\n          ...SaleInfo\n        }\n        thisMonth {\n          ...SaleInfo\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUser($updateUserInput: UpdateUserDTO!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n      role\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateUser($updateUserInput: UpdateUserDTO!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n      role\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($createUserInput: CreateUserDTO!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      role\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($createUserInput: CreateUserDTO!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      role\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveUser($id: String!) {\n    removeUser(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveUser($id: String!) {\n    removeUser(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    users {\n      id\n      role\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      id\n      role\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query myInfo {\n    myInfo {\n      id\n      role\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query myInfo {\n    myInfo {\n      id\n      role\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProfile($updateProfileInput: UpdateProfileDTO!) {\n    updateProfile(updateProfileInput: $updateProfileInput) {\n      id\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($updateProfileInput: UpdateProfileDTO!) {\n    updateProfile(updateProfileInput: $updateProfileInput) {\n      id\n      role\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;