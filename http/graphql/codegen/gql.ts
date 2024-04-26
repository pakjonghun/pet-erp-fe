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
    "\n      fragment SubsidiaryCategoryFragment on SubsidiaryCategory {\n        _id\n        name\n      }\n\n      fragment SubsidiaryFragment on Subsidiary {\n        code\n        name\n        productList {\n          _id\n          name\n        }\n        category {\n          _id\n          name\n        }\n        wonPrice\n        leadTime\n      }\n\n      fragment LogFragment on Log {\n        _id\n        userId\n        description\n        logType\n      }\n\n      fragment ProductCategoryFragment on ProductCategory {\n        _id\n        name\n      }\n\n      fragment UserFragment on User {\n        id\n        role\n        createdAt\n      }\n\n      fragment ProductFragment on Product {\n        _id\n        code\n        barCode\n        name\n        wonPrice\n        salePrice\n        leadTime\n        maintainDate\n        category {\n          ...ProductCategoryFragment\n        }\n      }\n\n      fragment ClientFragment on Client {\n        _id\n        code\n        name\n        feeRate\n        clientType\n        businessName\n        businessNumber\n        payDate\n        manager\n        managerTel\n        inActive\n      }\n\n      fragment ClientInfo on ClientInfo {\n        _id {\n          productCode\n          mallId\n        }\n        averagePayCost\n        accPayCost\n        accCount\n        accProfit\n      }\n\n      fragment SaleInfo on SaleInfo {\n        accPayCost\n        accCount\n        name\n        accProfit\n        averagePayCost\n      }\n    ": types.SubsidiaryCategoryFragmentFragmentDoc,
    "\n  query clients($clientsInput: ClientsInput!) {\n    clients(clientsInput: $clientsInput) {\n      totalCount\n      data {\n        ...ClientFragment\n      }\n    }\n  }\n": types.ClientsDocument,
    "\n  mutation createClient($createClientInput: CreateClientInput!) {\n    createClient(createClientInput: $createClientInput) {\n      ...ClientFragment\n    }\n  }\n": types.CreateClientDocument,
    "\n  mutation removeClient($_id: String!) {\n    removeClient(_id: $_id) {\n      _id\n      name\n    }\n  }\n": types.RemoveClientDocument,
    "\n  mutation updateClient($updateClientInput: UpdateClientInput!) {\n    updateClient(updateClientInput: $updateClientInput) {\n      ...ClientFragment\n    }\n  }\n": types.UpdateClientDocument,
    "\n  query topClients($topClientInput: TopClientInput!) {\n    topClients(topClientInput: $topClientInput) {\n      totalCount\n      data {\n        accProfit\n        accPayCost\n        accCount\n        name\n      }\n    }\n  }\n": types.TopClientsDocument,
    "\n  query logs($findLogsQuery: FindLogsDTO!) {\n    logs(findLogsQuery: $findLogsQuery) {\n      totalCount\n      data {\n        ...LogFragment\n      }\n    }\n  }\n": types.LogsDocument,
    "\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      _id\n      name\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(updateCategoryInput: $updateCategoryInput) {\n      _id\n      name\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  query categories($categoriesInput: CategoriesInput!) {\n    categories(categoriesInput: $categoriesInput) {\n      totalCount\n      data {\n        _id\n        name\n      }\n    }\n  }\n": types.CategoriesDocument,
    "\n  mutation removeCategory($_id: String!) {\n    removeCategory(_id: $_id) {\n      _id\n      name\n    }\n  }\n": types.RemoveCategoryDocument,
    "\n  mutation createProduct($createProductInput: CreateProductInput!) {\n    createProduct(createProductInput: $createProductInput) {\n      ...ProductFragment\n    }\n  }\n": types.CreateProductDocument,
    "\n  query productSale($productCode: String!) {\n    productSale(productCode: $productCode) {\n      _id\n      accPayCost\n      accProfit\n    }\n  }\n": types.ProductSaleDocument,
    "\n  query productSales($productSalesInput: ProductSaleInput!) {\n    productSales(productSalesInput: $productSalesInput) {\n      totalCount\n      data {\n        code\n        name\n        clients {\n          ...ClientInfo\n        }\n        today {\n          ...SaleInfo\n        }\n        thisWeek {\n          ...SaleInfo\n        }\n        lastWeek {\n          ...SaleInfo\n        }\n        thisMonth {\n          ...SaleInfo\n        }\n      }\n    }\n  }\n": types.ProductSalesDocument,
    "\n  query products($productsInput: ProductsInput!) {\n    products(productsInput: $productsInput) {\n      totalCount\n      data {\n        ...ProductFragment\n      }\n    }\n  }\n": types.ProductsDocument,
    "\n  mutation removeProduct($_id: String!) {\n    removeProduct(_id: $_id) {\n      _id\n      name\n    }\n  }\n": types.RemoveProductDocument,
    "\n  mutation updateProduct($updateProductInput: UpdateProductInput!) {\n    updateProduct(updateProductInput: $updateProductInput) {\n      ...ProductFragment\n    }\n  }\n": types.UpdateProductDocument,
    "\n  mutation createSubsidiaryCategory(\n    $createSubsidiaryCategoryInput: CreateSubsidiaryCategoryInput!\n  ) {\n    createSubsidiaryCategory(createSubsidiaryCategoryInput: $createSubsidiaryCategoryInput) {\n      ...SubsidiaryCategoryFragment\n    }\n  }\n": types.CreateSubsidiaryCategoryDocument,
    "\n  mutation removeSubsidiaryCategory($_id: String!) {\n    removeSubsidiaryCategory(_id: $_id) {\n      _id\n      name\n    }\n  }\n": types.RemoveSubsidiaryCategoryDocument,
    "\n  query subsidiaryCategories($subsidiaryCategoriesInput: SubsidiaryCategoriesInput!) {\n    subsidiaryCategories(subsidiaryCategoriesInput: $subsidiaryCategoriesInput) {\n      totalCount\n      data {\n        _id\n        name\n      }\n    }\n  }\n": types.SubsidiaryCategoriesDocument,
    "\n    mutation updateSubsidiaryCategory(\n      $updateSubsidiaryCategoryInput: UpdateSubsidiaryCategoryInput!\n    ) {\n      updateSubsidiaryCategory(updateSubsidiaryCategoryInput: $updateSubsidiaryCategoryInput) {\n        ...SubsidiaryCategoryFragment\n      }\n    }\n  ": types.UpdateSubsidiaryCategoryDocument,
    "\n  mutation createSubsidiary($createSubsidiaryInput: CreateSubsidiaryInput!) {\n    createSubsidiary(createSubsidiaryInput: $createSubsidiaryInput) {\n      ...SubsidiaryFragment\n    }\n  }\n": types.CreateSubsidiaryDocument,
    "\n  mutation removeSubsidiary($_id: String!) {\n    removeSubsidiary(_id: $_id) {\n      _id\n      name\n    }\n  }\n": types.RemoveSubsidiaryDocument,
    "\n  query subsidiaries($subsidiariesInput: SubsidiariesInput!) {\n    subsidiaries(subsidiariesInput: $subsidiariesInput) {\n      totalCount\n      data {\n        ...SubsidiaryFragment\n      }\n    }\n  }\n": types.SubsidiariesDocument,
    "\n  mutation updateSubsidiary($updateSubsidiaryInput: UpdateSubsidiaryInput!) {\n    updateSubsidiary(updateSubsidiaryInput: $updateSubsidiaryInput) {\n      ...SubsidiaryFragment\n    }\n  }\n": types.UpdateSubsidiaryDocument,
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
export function graphql(source: "\n      fragment SubsidiaryCategoryFragment on SubsidiaryCategory {\n        _id\n        name\n      }\n\n      fragment SubsidiaryFragment on Subsidiary {\n        code\n        name\n        productList {\n          _id\n          name\n        }\n        category {\n          _id\n          name\n        }\n        wonPrice\n        leadTime\n      }\n\n      fragment LogFragment on Log {\n        _id\n        userId\n        description\n        logType\n      }\n\n      fragment ProductCategoryFragment on ProductCategory {\n        _id\n        name\n      }\n\n      fragment UserFragment on User {\n        id\n        role\n        createdAt\n      }\n\n      fragment ProductFragment on Product {\n        _id\n        code\n        barCode\n        name\n        wonPrice\n        salePrice\n        leadTime\n        maintainDate\n        category {\n          ...ProductCategoryFragment\n        }\n      }\n\n      fragment ClientFragment on Client {\n        _id\n        code\n        name\n        feeRate\n        clientType\n        businessName\n        businessNumber\n        payDate\n        manager\n        managerTel\n        inActive\n      }\n\n      fragment ClientInfo on ClientInfo {\n        _id {\n          productCode\n          mallId\n        }\n        averagePayCost\n        accPayCost\n        accCount\n        accProfit\n      }\n\n      fragment SaleInfo on SaleInfo {\n        accPayCost\n        accCount\n        name\n        accProfit\n        averagePayCost\n      }\n    "): (typeof documents)["\n      fragment SubsidiaryCategoryFragment on SubsidiaryCategory {\n        _id\n        name\n      }\n\n      fragment SubsidiaryFragment on Subsidiary {\n        code\n        name\n        productList {\n          _id\n          name\n        }\n        category {\n          _id\n          name\n        }\n        wonPrice\n        leadTime\n      }\n\n      fragment LogFragment on Log {\n        _id\n        userId\n        description\n        logType\n      }\n\n      fragment ProductCategoryFragment on ProductCategory {\n        _id\n        name\n      }\n\n      fragment UserFragment on User {\n        id\n        role\n        createdAt\n      }\n\n      fragment ProductFragment on Product {\n        _id\n        code\n        barCode\n        name\n        wonPrice\n        salePrice\n        leadTime\n        maintainDate\n        category {\n          ...ProductCategoryFragment\n        }\n      }\n\n      fragment ClientFragment on Client {\n        _id\n        code\n        name\n        feeRate\n        clientType\n        businessName\n        businessNumber\n        payDate\n        manager\n        managerTel\n        inActive\n      }\n\n      fragment ClientInfo on ClientInfo {\n        _id {\n          productCode\n          mallId\n        }\n        averagePayCost\n        accPayCost\n        accCount\n        accProfit\n      }\n\n      fragment SaleInfo on SaleInfo {\n        accPayCost\n        accCount\n        name\n        accProfit\n        averagePayCost\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query clients($clientsInput: ClientsInput!) {\n    clients(clientsInput: $clientsInput) {\n      totalCount\n      data {\n        ...ClientFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query clients($clientsInput: ClientsInput!) {\n    clients(clientsInput: $clientsInput) {\n      totalCount\n      data {\n        ...ClientFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createClient($createClientInput: CreateClientInput!) {\n    createClient(createClientInput: $createClientInput) {\n      ...ClientFragment\n    }\n  }\n"): (typeof documents)["\n  mutation createClient($createClientInput: CreateClientInput!) {\n    createClient(createClientInput: $createClientInput) {\n      ...ClientFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeClient($_id: String!) {\n    removeClient(_id: $_id) {\n      _id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation removeClient($_id: String!) {\n    removeClient(_id: $_id) {\n      _id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateClient($updateClientInput: UpdateClientInput!) {\n    updateClient(updateClientInput: $updateClientInput) {\n      ...ClientFragment\n    }\n  }\n"): (typeof documents)["\n  mutation updateClient($updateClientInput: UpdateClientInput!) {\n    updateClient(updateClientInput: $updateClientInput) {\n      ...ClientFragment\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      _id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      _id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(updateCategoryInput: $updateCategoryInput) {\n      _id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(updateCategoryInput: $updateCategoryInput) {\n      _id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categories($categoriesInput: CategoriesInput!) {\n    categories(categoriesInput: $categoriesInput) {\n      totalCount\n      data {\n        _id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query categories($categoriesInput: CategoriesInput!) {\n    categories(categoriesInput: $categoriesInput) {\n      totalCount\n      data {\n        _id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeCategory($_id: String!) {\n    removeCategory(_id: $_id) {\n      _id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation removeCategory($_id: String!) {\n    removeCategory(_id: $_id) {\n      _id\n      name\n    }\n  }\n"];
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
export function graphql(source: "\n  query productSales($productSalesInput: ProductSaleInput!) {\n    productSales(productSalesInput: $productSalesInput) {\n      totalCount\n      data {\n        code\n        name\n        clients {\n          ...ClientInfo\n        }\n        today {\n          ...SaleInfo\n        }\n        thisWeek {\n          ...SaleInfo\n        }\n        lastWeek {\n          ...SaleInfo\n        }\n        thisMonth {\n          ...SaleInfo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query productSales($productSalesInput: ProductSaleInput!) {\n    productSales(productSalesInput: $productSalesInput) {\n      totalCount\n      data {\n        code\n        name\n        clients {\n          ...ClientInfo\n        }\n        today {\n          ...SaleInfo\n        }\n        thisWeek {\n          ...SaleInfo\n        }\n        lastWeek {\n          ...SaleInfo\n        }\n        thisMonth {\n          ...SaleInfo\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query products($productsInput: ProductsInput!) {\n    products(productsInput: $productsInput) {\n      totalCount\n      data {\n        ...ProductFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query products($productsInput: ProductsInput!) {\n    products(productsInput: $productsInput) {\n      totalCount\n      data {\n        ...ProductFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeProduct($_id: String!) {\n    removeProduct(_id: $_id) {\n      _id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation removeProduct($_id: String!) {\n    removeProduct(_id: $_id) {\n      _id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProduct($updateProductInput: UpdateProductInput!) {\n    updateProduct(updateProductInput: $updateProductInput) {\n      ...ProductFragment\n    }\n  }\n"): (typeof documents)["\n  mutation updateProduct($updateProductInput: UpdateProductInput!) {\n    updateProduct(updateProductInput: $updateProductInput) {\n      ...ProductFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSubsidiaryCategory(\n    $createSubsidiaryCategoryInput: CreateSubsidiaryCategoryInput!\n  ) {\n    createSubsidiaryCategory(createSubsidiaryCategoryInput: $createSubsidiaryCategoryInput) {\n      ...SubsidiaryCategoryFragment\n    }\n  }\n"): (typeof documents)["\n  mutation createSubsidiaryCategory(\n    $createSubsidiaryCategoryInput: CreateSubsidiaryCategoryInput!\n  ) {\n    createSubsidiaryCategory(createSubsidiaryCategoryInput: $createSubsidiaryCategoryInput) {\n      ...SubsidiaryCategoryFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeSubsidiaryCategory($_id: String!) {\n    removeSubsidiaryCategory(_id: $_id) {\n      _id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation removeSubsidiaryCategory($_id: String!) {\n    removeSubsidiaryCategory(_id: $_id) {\n      _id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query subsidiaryCategories($subsidiaryCategoriesInput: SubsidiaryCategoriesInput!) {\n    subsidiaryCategories(subsidiaryCategoriesInput: $subsidiaryCategoriesInput) {\n      totalCount\n      data {\n        _id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query subsidiaryCategories($subsidiaryCategoriesInput: SubsidiaryCategoriesInput!) {\n    subsidiaryCategories(subsidiaryCategoriesInput: $subsidiaryCategoriesInput) {\n      totalCount\n      data {\n        _id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateSubsidiaryCategory(\n      $updateSubsidiaryCategoryInput: UpdateSubsidiaryCategoryInput!\n    ) {\n      updateSubsidiaryCategory(updateSubsidiaryCategoryInput: $updateSubsidiaryCategoryInput) {\n        ...SubsidiaryCategoryFragment\n      }\n    }\n  "): (typeof documents)["\n    mutation updateSubsidiaryCategory(\n      $updateSubsidiaryCategoryInput: UpdateSubsidiaryCategoryInput!\n    ) {\n      updateSubsidiaryCategory(updateSubsidiaryCategoryInput: $updateSubsidiaryCategoryInput) {\n        ...SubsidiaryCategoryFragment\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSubsidiary($createSubsidiaryInput: CreateSubsidiaryInput!) {\n    createSubsidiary(createSubsidiaryInput: $createSubsidiaryInput) {\n      ...SubsidiaryFragment\n    }\n  }\n"): (typeof documents)["\n  mutation createSubsidiary($createSubsidiaryInput: CreateSubsidiaryInput!) {\n    createSubsidiary(createSubsidiaryInput: $createSubsidiaryInput) {\n      ...SubsidiaryFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeSubsidiary($_id: String!) {\n    removeSubsidiary(_id: $_id) {\n      _id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation removeSubsidiary($_id: String!) {\n    removeSubsidiary(_id: $_id) {\n      _id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query subsidiaries($subsidiariesInput: SubsidiariesInput!) {\n    subsidiaries(subsidiariesInput: $subsidiariesInput) {\n      totalCount\n      data {\n        ...SubsidiaryFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query subsidiaries($subsidiariesInput: SubsidiariesInput!) {\n    subsidiaries(subsidiariesInput: $subsidiariesInput) {\n      totalCount\n      data {\n        ...SubsidiaryFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSubsidiary($updateSubsidiaryInput: UpdateSubsidiaryInput!) {\n    updateSubsidiary(updateSubsidiaryInput: $updateSubsidiaryInput) {\n      ...SubsidiaryFragment\n    }\n  }\n"): (typeof documents)["\n  mutation updateSubsidiary($updateSubsidiaryInput: UpdateSubsidiaryInput!) {\n    updateSubsidiary(updateSubsidiaryInput: $updateSubsidiaryInput) {\n      ...SubsidiaryFragment\n    }\n  }\n"];
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