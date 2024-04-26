/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

export type CategoriesInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type CategoriesOutput = {
  __typename?: 'CategoriesOutput';
  data: Array<ProductCategory>;
  totalCount: Scalars['Int']['output'];
};

export type Client = {
  __typename?: 'Client';
  _id: Scalars['ID']['output'];
  businessName?: Maybe<Scalars['String']['output']>;
  businessNumber?: Maybe<Scalars['String']['output']>;
  clientType: ClientType;
  code: Scalars['String']['output'];
  feeRate?: Maybe<Scalars['Float']['output']>;
  inActive?: Maybe<Scalars['Boolean']['output']>;
  manager?: Maybe<Scalars['String']['output']>;
  managerTel?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  payDate?: Maybe<Scalars['Int']['output']>;
};

export type ClientId = {
  __typename?: 'ClientId';
  mallId: Scalars['String']['output'];
  productCode: Scalars['String']['output'];
};

export type ClientInfo = {
  __typename?: 'ClientInfo';
  _id: ClientId;
  accCount: Scalars['Int']['output'];
  accPayCost: Scalars['Int']['output'];
  accProfit: Scalars['Float']['output'];
  averagePayCost: Scalars['Float']['output'];
};

export type ClientsInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type ClientsOutput = {
  __typename?: 'ClientsOutput';
  data: Array<Client>;
  totalCount: Scalars['Int']['output'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateClientInput = {
  businessName?: InputMaybe<Scalars['String']['input']>;
  businessNumber?: InputMaybe<Scalars['String']['input']>;
  clientType?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  feeRate?: InputMaybe<Scalars['Float']['input']>;
  inActive?: InputMaybe<Scalars['Boolean']['input']>;
  manager?: InputMaybe<Scalars['String']['input']>;
  managerTel?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  payDate?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateLogDto = {
  description: Scalars['String']['input'];
  logType: LogType;
  userId: Scalars['String']['input'];
};

export type CreateProductInput = {
  barCode?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  leadTime?: InputMaybe<Scalars['Int']['input']>;
  maintainDate?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  salePrice?: InputMaybe<Scalars['Int']['input']>;
  wonPrice?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateSubsidiaryCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateSubsidiaryInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  leadTime?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  productList: Array<Scalars['String']['input']>;
  wonPrice?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateUserDto = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type FindLogsDto = {
  from?: InputMaybe<Scalars['Date']['input']>;
  keyword: Scalars['String']['input'];
  keywordTarget: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Order>;
  skip: Scalars['Int']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};

export type FindLogsResponseDto = {
  __typename?: 'FindLogsResponseDTO';
  data: Array<Log>;
  totalCount: Scalars['Int']['output'];
};

export type Log = {
  __typename?: 'Log';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  logType: LogType;
  userId: Scalars['String']['output'];
};

export enum LogType {
  Create = 'CREATE',
  Delete = 'DELETE',
  Read = 'READ',
  Update = 'UPDATE',
  Upload = 'UPLOAD'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: ProductCategory;
  createClient: Client;
  createLog: Log;
  createProduct: Product;
  createSubsidiary: Subsidiary;
  createSubsidiaryCategory: SubsidiaryCategory;
  createUser: User;
  removeCategory: ProductCategory;
  removeClient: Client;
  removeProduct: Product;
  removeSubsidiary: Subsidiary;
  removeSubsidiaryCategory: SubsidiaryCategory;
  removeUser: User;
  updateCategory: ProductCategory;
  updateClient: Client;
  updateProduct: Product;
  updateProfile: User;
  updateSubsidiary: Subsidiary;
  updateSubsidiaryCategory: SubsidiaryCategory;
  updateUser: User;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateClientArgs = {
  createClientInput: CreateClientInput;
};


export type MutationCreateLogArgs = {
  createLogInput: CreateLogDto;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateSubsidiaryArgs = {
  createSubsidiaryInput: CreateSubsidiaryInput;
};


export type MutationCreateSubsidiaryCategoryArgs = {
  createSubsidiaryCategoryInput: CreateSubsidiaryCategoryInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserDto;
};


export type MutationRemoveCategoryArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveClientArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveProductArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveSubsidiaryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveSubsidiaryCategoryArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateClientArgs = {
  updateClientInput: UpdateClientInput;
};


export type MutationUpdateProductArgs = {
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileDto;
};


export type MutationUpdateSubsidiaryArgs = {
  updateSubsidiaryInput: UpdateSubsidiaryInput;
};


export type MutationUpdateSubsidiaryCategoryArgs = {
  updateSubsidiaryCategoryInput: UpdateSubsidiaryCategoryInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserDto;
};

export type MyInfo = {
  __typename?: 'MyInfo';
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  role: UserRole;
};

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID']['output'];
  barCode?: Maybe<Scalars['String']['output']>;
  category?: Maybe<ProductCategory>;
  code: Scalars['String']['output'];
  leadTime?: Maybe<Scalars['Int']['output']>;
  maintainDate?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  salePrice?: Maybe<Scalars['Int']['output']>;
  wonPrice?: Maybe<Scalars['Int']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  _id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ProductSaleChartOutput = {
  __typename?: 'ProductSaleChartOutput';
  _id: Scalars['Date']['output'];
  accPayCost?: Maybe<Scalars['Int']['output']>;
  accProfit?: Maybe<Scalars['Int']['output']>;
};

export type ProductSaleData = {
  __typename?: 'ProductSaleData';
  _id: Scalars['ID']['output'];
  barCode?: Maybe<Scalars['String']['output']>;
  category?: Maybe<ProductCategory>;
  clients: Array<ClientInfo>;
  code: Scalars['String']['output'];
  lastWeek?: Maybe<SaleInfo>;
  leadTime?: Maybe<Scalars['Int']['output']>;
  maintainDate?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  salePrice?: Maybe<Scalars['Int']['output']>;
  thisMonth?: Maybe<SaleInfo>;
  thisWeek?: Maybe<SaleInfo>;
  today?: Maybe<SaleInfo>;
  wonPrice?: Maybe<Scalars['Int']['output']>;
};

export type ProductSaleInput = {
  keyword: Scalars['String']['input'];
  keywordTarget: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Order>;
  skip: Scalars['Int']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type ProductSaleOutput = {
  __typename?: 'ProductSaleOutput';
  data: Array<ProductSaleData>;
  totalCount: Scalars['Int']['output'];
};

export type ProductsInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type ProductsOutput = {
  __typename?: 'ProductsOutput';
  data: Array<Product>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  categories: CategoriesOutput;
  client: Client;
  clients: ClientsOutput;
  logs: FindLogsResponseDto;
  myInfo: MyInfo;
  product: Product;
  productSale?: Maybe<Array<ProductSaleChartOutput>>;
  productSales: ProductSaleOutput;
  products: ProductsOutput;
  subsidiaries: Array<Subsidiary>;
  subsidiaryCategories: SubsidiaryCategoriesOutput;
  topClients: TopClientOutput;
  user: User;
  users: Array<User>;
};


export type QueryCategoriesArgs = {
  categoriesInput: CategoriesInput;
};


export type QueryClientArgs = {
  _id: Scalars['String']['input'];
};


export type QueryClientsArgs = {
  clientsInput: ClientsInput;
};


export type QueryLogsArgs = {
  findLogsQuery: FindLogsDto;
};


export type QueryProductArgs = {
  _id: Scalars['String']['input'];
};


export type QueryProductSaleArgs = {
  productCode: Scalars['String']['input'];
};


export type QueryProductSalesArgs = {
  productSalesInput: ProductSaleInput;
};


export type QueryProductsArgs = {
  productsInput: ProductsInput;
};


export type QuerySubsidiariesArgs = {
  subsidiariesInput: SubsidiariesInput;
};


export type QuerySubsidiaryCategoriesArgs = {
  subsidiaryCategoriesInput: SubsidiaryCategoriesInput;
};


export type QueryTopClientsArgs = {
  topClientInput: TopClientInput;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type SaleInfo = {
  __typename?: 'SaleInfo';
  accCount: Scalars['Int']['output'];
  accPayCost: Scalars['Int']['output'];
  accProfit: Scalars['Float']['output'];
  averagePayCost: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type SubsidiariesInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type Subsidiary = {
  __typename?: 'Subsidiary';
  _id: Scalars['ID']['output'];
  category?: Maybe<SubsidiaryCategory>;
  code: Scalars['String']['output'];
  leadTime?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  productList: Array<Product>;
  wonPrice?: Maybe<Scalars['Int']['output']>;
};

export type SubsidiaryCategoriesInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type SubsidiaryCategoriesOutput = {
  __typename?: 'SubsidiaryCategoriesOutput';
  data: Array<SubsidiaryCategory>;
  totalCount: Scalars['Int']['output'];
};

export type SubsidiaryCategory = {
  __typename?: 'SubsidiaryCategory';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type TopClientData = {
  __typename?: 'TopClientData';
  accCount: Scalars['Int']['output'];
  accPayCost: Scalars['Int']['output'];
  accProfit: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type TopClientInput = {
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type TopClientOutput = {
  __typename?: 'TopClientOutput';
  data: Array<TopClientData>;
  totalCount: Scalars['Int']['output'];
};

export type UpdateCategoryInput = {
  _id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClientInput = {
  _id: Scalars['String']['input'];
  businessName?: InputMaybe<Scalars['String']['input']>;
  businessNumber?: InputMaybe<Scalars['String']['input']>;
  clientType?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  feeRate?: InputMaybe<Scalars['Float']['input']>;
  inActive?: InputMaybe<Scalars['Boolean']['input']>;
  manager?: InputMaybe<Scalars['String']['input']>;
  managerTel?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payDate?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductInput = {
  _id: Scalars['String']['input'];
  barCode?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  leadTime?: InputMaybe<Scalars['Int']['input']>;
  maintainDate?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  salePrice?: InputMaybe<Scalars['Int']['input']>;
  wonPrice?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProfileDto = {
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubsidiaryCategoryInput = {
  _id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubsidiaryInput = {
  _id: Scalars['String']['input'];
  category?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  leadTime?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productList?: InputMaybe<Array<Scalars['String']['input']>>;
  wonPrice?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserDto = {
  id?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  role: UserRole;
  updatedAt: Scalars['Date']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Staff = 'STAFF'
}

export enum ClientType {
  Bender = 'bender',
  Cs = 'cs',
  Marketing = 'marketing',
  Offline = 'offline',
  OpenMarket = 'openMarket',
  Platform = 'platform',
  ProMall = 'proMall',
  Reward = 'reward',
  WholeSale = 'wholeSale'
}

export type SubsidiaryCategoryFragmentFragment = { __typename?: 'SubsidiaryCategory', _id: string, name: string } & { ' $fragmentName'?: 'SubsidiaryCategoryFragmentFragment' };

export type LogFragmentFragment = { __typename?: 'Log', _id: string, userId: string, description: string, logType: LogType } & { ' $fragmentName'?: 'LogFragmentFragment' };

export type ProductCategoryFragmentFragment = { __typename?: 'ProductCategory', _id?: string | null, name?: string | null } & { ' $fragmentName'?: 'ProductCategoryFragmentFragment' };

export type UserFragmentFragment = { __typename?: 'User', id: string, role: UserRole, createdAt: any } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type ProductFragmentFragment = { __typename?: 'Product', _id: string, code: string, barCode?: string | null, name: string, wonPrice?: number | null, salePrice?: number | null, leadTime?: number | null, maintainDate?: number | null, category?: (
    { __typename?: 'ProductCategory' }
    & { ' $fragmentRefs'?: { 'ProductCategoryFragmentFragment': ProductCategoryFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'ProductFragmentFragment' };

export type ClientFragmentFragment = { __typename?: 'Client', _id: string, code: string, name: string, feeRate?: number | null, clientType: ClientType, businessName?: string | null, businessNumber?: string | null, payDate?: number | null, manager?: string | null, managerTel?: string | null, inActive?: boolean | null } & { ' $fragmentName'?: 'ClientFragmentFragment' };

export type ClientInfoFragment = { __typename?: 'ClientInfo', averagePayCost: number, accPayCost: number, accCount: number, accProfit: number, _id: { __typename?: 'ClientId', productCode: string, mallId: string } } & { ' $fragmentName'?: 'ClientInfoFragment' };

export type SaleInfoFragment = { __typename?: 'SaleInfo', accPayCost: number, accCount: number, name: string, accProfit: number, averagePayCost: number } & { ' $fragmentName'?: 'SaleInfoFragment' };

export type ClientsQueryVariables = Exact<{
  clientsInput: ClientsInput;
}>;


export type ClientsQuery = { __typename?: 'Query', clients: { __typename?: 'ClientsOutput', totalCount: number, data: Array<(
      { __typename?: 'Client' }
      & { ' $fragmentRefs'?: { 'ClientFragmentFragment': ClientFragmentFragment } }
    )> } };

export type CreateClientMutationVariables = Exact<{
  createClientInput: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: (
    { __typename?: 'Client' }
    & { ' $fragmentRefs'?: { 'ClientFragmentFragment': ClientFragmentFragment } }
  ) };

export type RemoveClientMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveClientMutation = { __typename?: 'Mutation', removeClient: { __typename?: 'Client', _id: string, name: string } };

export type UpdateClientMutationVariables = Exact<{
  updateClientInput: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: (
    { __typename?: 'Client' }
    & { ' $fragmentRefs'?: { 'ClientFragmentFragment': ClientFragmentFragment } }
  ) };

export type TopClientsQueryVariables = Exact<{
  topClientInput: TopClientInput;
}>;


export type TopClientsQuery = { __typename?: 'Query', topClients: { __typename?: 'TopClientOutput', totalCount: number, data: Array<{ __typename?: 'TopClientData', accProfit: number, accPayCost: number, accCount: number, name: string }> } };

export type LogsQueryVariables = Exact<{
  findLogsQuery: FindLogsDto;
}>;


export type LogsQuery = { __typename?: 'Query', logs: { __typename?: 'FindLogsResponseDTO', totalCount: number, data: Array<(
      { __typename?: 'Log' }
      & { ' $fragmentRefs'?: { 'LogFragmentFragment': LogFragmentFragment } }
    )> } };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'ProductCategory', _id?: string | null, name?: string | null } };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryInput: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'ProductCategory', _id?: string | null, name?: string | null } };

export type CategoriesQueryVariables = Exact<{
  categoriesInput: CategoriesInput;
}>;


export type CategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'CategoriesOutput', totalCount: number, data: Array<{ __typename?: 'ProductCategory', _id?: string | null, name?: string | null }> } };

export type RemoveCategoryMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeCategory: { __typename?: 'ProductCategory', _id?: string | null, name?: string | null } };

export type CreateProductMutationVariables = Exact<{
  createProductInput: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: (
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'ProductFragmentFragment': ProductFragmentFragment } }
  ) };

export type ProductSaleQueryVariables = Exact<{
  productCode: Scalars['String']['input'];
}>;


export type ProductSaleQuery = { __typename?: 'Query', productSale?: Array<{ __typename?: 'ProductSaleChartOutput', _id: any, accPayCost?: number | null, accProfit?: number | null }> | null };

export type ProductSalesQueryVariables = Exact<{
  productSalesInput: ProductSaleInput;
}>;


export type ProductSalesQuery = { __typename?: 'Query', productSales: { __typename?: 'ProductSaleOutput', totalCount: number, data: Array<{ __typename?: 'ProductSaleData', code: string, name: string, clients: Array<(
        { __typename?: 'ClientInfo' }
        & { ' $fragmentRefs'?: { 'ClientInfoFragment': ClientInfoFragment } }
      )>, today?: (
        { __typename?: 'SaleInfo' }
        & { ' $fragmentRefs'?: { 'SaleInfoFragment': SaleInfoFragment } }
      ) | null, thisWeek?: (
        { __typename?: 'SaleInfo' }
        & { ' $fragmentRefs'?: { 'SaleInfoFragment': SaleInfoFragment } }
      ) | null, lastWeek?: (
        { __typename?: 'SaleInfo' }
        & { ' $fragmentRefs'?: { 'SaleInfoFragment': SaleInfoFragment } }
      ) | null, thisMonth?: (
        { __typename?: 'SaleInfo' }
        & { ' $fragmentRefs'?: { 'SaleInfoFragment': SaleInfoFragment } }
      ) | null }> } };

export type ProductsQueryVariables = Exact<{
  productsInput: ProductsInput;
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductsOutput', totalCount: number, data: Array<(
      { __typename?: 'Product' }
      & { ' $fragmentRefs'?: { 'ProductFragmentFragment': ProductFragmentFragment } }
    )> } };

export type RemoveProductMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutation', removeProduct: { __typename?: 'Product', _id: string, name: string } };

export type UpdateProductMutationVariables = Exact<{
  updateProductInput: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: (
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'ProductFragmentFragment': ProductFragmentFragment } }
  ) };

export type CreateSubsidiaryCategoryMutationVariables = Exact<{
  createSubsidiaryCategoryInput: CreateSubsidiaryCategoryInput;
}>;


export type CreateSubsidiaryCategoryMutation = { __typename?: 'Mutation', createSubsidiaryCategory: (
    { __typename?: 'SubsidiaryCategory' }
    & { ' $fragmentRefs'?: { 'SubsidiaryCategoryFragmentFragment': SubsidiaryCategoryFragmentFragment } }
  ) };

export type RemoveSubsidiaryCategoryMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveSubsidiaryCategoryMutation = { __typename?: 'Mutation', removeSubsidiaryCategory: { __typename?: 'SubsidiaryCategory', _id: string, name: string } };

export type SubsidiaryCategoriesQueryVariables = Exact<{
  subsidiaryCategoriesInput: SubsidiaryCategoriesInput;
}>;


export type SubsidiaryCategoriesQuery = { __typename?: 'Query', subsidiaryCategories: { __typename?: 'SubsidiaryCategoriesOutput', totalCount: number, data: Array<{ __typename?: 'SubsidiaryCategory', _id: string, name: string }> } };

export type UpdateSubsidiaryCategoryMutationVariables = Exact<{
  updateSubsidiaryCategoryInput: UpdateSubsidiaryCategoryInput;
}>;


export type UpdateSubsidiaryCategoryMutation = { __typename?: 'Mutation', updateSubsidiaryCategory: (
    { __typename?: 'SubsidiaryCategory' }
    & { ' $fragmentRefs'?: { 'SubsidiaryCategoryFragmentFragment': SubsidiaryCategoryFragmentFragment } }
  ) };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, role: UserRole, createdAt: any } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, role: UserRole, createdAt: any } };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, role: UserRole, createdAt: any }> };

export type MyInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MyInfoQuery = { __typename?: 'Query', myInfo: { __typename?: 'MyInfo', id: string, role: UserRole, createdAt: any } };

export type UpdateProfileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileDto;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, role: UserRole } };

export const SubsidiaryCategoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiaryCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SubsidiaryCategoryFragmentFragment, unknown>;
export const LogFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logType"}}]}}]} as unknown as DocumentNode<LogFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const ProductCategoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ProductCategoryFragmentFragment, unknown>;
export const ProductFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"maintainDate"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ProductFragmentFragment, unknown>;
export const ClientFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}}]}}]} as unknown as DocumentNode<ClientFragmentFragment, unknown>;
export const ClientInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClientInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCode"}},{"kind":"Field","name":{"kind":"Name","value":"mallId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}}]}}]} as unknown as DocumentNode<ClientInfoFragment, unknown>;
export const SaleInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SaleInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}}]}}]} as unknown as DocumentNode<SaleInfoFragment, unknown>;
export const ClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"clients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClientFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}}]}}]} as unknown as DocumentNode<ClientsQuery, ClientsQueryVariables>;
export const CreateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createClientInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createClientInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createClientInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClientFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}}]}}]} as unknown as DocumentNode<CreateClientMutation, CreateClientMutationVariables>;
export const RemoveClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveClientMutation, RemoveClientMutationVariables>;
export const UpdateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateClientInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateClientInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateClientInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClientFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}}]}}]} as unknown as DocumentNode<UpdateClientMutation, UpdateClientMutationVariables>;
export const TopClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"topClients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topClientInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TopClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topClients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topClientInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topClientInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<TopClientsQuery, TopClientsQueryVariables>;
export const LogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"logs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findLogsQuery"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindLogsDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"findLogsQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findLogsQuery"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logType"}}]}}]} as unknown as DocumentNode<LogsQuery, LogsQueryVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoriesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoriesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoriesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const RemoveCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createProductInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createProductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createProductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"maintainDate"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const ProductSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}}]}}]}}]} as unknown as DocumentNode<ProductSaleQuery, ProductSaleQueryVariables>;
export const ProductSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productSalesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productSales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productSalesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productSalesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClientInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"today"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thisWeek"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastWeek"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thisMonth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleInfo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClientInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCode"}},{"kind":"Field","name":{"kind":"Name","value":"mallId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SaleInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}}]}}]} as unknown as DocumentNode<ProductSalesQuery, ProductSalesQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"products"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"maintainDate"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const RemoveProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveProductMutation, RemoveProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProductInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"maintainDate"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const CreateSubsidiaryCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSubsidiaryCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createSubsidiaryCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubsidiaryCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubsidiaryCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createSubsidiaryCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createSubsidiaryCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubsidiaryCategoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiaryCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CreateSubsidiaryCategoryMutation, CreateSubsidiaryCategoryMutationVariables>;
export const RemoveSubsidiaryCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeSubsidiaryCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSubsidiaryCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveSubsidiaryCategoryMutation, RemoveSubsidiaryCategoryMutationVariables>;
export const SubsidiaryCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"subsidiaryCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subsidiaryCategoriesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiaryCategoriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subsidiaryCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subsidiaryCategoriesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subsidiaryCategoriesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SubsidiaryCategoriesQuery, SubsidiaryCategoriesQueryVariables>;
export const UpdateSubsidiaryCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSubsidiaryCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSubsidiaryCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSubsidiaryCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSubsidiaryCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateSubsidiaryCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSubsidiaryCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubsidiaryCategoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiaryCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<UpdateSubsidiaryCategoryMutation, UpdateSubsidiaryCategoryMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveUserMutation, RemoveUserMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const MyInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<MyInfoQuery, MyInfoQueryVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProfileInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;