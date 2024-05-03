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
  _id?: Maybe<ClientId>;
  accCount?: Maybe<Scalars['Int']['output']>;
  accPayCost?: Maybe<Scalars['Int']['output']>;
  accProfit?: Maybe<Scalars['Float']['output']>;
  averagePayCost?: Maybe<Scalars['Float']['output']>;
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

export type CreateFactoryInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateLogDto = {
  description: Scalars['String']['input'];
  logType: LogType;
  userId: Scalars['String']['input'];
};

export type CreateMoveInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateOrderInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
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

export type CreateStockInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateStorageInput = {
  exampleField: Scalars['Int']['input'];
};

export type CreateSubsidiaryCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateSubsidiaryInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  leadTime?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  productList?: InputMaybe<Array<Scalars['String']['input']>>;
  wonPrice?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateUserDto = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type CreateWholeSaleInput = {
  mallId?: InputMaybe<Scalars['String']['input']>;
  payCost?: InputMaybe<Scalars['Int']['input']>;
  productList: Array<CreateWholeSaleProductList>;
  saleAt?: InputMaybe<Scalars['Date']['input']>;
  storage: Scalars['String']['input'];
  wonCost?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateWholeSaleProductList = {
  code: Scalars['String']['input'];
  count?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateWholesaleSupplierInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type Factory = {
  __typename?: 'Factory';
  address?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type FindDateInput = {
  from: Scalars['Date']['input'];
  to: Scalars['Date']['input'];
};

export type FindLogsDto = {
  from: Scalars['Date']['input'];
  keyword: Scalars['String']['input'];
  keywordTarget: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Order>;
  skip: Scalars['Int']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
  to: Scalars['Date']['input'];
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

export type Move = {
  __typename?: 'Move';
  _id: Scalars['ID']['output'];
  count: Scalars['Int']['output'];
  fromDate: Scalars['Date']['output'];
  fromStock: Stock;
  product: Product;
  subsidiary: Subsidiary;
  toDate: Scalars['Date']['output'];
  toStock: Stock;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: ProductCategory;
  createClient: Client;
  createFactory: Factory;
  createLog: Log;
  createMove: Move;
  createOrder: ProductOrder;
  createProduct: Product;
  createStock: Stock;
  createStorage: Storage;
  createSubsidiary: Subsidiary;
  createSubsidiaryCategory: SubsidiaryCategory;
  createUser: User;
  createWholeSale: Sale;
  createWholesaleSupplier: WholesaleSupplier;
  removeCategory: ProductCategory;
  removeClient: Client;
  removeFactory: Factory;
  removeMove: Move;
  removeOrder: ProductOrder;
  removeProduct: Product;
  removeStock: Stock;
  removeStorage: Storage;
  removeSubsidiary: Subsidiary;
  removeSubsidiaryCategory: SubsidiaryCategory;
  removeUser: User;
  removeWholeSale: Sale;
  removeWholesaleSupplier: WholesaleSupplier;
  updateCategory: ProductCategory;
  updateClient: Client;
  updateFactory: Factory;
  updateMove: Move;
  updateOrder: ProductOrder;
  updateProduct: Product;
  updateProfile: User;
  updateStock: Stock;
  updateStorage: Storage;
  updateSubsidiary: Subsidiary;
  updateSubsidiaryCategory: SubsidiaryCategory;
  updateUser: User;
  updateWholeSale: Sale;
  updateWholesaleSupplier: WholesaleSupplier;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateClientArgs = {
  createClientInput: CreateClientInput;
};


export type MutationCreateFactoryArgs = {
  createFactoryInput: CreateFactoryInput;
};


export type MutationCreateLogArgs = {
  createLogInput: CreateLogDto;
};


export type MutationCreateMoveArgs = {
  createMoveInput: CreateMoveInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateStockArgs = {
  createStockInput: CreateStockInput;
};


export type MutationCreateStorageArgs = {
  createStorageInput: CreateStorageInput;
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


export type MutationCreateWholeSaleArgs = {
  createWholeSaleInput: CreateWholeSaleInput;
};


export type MutationCreateWholesaleSupplierArgs = {
  createWholesaleSupplierInput: CreateWholesaleSupplierInput;
};


export type MutationRemoveCategoryArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveClientArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveFactoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveMoveArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveOrderArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProductArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveStockArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveStorageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveSubsidiaryArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveSubsidiaryCategoryArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveWholeSaleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveWholesaleSupplierArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateClientArgs = {
  updateClientInput: UpdateClientInput;
};


export type MutationUpdateFactoryArgs = {
  updateFactoryInput: UpdateFactoryInput;
};


export type MutationUpdateMoveArgs = {
  updateMoveInput: UpdateMoveInput;
};


export type MutationUpdateOrderArgs = {
  updateOrderInput: UpdateOrderInput;
};


export type MutationUpdateProductArgs = {
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileDto;
};


export type MutationUpdateStockArgs = {
  updateStockInput: UpdateStockInput;
};


export type MutationUpdateStorageArgs = {
  updateStorageInput: UpdateStorageInput;
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


export type MutationUpdateWholeSaleArgs = {
  updateWholeSaleInput: UpdateWholeSaleInput;
};


export type MutationUpdateWholesaleSupplierArgs = {
  updateWholesaleSupplierInput: UpdateWholesaleSupplierInput;
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

export type ProductOrder = {
  __typename?: 'ProductOrder';
  _id: Scalars['ID']['output'];
  count: Scalars['Int']['output'];
  factory: Factory;
  notPayCost: Scalars['Int']['output'];
  payCost: Scalars['Int']['output'];
  product: Product;
  storage: Storage;
  totalPayCost: Scalars['Int']['output'];
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
  leadTime?: Maybe<Scalars['Int']['output']>;
  maintainDate?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  salePrice?: Maybe<Scalars['Int']['output']>;
  sales?: Maybe<SaleInfos>;
  wonPrice?: Maybe<Scalars['Int']['output']>;
};

export type ProductSaleInput = {
  from: Scalars['Date']['input'];
  keyword: Scalars['String']['input'];
  keywordTarget: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Order>;
  skip: Scalars['Int']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
  to: Scalars['Date']['input'];
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
  dashboardClient?: Maybe<TotalSaleInfo>;
  dashboardClients?: Maybe<Array<SaleInfos>>;
  dashboardProduct?: Maybe<TotalSaleInfo>;
  dashboardProducts?: Maybe<Array<SaleInfos>>;
  factory: Factory;
  findAll: Array<ProductOrder>;
  findOne: ProductOrder;
  logs: FindLogsResponseDto;
  move: Move;
  myInfo: MyInfo;
  product: Product;
  productSale?: Maybe<Array<ProductSaleChartOutput>>;
  productSales?: Maybe<ProductSaleOutput>;
  products: ProductsOutput;
  stock: Stock;
  storage: Storage;
  subsidiaries: SubsidiariesOutput;
  subsidiaryCategories: SubsidiaryCategoriesOutput;
  user: User;
  users: Array<User>;
  wholeSale: Sale;
  wholesaleSupplier: WholesaleSupplier;
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


export type QueryDashboardClientArgs = {
  dashboardClientInput?: InputMaybe<FindDateInput>;
};


export type QueryDashboardClientsArgs = {
  dashboardClientsInput?: InputMaybe<FindDateInput>;
};


export type QueryDashboardProductArgs = {
  dashboardProductInput?: InputMaybe<FindDateInput>;
};


export type QueryDashboardProductsArgs = {
  dashboardProductsInput?: InputMaybe<FindDateInput>;
};


export type QueryFactoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLogsArgs = {
  findLogsQuery: FindLogsDto;
};


export type QueryMoveArgs = {
  id: Scalars['Int']['input'];
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


export type QueryStockArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStorageArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySubsidiariesArgs = {
  subsidiariesInput: SubsidiariesInput;
};


export type QuerySubsidiaryCategoriesArgs = {
  subsidiaryCategoriesInput: SubsidiaryCategoriesInput;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryWholeSaleArgs = {
  _id: Scalars['String']['input'];
};


export type QueryWholesaleSupplierArgs = {
  id: Scalars['Int']['input'];
};

export type Sale = {
  __typename?: 'Sale';
  _id: Scalars['ID']['output'];
  address1?: Maybe<Scalars['String']['output']>;
  barCode?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  consignee?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  deliveryCost?: Maybe<Scalars['String']['output']>;
  deliveryName?: Maybe<Scalars['String']['output']>;
  invoiceNumber?: Maybe<Scalars['String']['output']>;
  isWholeSale?: Maybe<Scalars['Boolean']['output']>;
  mallId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  orderNumber?: Maybe<Scalars['String']['output']>;
  orderStatus?: Maybe<Scalars['String']['output']>;
  originOrderNumber?: Maybe<Scalars['String']['output']>;
  payCost?: Maybe<Scalars['Int']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  productCode?: Maybe<Scalars['String']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  saleAt?: Maybe<Scalars['Date']['output']>;
  shoppingMall?: Maybe<Scalars['String']['output']>;
  telephoneNumber1?: Maybe<Scalars['String']['output']>;
  wonCost?: Maybe<Scalars['Int']['output']>;
};

export type SaleInfo = {
  __typename?: 'SaleInfo';
  accCount?: Maybe<Scalars['Int']['output']>;
  accPayCost?: Maybe<Scalars['Int']['output']>;
  accProfit?: Maybe<Scalars['Float']['output']>;
  averagePayCost?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type SaleInfos = {
  __typename?: 'SaleInfos';
  accCount?: Maybe<Scalars['Int']['output']>;
  accPayCost?: Maybe<Scalars['Int']['output']>;
  accProfit?: Maybe<Scalars['Float']['output']>;
  averagePayCost?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  prevAccCount?: Maybe<Scalars['Int']['output']>;
  prevAccPayCost?: Maybe<Scalars['Int']['output']>;
  prevAccProfit?: Maybe<Scalars['Float']['output']>;
  prevAveragePayCost?: Maybe<Scalars['Float']['output']>;
};

export type Stock = {
  __typename?: 'Stock';
  _id: Scalars['ID']['output'];
  isSubsidiary: Scalars['Boolean']['output'];
  product: Product;
  storage: Storage;
};

export type Storage = {
  __typename?: 'Storage';
  _id: Scalars['ID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type SubsidiariesInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type SubsidiariesOutput = {
  __typename?: 'SubsidiariesOutput';
  data: Array<Subsidiary>;
  totalCount: Scalars['Int']['output'];
};

export type Subsidiary = {
  __typename?: 'Subsidiary';
  _id: Scalars['ID']['output'];
  category?: Maybe<SubsidiaryCategory>;
  code: Scalars['String']['output'];
  leadTime?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  productList?: Maybe<Array<Product>>;
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
  _id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type TotalSaleInfo = {
  __typename?: 'TotalSaleInfo';
  current?: Maybe<SaleInfo>;
  previous?: Maybe<SaleInfo>;
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

export type UpdateFactoryInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateMoveInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateOrderInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
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

export type UpdateStockInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateStorageInput = {
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
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

export type UpdateWholeSaleInput = {
  _id: Scalars['String']['input'];
  mallId?: InputMaybe<Scalars['String']['input']>;
  payCost?: InputMaybe<Scalars['Int']['input']>;
  productList?: InputMaybe<Array<CreateWholeSaleProductList>>;
  saleAt?: InputMaybe<Scalars['Date']['input']>;
  storage?: InputMaybe<Scalars['String']['input']>;
  wonCost?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateWholesaleSupplierInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
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

export type WholesaleSupplier = {
  __typename?: 'WholesaleSupplier';
  _id: Scalars['ID']['output'];
  address1?: Maybe<Scalars['String']['output']>;
  feeRate?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  telephoneNumber1?: Maybe<Scalars['String']['output']>;
};

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

export type SubsidiaryCategoryFragmentFragment = { __typename?: 'SubsidiaryCategory', _id?: string | null, name?: string | null } & { ' $fragmentName'?: 'SubsidiaryCategoryFragmentFragment' };

export type SubsidiaryFragmentFragment = { __typename?: 'Subsidiary', _id: string, code: string, name: string, wonPrice?: number | null, leadTime?: number | null, productList?: Array<{ __typename?: 'Product', _id: string, name: string }> | null, category?: { __typename?: 'SubsidiaryCategory', _id?: string | null, name?: string | null } | null } & { ' $fragmentName'?: 'SubsidiaryFragmentFragment' };

export type LogFragmentFragment = { __typename?: 'Log', _id: string, userId: string, description: string, logType: LogType } & { ' $fragmentName'?: 'LogFragmentFragment' };

export type ProductCategoryFragmentFragment = { __typename?: 'ProductCategory', _id?: string | null, name?: string | null } & { ' $fragmentName'?: 'ProductCategoryFragmentFragment' };

export type UserFragmentFragment = { __typename?: 'User', id: string, role: UserRole, createdAt: any } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type ProductFragmentFragment = { __typename?: 'Product', _id: string, code: string, barCode?: string | null, name: string, wonPrice?: number | null, salePrice?: number | null, leadTime?: number | null, maintainDate?: number | null, category?: (
    { __typename?: 'ProductCategory' }
    & { ' $fragmentRefs'?: { 'ProductCategoryFragmentFragment': ProductCategoryFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'ProductFragmentFragment' };

export type ClientFragmentFragment = { __typename?: 'Client', _id: string, code: string, name: string, feeRate?: number | null, clientType: ClientType, businessName?: string | null, businessNumber?: string | null, payDate?: number | null, manager?: string | null, managerTel?: string | null, inActive?: boolean | null } & { ' $fragmentName'?: 'ClientFragmentFragment' };

export type ClientInfoFragment = { __typename?: 'ClientInfo', averagePayCost?: number | null, accPayCost?: number | null, accCount?: number | null, accProfit?: number | null, _id?: { __typename?: 'ClientId', productCode: string, mallId: string } | null } & { ' $fragmentName'?: 'ClientInfoFragment' };

export type SaleInfoFragment = { __typename?: 'SaleInfo', accPayCost?: number | null, accCount?: number | null, name?: string | null, accProfit?: number | null, averagePayCost?: number | null } & { ' $fragmentName'?: 'SaleInfoFragment' };

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

export type DashboardClientQueryVariables = Exact<{
  dashboardClientInput: FindDateInput;
}>;


export type DashboardClientQuery = { __typename?: 'Query', dashboardClient?: { __typename?: 'TotalSaleInfo', current?: { __typename?: 'SaleInfo', accPayCost?: number | null, accCount?: number | null, name?: string | null, accProfit?: number | null, averagePayCost?: number | null } | null, previous?: { __typename?: 'SaleInfo', accPayCost?: number | null, accCount?: number | null, name?: string | null, accProfit?: number | null, averagePayCost?: number | null } | null } | null };

export type DashboardClientsQueryVariables = Exact<{
  dashboardClientsInput: FindDateInput;
}>;


export type DashboardClientsQuery = { __typename?: 'Query', dashboardClients?: Array<{ __typename?: 'SaleInfos', name?: string | null, accPayCost?: number | null, accCount?: number | null, accProfit?: number | null, averagePayCost?: number | null, prevAccPayCost?: number | null, prevAccCount?: number | null, prevAccProfit?: number | null, prevAveragePayCost?: number | null }> | null };

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

export type DashboardProductQueryVariables = Exact<{
  dashboardProductInput: FindDateInput;
}>;


export type DashboardProductQuery = { __typename?: 'Query', dashboardProduct?: { __typename?: 'TotalSaleInfo', current?: { __typename?: 'SaleInfo', accPayCost?: number | null, accCount?: number | null, name?: string | null, accProfit?: number | null, averagePayCost?: number | null } | null, previous?: { __typename?: 'SaleInfo', accPayCost?: number | null, accCount?: number | null, name?: string | null, accProfit?: number | null, averagePayCost?: number | null } | null } | null };

export type DashboardProductsQueryVariables = Exact<{
  dashboardProductsInput: FindDateInput;
}>;


export type DashboardProductsQuery = { __typename?: 'Query', dashboardProducts?: Array<{ __typename?: 'SaleInfos', name?: string | null, accPayCost?: number | null, accCount?: number | null, accProfit?: number | null, averagePayCost?: number | null, prevAccPayCost?: number | null, prevAccCount?: number | null, prevAccProfit?: number | null, prevAveragePayCost?: number | null }> | null };

export type ProductSaleQueryVariables = Exact<{
  productCode: Scalars['String']['input'];
}>;


export type ProductSaleQuery = { __typename?: 'Query', productSale?: Array<{ __typename?: 'ProductSaleChartOutput', _id: any, accPayCost?: number | null, accProfit?: number | null }> | null };

export type ProductSalesQueryVariables = Exact<{
  productSalesInput: ProductSaleInput;
}>;


export type ProductSalesQuery = { __typename?: 'Query', productSales?: { __typename?: 'ProductSaleOutput', totalCount: number, data: Array<{ __typename?: 'ProductSaleData', code: string, name: string, clients: Array<(
        { __typename?: 'ClientInfo' }
        & { ' $fragmentRefs'?: { 'ClientInfoFragment': ClientInfoFragment } }
      )>, sales?: { __typename?: 'SaleInfos', accPayCost?: number | null, accCount?: number | null, name?: string | null, accProfit?: number | null, averagePayCost?: number | null, prevAccPayCost?: number | null, prevAccCount?: number | null, prevAccProfit?: number | null, prevAveragePayCost?: number | null } | null }> } | null };

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


export type RemoveSubsidiaryCategoryMutation = { __typename?: 'Mutation', removeSubsidiaryCategory: { __typename?: 'SubsidiaryCategory', _id?: string | null, name?: string | null } };

export type SubsidiaryCategoriesQueryVariables = Exact<{
  subsidiaryCategoriesInput: SubsidiaryCategoriesInput;
}>;


export type SubsidiaryCategoriesQuery = { __typename?: 'Query', subsidiaryCategories: { __typename?: 'SubsidiaryCategoriesOutput', totalCount: number, data: Array<{ __typename?: 'SubsidiaryCategory', _id?: string | null, name?: string | null }> } };

export type UpdateSubsidiaryCategoryMutationVariables = Exact<{
  updateSubsidiaryCategoryInput: UpdateSubsidiaryCategoryInput;
}>;


export type UpdateSubsidiaryCategoryMutation = { __typename?: 'Mutation', updateSubsidiaryCategory: (
    { __typename?: 'SubsidiaryCategory' }
    & { ' $fragmentRefs'?: { 'SubsidiaryCategoryFragmentFragment': SubsidiaryCategoryFragmentFragment } }
  ) };

export type CreateSubsidiaryMutationVariables = Exact<{
  createSubsidiaryInput: CreateSubsidiaryInput;
}>;


export type CreateSubsidiaryMutation = { __typename?: 'Mutation', createSubsidiary: (
    { __typename?: 'Subsidiary' }
    & { ' $fragmentRefs'?: { 'SubsidiaryFragmentFragment': SubsidiaryFragmentFragment } }
  ) };

export type RemoveSubsidiaryMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveSubsidiaryMutation = { __typename?: 'Mutation', removeSubsidiary: { __typename?: 'Subsidiary', _id: string, name: string } };

export type SubsidiariesQueryVariables = Exact<{
  subsidiariesInput: SubsidiariesInput;
}>;


export type SubsidiariesQuery = { __typename?: 'Query', subsidiaries: { __typename?: 'SubsidiariesOutput', totalCount: number, data: Array<(
      { __typename?: 'Subsidiary' }
      & { ' $fragmentRefs'?: { 'SubsidiaryFragmentFragment': SubsidiaryFragmentFragment } }
    )> } };

export type UpdateSubsidiaryMutationVariables = Exact<{
  updateSubsidiaryInput: UpdateSubsidiaryInput;
}>;


export type UpdateSubsidiaryMutation = { __typename?: 'Mutation', updateSubsidiary: (
    { __typename?: 'Subsidiary' }
    & { ' $fragmentRefs'?: { 'SubsidiaryFragmentFragment': SubsidiaryFragmentFragment } }
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
export const SubsidiaryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subsidiary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]} as unknown as DocumentNode<SubsidiaryFragmentFragment, unknown>;
export const LogFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logType"}}]}}]} as unknown as DocumentNode<LogFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const ProductCategoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ProductCategoryFragmentFragment, unknown>;
export const ProductFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"maintainDate"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ProductFragmentFragment, unknown>;
export const ClientFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}}]}}]} as unknown as DocumentNode<ClientFragmentFragment, unknown>;
export const ClientInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClientInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCode"}},{"kind":"Field","name":{"kind":"Name","value":"mallId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}}]}}]} as unknown as DocumentNode<ClientInfoFragment, unknown>;
export const SaleInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SaleInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}}]}}]} as unknown as DocumentNode<SaleInfoFragment, unknown>;
export const ClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"clients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClientFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}}]}}]} as unknown as DocumentNode<ClientsQuery, ClientsQueryVariables>;
export const CreateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createClientInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createClientInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createClientInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClientFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}}]}}]} as unknown as DocumentNode<CreateClientMutation, CreateClientMutationVariables>;
export const DashboardClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dashboardClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardClientInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardClientInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardClientInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}}]}}]}}]}}]} as unknown as DocumentNode<DashboardClientQuery, DashboardClientQueryVariables>;
export const DashboardClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dashboardClients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardClientsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardClients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardClientsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardClientsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccCount"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"prevAveragePayCost"}}]}}]}}]} as unknown as DocumentNode<DashboardClientsQuery, DashboardClientsQueryVariables>;
export const RemoveClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveClientMutation, RemoveClientMutationVariables>;
export const UpdateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateClientInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateClientInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateClientInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClientFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}}]}}]} as unknown as DocumentNode<UpdateClientMutation, UpdateClientMutationVariables>;
export const LogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"logs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findLogsQuery"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindLogsDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"findLogsQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findLogsQuery"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logType"}}]}}]} as unknown as DocumentNode<LogsQuery, LogsQueryVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoriesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoriesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoriesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const RemoveCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createProductInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createProductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createProductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"maintainDate"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const DashboardProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dashboardProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardProductInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardProductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardProductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}}]}}]}}]}}]} as unknown as DocumentNode<DashboardProductQuery, DashboardProductQueryVariables>;
export const DashboardProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dashboardProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardProductsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardProductsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardProductsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccCount"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"prevAveragePayCost"}}]}}]}}]} as unknown as DocumentNode<DashboardProductsQuery, DashboardProductsQueryVariables>;
export const ProductSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}}]}}]}}]} as unknown as DocumentNode<ProductSaleQuery, ProductSaleQueryVariables>;
export const ProductSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productSalesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productSales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productSalesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productSalesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClientInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccCount"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"prevAveragePayCost"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClientInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCode"}},{"kind":"Field","name":{"kind":"Name","value":"mallId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"averagePayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}}]}}]} as unknown as DocumentNode<ProductSalesQuery, ProductSalesQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"products"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"maintainDate"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const RemoveProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveProductMutation, RemoveProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProductInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"maintainDate"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const CreateSubsidiaryCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSubsidiaryCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createSubsidiaryCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubsidiaryCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubsidiaryCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createSubsidiaryCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createSubsidiaryCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubsidiaryCategoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiaryCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CreateSubsidiaryCategoryMutation, CreateSubsidiaryCategoryMutationVariables>;
export const RemoveSubsidiaryCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeSubsidiaryCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSubsidiaryCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveSubsidiaryCategoryMutation, RemoveSubsidiaryCategoryMutationVariables>;
export const SubsidiaryCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"subsidiaryCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subsidiaryCategoriesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiaryCategoriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subsidiaryCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subsidiaryCategoriesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subsidiaryCategoriesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SubsidiaryCategoriesQuery, SubsidiaryCategoriesQueryVariables>;
export const UpdateSubsidiaryCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSubsidiaryCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSubsidiaryCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSubsidiaryCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSubsidiaryCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateSubsidiaryCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSubsidiaryCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubsidiaryCategoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiaryCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<UpdateSubsidiaryCategoryMutation, UpdateSubsidiaryCategoryMutationVariables>;
export const CreateSubsidiaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSubsidiary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createSubsidiaryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubsidiaryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubsidiary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createSubsidiaryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createSubsidiaryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubsidiaryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subsidiary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]} as unknown as DocumentNode<CreateSubsidiaryMutation, CreateSubsidiaryMutationVariables>;
export const RemoveSubsidiaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeSubsidiary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSubsidiary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveSubsidiaryMutation, RemoveSubsidiaryMutationVariables>;
export const SubsidiariesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"subsidiaries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subsidiariesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiariesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subsidiaries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subsidiariesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subsidiariesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubsidiaryFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subsidiary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]} as unknown as DocumentNode<SubsidiariesQuery, SubsidiariesQueryVariables>;
export const UpdateSubsidiaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSubsidiary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSubsidiaryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSubsidiaryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSubsidiary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateSubsidiaryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSubsidiaryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubsidiaryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subsidiary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]} as unknown as DocumentNode<UpdateSubsidiaryMutation, UpdateSubsidiaryMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveUserMutation, RemoveUserMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const MyInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<MyInfoQuery, MyInfoQueryVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProfileInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;