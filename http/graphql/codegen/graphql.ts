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
  /** Represents no value. */
  Void: { input: any; output: any; }
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
  deliveryFreeProductCodeList?: Maybe<Array<Scalars['String']['output']>>;
  deliveryNotFreeProductCodeList?: Maybe<Array<Scalars['String']['output']>>;
  feeRate?: Maybe<Scalars['Float']['output']>;
  inActive?: Maybe<Scalars['Boolean']['output']>;
  isSabangService?: Maybe<Scalars['Boolean']['output']>;
  manager?: Maybe<Scalars['String']['output']>;
  managerTel?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  payDate?: Maybe<Scalars['Int']['output']>;
  storageId?: Maybe<Scalars['String']['output']>;
};

export type ClientId = {
  __typename?: 'ClientId';
  mallId: Scalars['String']['output'];
  productCode: Scalars['String']['output'];
};

export type ClientInfoMenu = {
  __typename?: 'ClientInfoMenu';
  accCount?: Maybe<Scalars['Int']['output']>;
  accDeliveryCost?: Maybe<Scalars['Float']['output']>;
  accPayCost?: Maybe<Scalars['Int']['output']>;
  accTotalPayment?: Maybe<Scalars['Float']['output']>;
  accWonCost?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ClientSaleMenu = {
  __typename?: 'ClientSaleMenu';
  _id: Scalars['ID']['output'];
  accCount?: Maybe<Scalars['Int']['output']>;
  accDeliveryCost?: Maybe<Scalars['Float']['output']>;
  accPayCost?: Maybe<Scalars['Int']['output']>;
  accTotalPayment?: Maybe<Scalars['Float']['output']>;
  accWonCost?: Maybe<Scalars['Int']['output']>;
  businessName?: Maybe<Scalars['String']['output']>;
  businessNumber?: Maybe<Scalars['String']['output']>;
  clientType: ClientType;
  code: Scalars['String']['output'];
  feeRate?: Maybe<Scalars['Float']['output']>;
  inActive?: Maybe<Scalars['Boolean']['output']>;
  isSabangService?: Maybe<Scalars['Boolean']['output']>;
  monthSales?: Maybe<ProductSaleInfo>;
  name: Scalars['String']['output'];
  payDate?: Maybe<Scalars['Int']['output']>;
  prevAccCount?: Maybe<Scalars['Int']['output']>;
  prevAccDeliveryCost?: Maybe<Scalars['Float']['output']>;
  prevAccPayCost?: Maybe<Scalars['Int']['output']>;
  prevAccTotalPayment?: Maybe<Scalars['Float']['output']>;
  prevAccWonCost?: Maybe<Scalars['Int']['output']>;
  products: Array<ProductSaleInfo>;
};

export type ClientSaleMenuOutput = {
  __typename?: 'ClientSaleMenuOutput';
  data: Array<ClientSaleMenu>;
  totalCount: Scalars['Int']['output'];
};

export type ClientsInput = {
  clientType?: InputMaybe<Array<ClientType>>;
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type ClientsOutput = {
  __typename?: 'ClientsOutput';
  data: Array<OutClient>;
  totalCount: Scalars['Int']['output'];
};

export type CompleteOrderInput = {
  _id: Scalars['String']['input'];
  storageName: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateClientInput = {
  businessName?: InputMaybe<Scalars['String']['input']>;
  businessNumber?: InputMaybe<Scalars['String']['input']>;
  clientType?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  deliveryFreeProductCodeList?: InputMaybe<Array<Scalars['String']['input']>>;
  deliveryNotFreeProductCodeList?: InputMaybe<Array<Scalars['String']['input']>>;
  feeRate?: InputMaybe<Scalars['Float']['input']>;
  inActive?: InputMaybe<Scalars['Boolean']['input']>;
  isSabangService: Scalars['Boolean']['input'];
  manager?: InputMaybe<Scalars['String']['input']>;
  managerTel?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  payDate?: InputMaybe<Scalars['Int']['input']>;
  storageName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateFactoryInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  productList?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateLogDto = {
  description: Scalars['String']['input'];
  logType: LogType;
  userId: Scalars['String']['input'];
};

export type CreateOptionInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  productOptionList: Array<OptionProductInput>;
};

export type CreateOrderInput = {
  factory: Scalars['String']['input'];
  isDone: Scalars['Boolean']['input'];
  notPayCost: Scalars['Int']['input'];
  orderDate: Scalars['Date']['input'];
  payCost: Scalars['Int']['input'];
  products: Array<CreateOrderProductInput>;
  totalPayCost: Scalars['Int']['input'];
};

export type CreateOrderProductInput = {
  count: Scalars['Int']['input'];
  product: Scalars['String']['input'];
};

export type CreateProductInput = {
  barCode?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  isFreeDeliveryFee?: InputMaybe<Scalars['Boolean']['input']>;
  leadTime?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  salePrice?: InputMaybe<Scalars['Int']['input']>;
  storageName?: InputMaybe<Scalars['String']['input']>;
  wonPrice?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateSingleStockInput = {
  count: Scalars['Int']['input'];
  isSubsidiary: Scalars['Boolean']['input'];
  productName: Scalars['String']['input'];
  storageName: Scalars['String']['input'];
};

export type CreateStockInput = {
  stocks: Array<CreateSingleStockInput>;
};

export type CreateStorageInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
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
  role: Array<UserRole>;
};

export type CreateWholeSaleInput = {
  deliveryBoxCount?: InputMaybe<Scalars['Int']['input']>;
  isDone?: InputMaybe<Scalars['Boolean']['input']>;
  mallId: Scalars['String']['input'];
  productList: Array<CreateWholeSaleProduct>;
  saleAt: Scalars['Date']['input'];
  telephoneNumber1?: InputMaybe<Scalars['String']['input']>;
};

export type CreateWholeSaleProduct = {
  count: Scalars['Int']['input'];
  payCost: Scalars['Int']['input'];
  productCode: Scalars['String']['input'];
  productName: Scalars['String']['input'];
  storageName: Scalars['String']['input'];
  wonCost?: InputMaybe<Scalars['Int']['input']>;
};

export type DeliveryCost = {
  __typename?: 'DeliveryCost';
  deliveryCost: Scalars['Float']['output'];
  month: Scalars['Int']['output'];
  monthDeliveryPayCost: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type FactoriesInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type FactoriesOutput = {
  __typename?: 'FactoriesOutput';
  data: Array<Factory>;
  totalCount: Scalars['Int']['output'];
};

export type Factory = {
  __typename?: 'Factory';
  _id: Scalars['ID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  productList?: Maybe<Array<Scalars['String']['output']>>;
};

export type FindDateInput = {
  from: Scalars['Date']['input'];
  to: Scalars['Date']['input'];
};

export type FindDateScrollInput = {
  from: Scalars['Date']['input'];
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
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

export type FindStockLogs = {
  from: Scalars['Date']['input'];
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  productCode: Scalars['String']['input'];
  skip: Scalars['Int']['input'];
  to: Scalars['Date']['input'];
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
  Stock = 'STOCK',
  Update = 'UPDATE',
  Upload = 'UPLOAD'
}

export type Mutation = {
  __typename?: 'Mutation';
  addStock?: Maybe<Array<Stock>>;
  completeOrder: ProductOrder;
  createCategory: ProductCategory;
  createClient: OutClient;
  createFactory: Factory;
  createLog: Log;
  createOption: OutputOption;
  createOrder: ProductOrder;
  createProduct: Product;
  createStorage: Storage;
  createSubsidiary: Subsidiary;
  createSubsidiaryCategory: SubsidiaryCategory;
  createUser: User;
  createWholeSale?: Maybe<Array<Sale>>;
  loadSabangData?: Maybe<Array<Sale>>;
  outSaleData?: Maybe<SaleOutOutput>;
  outStock?: Maybe<Array<Stock>>;
  removeCategory: ProductCategory;
  removeClient: Client;
  removeFactory: Factory;
  removeOption: OutputOption;
  removeOrder: ProductOrder;
  removeProduct: Product;
  removeStorage: Storage;
  removeSubsidiary: Subsidiary;
  removeSubsidiaryCategory: SubsidiaryCategory;
  removeUser: User;
  removeWholeSale?: Maybe<WholeSaleItem>;
  setDeliveryCost: DeliveryCost;
  updateCategory: ProductCategory;
  updateClient: OutClient;
  updateFactory: Factory;
  updateOption: OutputOption;
  updateOrder: ProductOrder;
  updateProduct: Product;
  updateProfile: User;
  updateStorage: Storage;
  updateSubsidiary: Subsidiary;
  updateSubsidiaryCategory: SubsidiaryCategory;
  updateUser: User;
  updateWholeSale?: Maybe<Array<WholeSaleItem>>;
};


export type MutationAddStockArgs = {
  addStocksInput: CreateStockInput;
};


export type MutationCompleteOrderArgs = {
  completeOrderInput: CompleteOrderInput;
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


export type MutationCreateOptionArgs = {
  createOptionInput: CreateOptionInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
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


export type MutationOutStockArgs = {
  outStocksInput: CreateStockInput;
};


export type MutationRemoveCategoryArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveClientArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveFactoryArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveOptionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveOrderArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveProductArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveStorageArgs = {
  _id: Scalars['String']['input'];
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
  _id: Scalars['String']['input'];
};


export type MutationSetDeliveryCostArgs = {
  setDeliveryCostInput: SetDeliveryCostInput;
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


export type MutationUpdateOptionArgs = {
  updateOptionInput: UpdateOptionInput;
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

export type MyInfo = {
  __typename?: 'MyInfo';
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  role: Array<UserRole>;
};

export type OptionProduct = {
  __typename?: 'OptionProduct';
  count: Scalars['Int']['output'];
  productCode: Scalars['String']['output'];
};

export type OptionProductInput = {
  count: Scalars['Int']['input'];
  productCode: Scalars['String']['input'];
};

export type OptionsInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type OptionsOutput = {
  __typename?: 'OptionsOutput';
  data: Array<OutputOption>;
  totalCount: Scalars['Int']['output'];
};

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type OrderProduct = {
  __typename?: 'OrderProduct';
  count: Scalars['Int']['output'];
  leftCount?: Maybe<Product>;
  product: Product;
};

export type OrdersInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Order>;
  skip: Scalars['Int']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type OutClient = {
  __typename?: 'OutClient';
  _id: Scalars['ID']['output'];
  businessName?: Maybe<Scalars['String']['output']>;
  businessNumber?: Maybe<Scalars['String']['output']>;
  clientType: ClientType;
  code: Scalars['String']['output'];
  deliveryFreeProductCodeList?: Maybe<Array<ProductCodeName>>;
  deliveryNotFreeProductCodeList?: Maybe<Array<ProductCodeName>>;
  feeRate?: Maybe<Scalars['Float']['output']>;
  inActive?: Maybe<Scalars['Boolean']['output']>;
  isSabangService?: Maybe<Scalars['Boolean']['output']>;
  manager?: Maybe<Scalars['String']['output']>;
  managerTel?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  payDate?: Maybe<Scalars['Int']['output']>;
  storageId?: Maybe<Scalars['String']['output']>;
};

export type OutOptionProduct = {
  __typename?: 'OutOptionProduct';
  count: Scalars['Int']['output'];
  productCode: OutProduct;
};

export type OutProduct = {
  __typename?: 'OutProduct';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type OutSaleOrderItemTotal = {
  __typename?: 'OutSaleOrderItemTotal';
  accCount: Scalars['Float']['output'];
  accDeliveryCost: Scalars['Float']['output'];
  accPayCost: Scalars['Float']['output'];
  accTotalPayment: Scalars['Float']['output'];
  accWonCost: Scalars['Float']['output'];
};

export type OutSaleOrdersItem = {
  __typename?: 'OutSaleOrdersItem';
  count?: Maybe<Scalars['Int']['output']>;
  deliveryCost?: Maybe<Scalars['Int']['output']>;
  mallId?: Maybe<Scalars['String']['output']>;
  orderNumber?: Maybe<Scalars['String']['output']>;
  payCost?: Maybe<Scalars['Int']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  saleAt?: Maybe<Scalars['Date']['output']>;
  totalPayment?: Maybe<Scalars['Int']['output']>;
  wonCost?: Maybe<Scalars['Int']['output']>;
};

export type OutputOption = {
  __typename?: 'OutputOption';
  _id: Scalars['ID']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  productOptionList: Array<OutOptionProduct>;
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID']['output'];
  barCode?: Maybe<Scalars['String']['output']>;
  category?: Maybe<ProductCategory>;
  code: Scalars['String']['output'];
  isFreeDeliveryFee?: Maybe<Scalars['Boolean']['output']>;
  leadTime?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  salePrice?: Maybe<Scalars['Int']['output']>;
  storageId?: Maybe<Scalars['String']['output']>;
  wonPrice?: Maybe<Scalars['Int']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  _id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ProductCodeName = {
  __typename?: 'ProductCodeName';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ProductCountColumn = {
  __typename?: 'ProductCountColumn';
  code: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  salePrice?: Maybe<Scalars['Int']['output']>;
  wonPrice?: Maybe<Scalars['Int']['output']>;
};

export type ProductCountStocksInput = {
  isSubsidiary?: InputMaybe<Scalars['Boolean']['input']>;
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Order>;
  skip: Scalars['Int']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
  storageName: Scalars['String']['input'];
};

export type ProductCountStocksOutput = {
  __typename?: 'ProductCountStocksOutput';
  data: Array<ProductCountColumn>;
  totalCount: Scalars['Int']['output'];
};

export type ProductOrder = {
  __typename?: 'ProductOrder';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['Date']['output'];
  factory: Factory;
  isDone: Scalars['Boolean']['output'];
  notPayCost: Scalars['Int']['output'];
  orderDate: Scalars['Date']['output'];
  payCost: Scalars['Int']['output'];
  products: Array<OrderProduct>;
  totalPayCost: Scalars['Int']['output'];
};

export type ProductOrderOutput = {
  __typename?: 'ProductOrderOutput';
  data: Array<ProductOrder>;
  totalCount: Scalars['Int']['output'];
};

export type ProductSaleChartOutput = {
  __typename?: 'ProductSaleChartOutput';
  _id: Scalars['Date']['output'];
  accPayCost?: Maybe<Scalars['Int']['output']>;
  accProfit?: Maybe<Scalars['Int']['output']>;
};

export type ProductSaleInfo = {
  __typename?: 'ProductSaleInfo';
  accCount?: Maybe<Scalars['Int']['output']>;
  accDeliveryCost?: Maybe<Scalars['Float']['output']>;
  accPayCost?: Maybe<Scalars['Int']['output']>;
  accTotalPayment?: Maybe<Scalars['Float']['output']>;
  accWonCost?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
};

export type ProductSaleInput = {
  from: Scalars['Date']['input'];
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  to: Scalars['Date']['input'];
};

export type ProductSaleMenu = {
  __typename?: 'ProductSaleMenu';
  _id: Scalars['ID']['output'];
  accCount?: Maybe<Scalars['Int']['output']>;
  accDeliveryCost?: Maybe<Scalars['Float']['output']>;
  accPayCost?: Maybe<Scalars['Int']['output']>;
  accTotalPayment?: Maybe<Scalars['Float']['output']>;
  accWonCost?: Maybe<Scalars['Int']['output']>;
  barCode?: Maybe<Scalars['String']['output']>;
  clients: Array<ClientInfoMenu>;
  code: Scalars['String']['output'];
  isFreeDeliveryFee?: Maybe<Scalars['Boolean']['output']>;
  leadTime?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  prevAccCount?: Maybe<Scalars['Int']['output']>;
  prevAccDeliveryCost?: Maybe<Scalars['Float']['output']>;
  prevAccPayCost?: Maybe<Scalars['Int']['output']>;
  prevAccTotalPayment?: Maybe<Scalars['Float']['output']>;
  prevAccWonCost?: Maybe<Scalars['Int']['output']>;
  recentCreateDate: Scalars['String']['output'];
  salePrice?: Maybe<Scalars['Int']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  wonPrice?: Maybe<Scalars['Int']['output']>;
};

export type ProductSaleMenuOutput = {
  __typename?: 'ProductSaleMenuOutput';
  data: Array<ProductSaleMenu>;
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
  client: OutClient;
  clients: ClientsOutput;
  deliveryCost?: Maybe<DeliveryCost>;
  factories: FactoriesOutput;
  logs: FindLogsResponseDto;
  myInfo: MyInfo;
  options: OptionsOutput;
  orders: ProductOrderOutput;
  product: Product;
  productCountStocks?: Maybe<ProductCountStocksOutput>;
  productSale?: Maybe<Array<ProductSaleChartOutput>>;
  productSales?: Maybe<ProductSaleMenuOutput>;
  products: ProductsOutput;
  saleDetail?: Maybe<TotalSaleInfo>;
  saleMenuClients: ClientSaleMenuOutput;
  saleOrders: SaleOrdersOutput;
  saleOutCheck?: Maybe<SaleOutCheck>;
  stockLogs: FindLogsResponseDto;
  stocks: StocksOutput;
  stocksOrder: Array<ProductOrder>;
  stocksState: Array<StockStateOutput>;
  storages: StoragesOutput;
  subsidiaries: SubsidiariesOutput;
  subsidiaryCategories: SubsidiaryCategoriesOutput;
  subsidiaryCountStocks?: Maybe<SubsidiaryCountStocksOutput>;
  subsidiaryStocks: SubsidiaryStocksOutput;
  subsidiaryStocksState: Array<SubsidiaryStockStateOutput>;
  totalSale?: Maybe<TotalSaleInfo>;
  user: User;
  users: Array<User>;
  wholeSales: WholeSaleOutput;
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


export type QueryFactoriesArgs = {
  factoriesInput: FactoriesInput;
};


export type QueryLogsArgs = {
  findLogsQuery: FindLogsDto;
};


export type QueryOptionsArgs = {
  optionsInput: OptionsInput;
};


export type QueryOrdersArgs = {
  ordersInput: OrdersInput;
};


export type QueryProductArgs = {
  _id: Scalars['String']['input'];
};


export type QueryProductCountStocksArgs = {
  productCountStocksInput: ProductCountStocksInput;
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


export type QuerySaleDetailArgs = {
  totalSaleInput?: InputMaybe<FindDateInput>;
};


export type QuerySaleMenuClientsArgs = {
  saleMenuClientsInput?: InputMaybe<FindDateScrollInput>;
};


export type QuerySaleOrdersArgs = {
  saleOrdersInput?: InputMaybe<SaleOrdersInput>;
};


export type QueryStockLogsArgs = {
  findStockLogs: FindStockLogs;
};


export type QueryStocksArgs = {
  stocksInput: StocksInput;
};


export type QueryStocksOrderArgs = {
  productName: Scalars['String']['input'];
};


export type QueryStocksStateArgs = {
  productName: Scalars['String']['input'];
};


export type QueryStoragesArgs = {
  storagesInput: StoragesInput;
};


export type QuerySubsidiariesArgs = {
  subsidiariesInput: SubsidiariesInput;
};


export type QuerySubsidiaryCategoriesArgs = {
  subsidiaryCategoriesInput: SubsidiaryCategoriesInput;
};


export type QuerySubsidiaryCountStocksArgs = {
  productCountStocksInput: ProductCountStocksInput;
};


export type QuerySubsidiaryStocksArgs = {
  stocksInput: StocksInput;
};


export type QuerySubsidiaryStocksStateArgs = {
  productName: Scalars['String']['input'];
};


export type QueryTotalSaleArgs = {
  totalSaleInput?: InputMaybe<FindDateInput>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryWholeSalesArgs = {
  wholeSalesInput: WholeSalesInput;
};

export type Sale = {
  __typename?: 'Sale';
  _id: Scalars['ID']['output'];
  address1?: Maybe<Scalars['String']['output']>;
  barCode?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  consignee?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  deliveryBoxCount?: Maybe<Scalars['Int']['output']>;
  deliveryCost?: Maybe<Scalars['Int']['output']>;
  deliveryName?: Maybe<Scalars['String']['output']>;
  invoiceNumber?: Maybe<Scalars['String']['output']>;
  isDone?: Maybe<Scalars['Boolean']['output']>;
  isOut?: Maybe<Scalars['Boolean']['output']>;
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
  storageId?: Maybe<Scalars['String']['output']>;
  telephoneNumber1?: Maybe<Scalars['String']['output']>;
  totalPayment?: Maybe<Scalars['Int']['output']>;
  wholeSaleId?: Maybe<Scalars['String']['output']>;
  wonCost?: Maybe<Scalars['Int']['output']>;
};

export type SaleInfo = {
  __typename?: 'SaleInfo';
  accCount?: Maybe<Scalars['Int']['output']>;
  accDeliveryCost?: Maybe<Scalars['Float']['output']>;
  accPayCost?: Maybe<Scalars['Int']['output']>;
  accTotalPayment?: Maybe<Scalars['Float']['output']>;
  accWonCost?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type SaleOrdersInput = {
  from?: InputMaybe<Scalars['Date']['input']>;
  limit: Scalars['Int']['input'];
  mallId?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  productName?: InputMaybe<Scalars['String']['input']>;
  skip: Scalars['Int']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};

export type SaleOrdersOutput = {
  __typename?: 'SaleOrdersOutput';
  data?: Maybe<Array<OutSaleOrdersItem>>;
  total?: Maybe<OutSaleOrderItemTotal>;
  totalCount: Scalars['Int']['output'];
};

export type SaleOutCheck = {
  __typename?: 'SaleOutCheck';
  isChecked: Scalars['Boolean']['output'];
};

export type SaleOutOutput = {
  __typename?: 'SaleOutOutput';
  hasNoCountSale?: Maybe<Scalars['String']['output']>;
  hasNoMatchClientSale?: Maybe<Scalars['String']['output']>;
  hasNoMatchStorageProductStockSale?: Maybe<Scalars['String']['output']>;
  hasNoMatchStorageSale?: Maybe<Scalars['String']['output']>;
  hasNoProductCodeSale?: Maybe<Scalars['String']['output']>;
  hasNoStockSale?: Maybe<Scalars['String']['output']>;
  totalErrors?: Maybe<Scalars['String']['output']>;
};

export type SetDeliveryCostInput = {
  month: Scalars['Int']['input'];
  monthDeliveryPayCost: Scalars['Float']['input'];
  year: Scalars['Int']['input'];
};

export type Stock = {
  __typename?: 'Stock';
  _id: Scalars['ID']['output'];
  count: Scalars['Int']['output'];
  isSubsidiary: Scalars['Boolean']['output'];
  product: Product;
  storage: Storage;
};

export type StockColumn = {
  __typename?: 'StockColumn';
  leadTime?: Maybe<Scalars['Int']['output']>;
  leftDate?: Maybe<Scalars['Int']['output']>;
  monthSaleCount: Scalars['Int']['output'];
  productCode: Scalars['String']['output'];
  productName: Scalars['String']['output'];
  stockCount: Scalars['String']['output'];
  wonPrice?: Maybe<Scalars['Int']['output']>;
};

export type StockStateOutput = {
  __typename?: 'StockStateOutput';
  count: Scalars['Int']['output'];
  location: Scalars['String']['output'];
  orderCompleteDate?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type StocksInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  order?: InputMaybe<Order>;
  skip: Scalars['Int']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
  storageName?: InputMaybe<Scalars['String']['input']>;
};

export type StocksOutput = {
  __typename?: 'StocksOutput';
  data: Array<StockColumn>;
  totalCount: Scalars['Int']['output'];
};

export type Storage = {
  __typename?: 'Storage';
  _id: Scalars['ID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type StoragesInput = {
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type StoragesOutput = {
  __typename?: 'StoragesOutput';
  data: Array<Storage>;
  totalCount: Scalars['Int']['output'];
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

export type SubsidiaryCountColumn = {
  __typename?: 'SubsidiaryCountColumn';
  code: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type SubsidiaryCountStocksOutput = {
  __typename?: 'SubsidiaryCountStocksOutput';
  data: Array<SubsidiaryCountColumn>;
  totalCount: Scalars['Int']['output'];
};

export type SubsidiaryStockColumn = {
  __typename?: 'SubsidiaryStockColumn';
  leadTime?: Maybe<Scalars['Int']['output']>;
  productList?: Maybe<Array<Scalars['String']['output']>>;
  productName: Scalars['String']['output'];
  stockCount: Scalars['String']['output'];
  wonPrice?: Maybe<Scalars['Int']['output']>;
};

export type SubsidiaryStockStateOutput = {
  __typename?: 'SubsidiaryStockStateOutput';
  count: Scalars['Int']['output'];
  location: Scalars['String']['output'];
  productName: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type SubsidiaryStocksOutput = {
  __typename?: 'SubsidiaryStocksOutput';
  data: Array<SubsidiaryStockColumn>;
  totalCount: Scalars['Int']['output'];
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
  deliveryFreeProductCodeList?: InputMaybe<Array<Scalars['String']['input']>>;
  deliveryNotFreeProductCodeList?: InputMaybe<Array<Scalars['String']['input']>>;
  feeRate?: InputMaybe<Scalars['Float']['input']>;
  inActive?: InputMaybe<Scalars['Boolean']['input']>;
  isSabangService?: InputMaybe<Scalars['Boolean']['input']>;
  manager?: InputMaybe<Scalars['String']['input']>;
  managerTel?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payDate?: InputMaybe<Scalars['Int']['input']>;
  storageName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFactoryInput = {
  _id: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  productList?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateOptionInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  productOptionList?: InputMaybe<Array<OptionProductInput>>;
};

export type UpdateOrderInput = {
  _id: Scalars['String']['input'];
  factory?: InputMaybe<Scalars['String']['input']>;
  isDone?: InputMaybe<Scalars['Boolean']['input']>;
  notPayCost?: InputMaybe<Scalars['Int']['input']>;
  orderDate?: InputMaybe<Scalars['Date']['input']>;
  payCost?: InputMaybe<Scalars['Int']['input']>;
  products?: InputMaybe<Array<CreateOrderProductInput>>;
  totalPayCost?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductInput = {
  _id: Scalars['String']['input'];
  barCode?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  isFreeDeliveryFee?: InputMaybe<Scalars['Boolean']['input']>;
  leadTime?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  salePrice?: InputMaybe<Scalars['Int']['input']>;
  storageName?: InputMaybe<Scalars['String']['input']>;
  wonPrice?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProfileDto = {
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Array<UserRole>>;
};

export type UpdateStorageInput = {
  _id: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
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
  role?: InputMaybe<Array<UserRole>>;
};

export type UpdateWholeSaleInput = {
  deliveryBoxCount?: InputMaybe<Scalars['Int']['input']>;
  isDone?: InputMaybe<Scalars['Boolean']['input']>;
  mallId: Scalars['String']['input'];
  productList: Array<CreateWholeSaleProduct>;
  saleAt: Scalars['Date']['input'];
  telephoneNumber1?: InputMaybe<Scalars['String']['input']>;
  wholeSaleId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  role: Array<UserRole>;
  updatedAt: Scalars['Date']['output'];
};

export enum UserRole {
  AdminAccess = 'ADMIN_ACCESS',
  AdminAccount = 'ADMIN_ACCOUNT',
  AdminDelivery = 'ADMIN_DELIVERY',
  AdminLog = 'ADMIN_LOG',
  BackDelete = 'BACK_DELETE',
  BackEdit = 'BACK_EDIT',
  OrderCreate = 'ORDER_CREATE',
  OrderDelete = 'ORDER_DELETE',
  OrderEdit = 'ORDER_EDIT',
  SaleCreate = 'SALE_CREATE',
  SaleDelete = 'SALE_DELETE',
  SaleEdit = 'SALE_EDIT',
  StockIn = 'STOCK_IN',
  StockOut = 'STOCK_OUT',
  StockSaleOut = 'STOCK_SALE_OUT'
}

export type WholeSaleItem = {
  __typename?: 'WholeSaleItem';
  _id: Scalars['String']['output'];
  deliveryBoxCount?: Maybe<Scalars['Int']['output']>;
  deliveryCost?: Maybe<Scalars['Float']['output']>;
  isDone?: Maybe<Scalars['Boolean']['output']>;
  mallId: Scalars['String']['output'];
  productList: Array<WholeSaleProduct>;
  saleAt: Scalars['Date']['output'];
  telephoneNumber1?: Maybe<Scalars['String']['output']>;
  totalCount: Scalars['Int']['output'];
  totalPayCost: Scalars['Int']['output'];
  totalWonCost: Scalars['Int']['output'];
};

export type WholeSaleOutput = {
  __typename?: 'WholeSaleOutput';
  data: Array<WholeSaleItem>;
  totalCount: Scalars['Int']['output'];
};

export type WholeSaleProduct = {
  __typename?: 'WholeSaleProduct';
  count: Scalars['Int']['output'];
  payCost: Scalars['Int']['output'];
  productCode: Scalars['String']['output'];
  productName: Scalars['String']['output'];
  storageName: Scalars['String']['output'];
  wonCost?: Maybe<Scalars['Int']['output']>;
};

export type WholeSalesInput = {
  from?: InputMaybe<Scalars['Date']['input']>;
  keyword: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  to?: InputMaybe<Scalars['Date']['input']>;
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

export type DeliveryCostFragmentFragment = { __typename?: 'DeliveryCost', deliveryCost: number, year: number, month: number } & { ' $fragmentName'?: 'DeliveryCostFragmentFragment' };

export type OptionFragmentFragment = { __typename?: 'OutputOption', id: string, name: string, productOptionList: Array<{ __typename?: 'OutOptionProduct', count: number, productCode: { __typename?: 'OutProduct', code: string, name: string } }> } & { ' $fragmentName'?: 'OptionFragmentFragment' };

export type StockColumnFragmentFragment = { __typename?: 'StockColumn', stockCount: string, leadTime?: number | null, leftDate?: number | null, monthSaleCount: number, productName: string, productCode: string, wonPrice?: number | null } & { ' $fragmentName'?: 'StockColumnFragmentFragment' };

export type SubsidiaryStockColumnFragmentFragment = { __typename?: 'SubsidiaryStockColumn', stockCount: string, leadTime?: number | null, productList?: Array<string> | null, productName: string, wonPrice?: number | null } & { ' $fragmentName'?: 'SubsidiaryStockColumnFragmentFragment' };

export type ProductOrderFragmentFragment = { __typename?: 'ProductOrder', _id: string, payCost: number, notPayCost: number, totalPayCost: number, isDone: boolean, orderDate: any, factory: { __typename?: 'Factory', _id: string, name: string }, products: Array<{ __typename?: 'OrderProduct', count: number, product: { __typename?: 'Product', _id: string, name: string, leadTime?: number | null } }> } & { ' $fragmentName'?: 'ProductOrderFragmentFragment' };

export type FactoryFragmentFragment = { __typename?: 'Factory', _id: string, name: string, address?: string | null, phoneNumber?: string | null, note?: string | null, productList?: Array<string> | null } & { ' $fragmentName'?: 'FactoryFragmentFragment' };

export type StorageFragmentFragment = { __typename?: 'Storage', _id: string, name: string, address?: string | null, phoneNumber?: string | null, note?: string | null } & { ' $fragmentName'?: 'StorageFragmentFragment' };

export type SubsidiaryCategoryFragmentFragment = { __typename?: 'SubsidiaryCategory', _id?: string | null, name?: string | null } & { ' $fragmentName'?: 'SubsidiaryCategoryFragmentFragment' };

export type SubsidiaryFragmentFragment = { __typename?: 'Subsidiary', _id: string, code: string, name: string, wonPrice?: number | null, leadTime?: number | null, productList?: Array<{ __typename?: 'Product', _id: string, name: string }> | null, category?: { __typename?: 'SubsidiaryCategory', _id?: string | null, name?: string | null } | null } & { ' $fragmentName'?: 'SubsidiaryFragmentFragment' };

export type LogFragmentFragment = { __typename?: 'Log', _id: string, userId: string, description: string, logType: LogType, createdAt: any } & { ' $fragmentName'?: 'LogFragmentFragment' };

export type ProductCategoryFragmentFragment = { __typename?: 'ProductCategory', _id?: string | null, name?: string | null } & { ' $fragmentName'?: 'ProductCategoryFragmentFragment' };

export type UserFragmentFragment = { __typename?: 'User', id: string, role: Array<UserRole>, createdAt: any } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type ProductFragmentFragment = { __typename?: 'Product', _id: string, code: string, barCode?: string | null, name: string, wonPrice?: number | null, salePrice?: number | null, leadTime?: number | null, storageId?: string | null, isFreeDeliveryFee?: boolean | null, category?: (
    { __typename?: 'ProductCategory' }
    & { ' $fragmentRefs'?: { 'ProductCategoryFragmentFragment': ProductCategoryFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'ProductFragmentFragment' };

export type OutClientFragmentFragment = { __typename?: 'OutClient', _id: string, code: string, name: string, feeRate?: number | null, clientType: ClientType, businessName?: string | null, businessNumber?: string | null, payDate?: number | null, manager?: string | null, managerTel?: string | null, inActive?: boolean | null, storageId?: string | null, isSabangService?: boolean | null, deliveryFreeProductCodeList?: Array<{ __typename?: 'ProductCodeName', name: string, code: string }> | null, deliveryNotFreeProductCodeList?: Array<{ __typename?: 'ProductCodeName', name: string, code: string }> | null } & { ' $fragmentName'?: 'OutClientFragmentFragment' };

export type ClientFragmentFragment = { __typename?: 'OutClient', _id: string, code: string, name: string, feeRate?: number | null, clientType: ClientType, businessName?: string | null, businessNumber?: string | null, payDate?: number | null, manager?: string | null, managerTel?: string | null, inActive?: boolean | null, storageId?: string | null } & { ' $fragmentName'?: 'ClientFragmentFragment' };

export type SaleInfoFragment = { __typename?: 'SaleInfo', accPayCost?: number | null, accCount?: number | null, name?: string | null, accDeliveryCost?: number | null, accTotalPayment?: number | null } & { ' $fragmentName'?: 'SaleInfoFragment' };

export type ClientsQueryVariables = Exact<{
  clientsInput: ClientsInput;
}>;


export type ClientsQuery = { __typename?: 'Query', clients: { __typename?: 'ClientsOutput', totalCount: number, data: Array<(
      { __typename?: 'OutClient' }
      & { ' $fragmentRefs'?: { 'OutClientFragmentFragment': OutClientFragmentFragment } }
    )> } };

export type CreateClientMutationVariables = Exact<{
  createClientInput: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: (
    { __typename?: 'OutClient' }
    & { ' $fragmentRefs'?: { 'OutClientFragmentFragment': OutClientFragmentFragment } }
  ) };

export type RemoveClientMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveClientMutation = { __typename?: 'Mutation', removeClient: { __typename?: 'Client', _id: string, name: string } };

export type UpdateClientMutationVariables = Exact<{
  updateClientInput: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: (
    { __typename?: 'OutClient' }
    & { ' $fragmentRefs'?: { 'OutClientFragmentFragment': OutClientFragmentFragment } }
  ) };

export type SaleMenuClientsQueryVariables = Exact<{
  saleMenuClientsInput: FindDateScrollInput;
}>;


export type SaleMenuClientsQuery = { __typename?: 'Query', saleMenuClients: { __typename?: 'ClientSaleMenuOutput', totalCount: number, data: Array<{ __typename?: 'ClientSaleMenu', _id: string, name: string, code: string, businessName?: string | null, businessNumber?: string | null, clientType: ClientType, feeRate?: number | null, isSabangService?: boolean | null, payDate?: number | null, inActive?: boolean | null, accPayCost?: number | null, accWonCost?: number | null, accCount?: number | null, prevAccCount?: number | null, prevAccPayCost?: number | null, prevAccWonCost?: number | null, prevAccDeliveryCost?: number | null, accDeliveryCost?: number | null, accTotalPayment?: number | null, prevAccTotalPayment?: number | null, monthSales?: { __typename?: 'ProductSaleInfo', name: string, accCount?: number | null, accPayCost?: number | null, accWonCost?: number | null, accDeliveryCost?: number | null, accTotalPayment?: number | null } | null, products: Array<{ __typename?: 'ProductSaleInfo', name: string, accCount?: number | null, accPayCost?: number | null, accWonCost?: number | null, accDeliveryCost?: number | null, accTotalPayment?: number | null }> }> } };

export type DeliveryCostQueryVariables = Exact<{ [key: string]: never; }>;


export type DeliveryCostQuery = { __typename?: 'Query', deliveryCost?: { __typename?: 'DeliveryCost', deliveryCost: number, year: number, month: number, monthDeliveryPayCost: number } | null };

export type SetDeliveryCostMutationVariables = Exact<{
  setDeliveryCostInput: SetDeliveryCostInput;
}>;


export type SetDeliveryCostMutation = { __typename?: 'Mutation', setDeliveryCost: { __typename?: 'DeliveryCost', deliveryCost: number, year: number, month: number, monthDeliveryPayCost: number } };

export type CreateFactoryMutationVariables = Exact<{
  createFactoryInput: CreateFactoryInput;
}>;


export type CreateFactoryMutation = { __typename?: 'Mutation', createFactory: (
    { __typename?: 'Factory' }
    & { ' $fragmentRefs'?: { 'FactoryFragmentFragment': FactoryFragmentFragment } }
  ) };

export type UpdateFactoryMutationVariables = Exact<{
  updateFactoryInput: UpdateFactoryInput;
}>;


export type UpdateFactoryMutation = { __typename?: 'Mutation', updateFactory: (
    { __typename?: 'Factory' }
    & { ' $fragmentRefs'?: { 'FactoryFragmentFragment': FactoryFragmentFragment } }
  ) };

export type FactoriesQueryVariables = Exact<{
  factoriesInput: FactoriesInput;
}>;


export type FactoriesQuery = { __typename?: 'Query', factories: { __typename?: 'FactoriesOutput', totalCount: number, data: Array<(
      { __typename?: 'Factory' }
      & { ' $fragmentRefs'?: { 'FactoryFragmentFragment': FactoryFragmentFragment } }
    )> } };

export type RemoveFactoryMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveFactoryMutation = { __typename?: 'Mutation', removeFactory: (
    { __typename?: 'Factory' }
    & { ' $fragmentRefs'?: { 'FactoryFragmentFragment': FactoryFragmentFragment } }
  ) };

export type LogsQueryVariables = Exact<{
  findLogsQuery: FindLogsDto;
}>;


export type LogsQuery = { __typename?: 'Query', logs: { __typename?: 'FindLogsResponseDTO', totalCount: number, data: Array<(
      { __typename?: 'Log' }
      & { ' $fragmentRefs'?: { 'LogFragmentFragment': LogFragmentFragment } }
    )> } };

export type StockLogsQueryVariables = Exact<{
  findStockLogs: FindStockLogs;
}>;


export type StockLogsQuery = { __typename?: 'Query', stockLogs: { __typename?: 'FindLogsResponseDTO', totalCount: number, data: Array<(
      { __typename?: 'Log' }
      & { ' $fragmentRefs'?: { 'LogFragmentFragment': LogFragmentFragment } }
    )> } };

export type CreateOptionMutationVariables = Exact<{
  createOptionInput: CreateOptionInput;
}>;


export type CreateOptionMutation = { __typename?: 'Mutation', createOption: (
    { __typename?: 'OutputOption' }
    & { ' $fragmentRefs'?: { 'OptionFragmentFragment': OptionFragmentFragment } }
  ) };

export type OptionsQueryVariables = Exact<{
  optionsInput: OptionsInput;
}>;


export type OptionsQuery = { __typename?: 'Query', options: { __typename?: 'OptionsOutput', totalCount: number, data: Array<(
      { __typename?: 'OutputOption' }
      & { ' $fragmentRefs'?: { 'OptionFragmentFragment': OptionFragmentFragment } }
    )> } };

export type RemoveOptionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveOptionMutation = { __typename?: 'Mutation', removeOption: { __typename?: 'OutputOption', _id: string, id: string, name: string } };

export type UpdateOptionMutationVariables = Exact<{
  updateOptionInput: UpdateOptionInput;
}>;


export type UpdateOptionMutation = { __typename?: 'Mutation', updateOption: (
    { __typename?: 'OutputOption' }
    & { ' $fragmentRefs'?: { 'OptionFragmentFragment': OptionFragmentFragment } }
  ) };

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


export type ProductSalesQuery = { __typename?: 'Query', productSales?: { __typename?: 'ProductSaleMenuOutput', totalCount: number, data: Array<{ __typename?: 'ProductSaleMenu', isFreeDeliveryFee?: boolean | null, code: string, barCode?: string | null, name: string, wonPrice?: number | null, leadTime?: number | null, salePrice?: number | null, accPayCost?: number | null, accWonCost?: number | null, accCount?: number | null, stock?: number | null, recentCreateDate: string, prevAccCount?: number | null, prevAccPayCost?: number | null, prevAccWonCost?: number | null, prevAccDeliveryCost?: number | null, accDeliveryCost?: number | null, accTotalPayment?: number | null, prevAccTotalPayment?: number | null, clients: Array<{ __typename?: 'ClientInfoMenu', accCount?: number | null, accPayCost?: number | null, accWonCost?: number | null, accDeliveryCost?: number | null, accTotalPayment?: number | null, name?: string | null }> }> } | null };

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

export type CompleteOrderMutationVariables = Exact<{
  completeOrderInput: CompleteOrderInput;
}>;


export type CompleteOrderMutation = { __typename?: 'Mutation', completeOrder: (
    { __typename?: 'ProductOrder' }
    & { ' $fragmentRefs'?: { 'ProductOrderFragmentFragment': ProductOrderFragmentFragment } }
  ) };

export type CreateOrderMutationVariables = Exact<{
  createOrderInput: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: (
    { __typename?: 'ProductOrder' }
    & { ' $fragmentRefs'?: { 'ProductOrderFragmentFragment': ProductOrderFragmentFragment } }
  ) };

export type UpdateOrderMutationVariables = Exact<{
  updateOrderInput: UpdateOrderInput;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder: (
    { __typename?: 'ProductOrder' }
    & { ' $fragmentRefs'?: { 'ProductOrderFragmentFragment': ProductOrderFragmentFragment } }
  ) };

export type OrdersQueryVariables = Exact<{
  ordersInput: OrdersInput;
}>;


export type OrdersQuery = { __typename?: 'Query', orders: { __typename?: 'ProductOrderOutput', totalCount: number, data: Array<(
      { __typename?: 'ProductOrder' }
      & { ' $fragmentRefs'?: { 'ProductOrderFragmentFragment': ProductOrderFragmentFragment } }
    )> } };

export type RemoveOrderMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveOrderMutation = { __typename?: 'Mutation', removeOrder: (
    { __typename?: 'ProductOrder' }
    & { ' $fragmentRefs'?: { 'ProductOrderFragmentFragment': ProductOrderFragmentFragment } }
  ) };

export type LoadSabangDataMutationVariables = Exact<{ [key: string]: never; }>;


export type LoadSabangDataMutation = { __typename?: 'Mutation', loadSabangData?: Array<{ __typename?: 'Sale', orderNumber?: string | null, productName?: string | null, productCode?: string | null, count?: number | null, mallId?: string | null }> | null };

export type SaleOrdersQueryVariables = Exact<{
  saleOrdersInput: SaleOrdersInput;
}>;


export type SaleOrdersQuery = { __typename?: 'Query', saleOrders: { __typename?: 'SaleOrdersOutput', totalCount: number, data?: Array<{ __typename?: 'OutSaleOrdersItem', count?: number | null, deliveryCost?: number | null, mallId?: string | null, orderNumber?: string | null, payCost?: number | null, productName?: string | null, saleAt?: any | null, totalPayment?: number | null, wonCost?: number | null }> | null, total?: { __typename?: 'OutSaleOrderItemTotal', accCount: number, accTotalPayment: number, accWonCost: number, accPayCost: number, accDeliveryCost: number } | null } };

export type OutSaleDataMutationVariables = Exact<{ [key: string]: never; }>;


export type OutSaleDataMutation = { __typename?: 'Mutation', outSaleData?: { __typename?: 'SaleOutOutput', hasNoCountSale?: string | null, hasNoProductCodeSale?: string | null, hasNoMatchClientSale?: string | null, hasNoMatchStorageSale?: string | null, hasNoStockSale?: string | null, hasNoMatchStorageProductStockSale?: string | null, totalErrors?: string | null } | null };

export type SaleOutCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type SaleOutCheckQuery = { __typename?: 'Query', saleOutCheck?: { __typename?: 'SaleOutCheck', isChecked: boolean } | null };

export type TotalSaleQueryVariables = Exact<{
  totalSaleInput: FindDateInput;
}>;


export type TotalSaleQuery = { __typename?: 'Query', totalSale?: { __typename?: 'TotalSaleInfo', current?: { __typename?: 'SaleInfo', accPayCost?: number | null, accCount?: number | null, name?: string | null, accDeliveryCost?: number | null, accTotalPayment?: number | null, accWonCost?: number | null } | null, previous?: { __typename?: 'SaleInfo', accPayCost?: number | null, accCount?: number | null, name?: string | null, accDeliveryCost?: number | null, accTotalPayment?: number | null, accWonCost?: number | null } | null } | null };

export type AddStockMutationVariables = Exact<{
  addStocksInput: CreateStockInput;
}>;


export type AddStockMutation = { __typename?: 'Mutation', addStock?: Array<{ __typename?: 'Stock', _id: string }> | null };

export type OutStockMutationVariables = Exact<{
  outStocksInput: CreateStockInput;
}>;


export type OutStockMutation = { __typename?: 'Mutation', outStock?: Array<{ __typename?: 'Stock', _id: string }> | null };

export type ProductCountStocksQueryVariables = Exact<{
  productCountStocksInput: ProductCountStocksInput;
}>;


export type ProductCountStocksQuery = { __typename?: 'Query', productCountStocks?: { __typename?: 'ProductCountStocksOutput', totalCount: number, data: Array<{ __typename?: 'ProductCountColumn', name: string, count: number, salePrice?: number | null, wonPrice?: number | null, code: string }> } | null };

export type StocksQueryVariables = Exact<{
  stocksInput: StocksInput;
}>;


export type StocksQuery = { __typename?: 'Query', stocks: { __typename?: 'StocksOutput', totalCount: number, data: Array<(
      { __typename?: 'StockColumn' }
      & { ' $fragmentRefs'?: { 'StockColumnFragmentFragment': StockColumnFragmentFragment } }
    )> } };

export type StocksOrderQueryVariables = Exact<{
  productName: Scalars['String']['input'];
}>;


export type StocksOrderQuery = { __typename?: 'Query', stocksOrder: Array<(
    { __typename?: 'ProductOrder' }
    & { ' $fragmentRefs'?: { 'ProductOrderFragmentFragment': ProductOrderFragmentFragment } }
  )> };

export type StocksStateQueryVariables = Exact<{
  productName: Scalars['String']['input'];
}>;


export type StocksStateQuery = { __typename?: 'Query', stocksState: Array<{ __typename?: 'StockStateOutput', productName: string, count: number, location: string, orderCompleteDate?: string | null, state: string }> };

export type SubsidiaryCountStocksQueryVariables = Exact<{
  productCountStocksInput: ProductCountStocksInput;
}>;


export type SubsidiaryCountStocksQuery = { __typename?: 'Query', subsidiaryCountStocks?: { __typename?: 'SubsidiaryCountStocksOutput', totalCount: number, data: Array<{ __typename?: 'SubsidiaryCountColumn', name: string, count: number, code: string }> } | null };

export type SubsidiaryStocksQueryVariables = Exact<{
  stocksInput: StocksInput;
}>;


export type SubsidiaryStocksQuery = { __typename?: 'Query', subsidiaryStocks: { __typename?: 'SubsidiaryStocksOutput', totalCount: number, data: Array<(
      { __typename?: 'SubsidiaryStockColumn' }
      & { ' $fragmentRefs'?: { 'SubsidiaryStockColumnFragmentFragment': SubsidiaryStockColumnFragmentFragment } }
    )> } };

export type SubsidiaryStocksStateQueryVariables = Exact<{
  productName: Scalars['String']['input'];
}>;


export type SubsidiaryStocksStateQuery = { __typename?: 'Query', subsidiaryStocksState: Array<{ __typename?: 'SubsidiaryStockStateOutput', productName: string, count: number, location: string, state: string }> };

export type CreateStorageMutationVariables = Exact<{
  createStorageInput: CreateStorageInput;
}>;


export type CreateStorageMutation = { __typename?: 'Mutation', createStorage: (
    { __typename?: 'Storage' }
    & { ' $fragmentRefs'?: { 'StorageFragmentFragment': StorageFragmentFragment } }
  ) };

export type UpdateStorageMutationVariables = Exact<{
  updateStorageInput: UpdateStorageInput;
}>;


export type UpdateStorageMutation = { __typename?: 'Mutation', updateStorage: (
    { __typename?: 'Storage' }
    & { ' $fragmentRefs'?: { 'StorageFragmentFragment': StorageFragmentFragment } }
  ) };

export type RemoveStorageMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveStorageMutation = { __typename?: 'Mutation', removeStorage: (
    { __typename?: 'Storage' }
    & { ' $fragmentRefs'?: { 'StorageFragmentFragment': StorageFragmentFragment } }
  ) };

export type StoragesQueryVariables = Exact<{
  storagesInput: StoragesInput;
}>;


export type StoragesQuery = { __typename?: 'Query', storages: { __typename?: 'StoragesOutput', totalCount: number, data: Array<(
      { __typename?: 'Storage' }
      & { ' $fragmentRefs'?: { 'StorageFragmentFragment': StorageFragmentFragment } }
    )> } };

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


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, role: Array<UserRole>, createdAt: any } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, role: Array<UserRole>, createdAt: any } };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, role: Array<UserRole>, createdAt: any }> };

export type MyInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MyInfoQuery = { __typename?: 'Query', myInfo: { __typename?: 'MyInfo', id: string, role: Array<UserRole>, createdAt: any } };

export type UpdateProfileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileDto;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, role: Array<UserRole> } };

export type CreateWholeSaleMutationVariables = Exact<{
  createWholeSaleInput: CreateWholeSaleInput;
}>;


export type CreateWholeSaleMutation = { __typename?: 'Mutation', createWholeSale?: Array<{ __typename?: 'Sale', mallId?: string | null }> | null };

export type RemoveWholeSaleMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveWholeSaleMutation = { __typename?: 'Mutation', removeWholeSale?: { __typename?: 'WholeSaleItem', _id: string } | null };

export type UpdateWholeSaleMutationVariables = Exact<{
  updateWholeSaleInput: UpdateWholeSaleInput;
}>;


export type UpdateWholeSaleMutation = { __typename?: 'Mutation', updateWholeSale?: Array<{ __typename?: 'WholeSaleItem', _id: string, mallId: string, saleAt: any, telephoneNumber1?: string | null, totalPayCost: number, totalWonCost: number, totalCount: number, isDone?: boolean | null, deliveryCost?: number | null, deliveryBoxCount?: number | null, productList: Array<{ __typename?: 'WholeSaleProduct', storageName: string, productName: string, productCode: string, count: number, payCost: number, wonCost?: number | null }> }> | null };

export type WholeSalesQueryVariables = Exact<{
  wholeSalesInput: WholeSalesInput;
}>;


export type WholeSalesQuery = { __typename?: 'Query', wholeSales: { __typename?: 'WholeSaleOutput', totalCount: number, data: Array<{ __typename?: 'WholeSaleItem', _id: string, mallId: string, saleAt: any, telephoneNumber1?: string | null, totalPayCost: number, totalWonCost: number, totalCount: number, isDone?: boolean | null, deliveryCost?: number | null, deliveryBoxCount?: number | null, productList: Array<{ __typename?: 'WholeSaleProduct', storageName: string, productName: string, productCode: string, count: number, payCost: number, wonCost?: number | null }> }> } };

export const DeliveryCostFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DeliveryCostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DeliveryCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}}]}}]} as unknown as DocumentNode<DeliveryCostFragmentFragment, unknown>;
export const OptionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OptionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OutputOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productOptionList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<OptionFragmentFragment, unknown>;
export const StockColumnFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StockColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StockColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockCount"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"leftDate"}},{"kind":"Field","name":{"kind":"Name","value":"monthSaleCount"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productCode"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}}]}}]} as unknown as DocumentNode<StockColumnFragmentFragment, unknown>;
export const SubsidiaryStockColumnFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryStockColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiaryStockColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockCount"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"productList"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}}]}}]} as unknown as DocumentNode<SubsidiaryStockColumnFragmentFragment, unknown>;
export const ProductOrderFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOrderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payCost"}},{"kind":"Field","name":{"kind":"Name","value":"notPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"isDone"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}}]}}]} as unknown as DocumentNode<ProductOrderFragmentFragment, unknown>;
export const FactoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"productList"}}]}}]} as unknown as DocumentNode<FactoryFragmentFragment, unknown>;
export const StorageFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Storage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]} as unknown as DocumentNode<StorageFragmentFragment, unknown>;
export const SubsidiaryCategoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiaryCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SubsidiaryCategoryFragmentFragment, unknown>;
export const SubsidiaryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subsidiary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]} as unknown as DocumentNode<SubsidiaryFragmentFragment, unknown>;
export const LogFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<LogFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const ProductCategoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ProductCategoryFragmentFragment, unknown>;
export const ProductFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"storageId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isFreeDeliveryFee"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ProductFragmentFragment, unknown>;
export const OutClientFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OutClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OutClient"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}},{"kind":"Field","name":{"kind":"Name","value":"storageId"}},{"kind":"Field","name":{"kind":"Name","value":"isSabangService"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFreeProductCodeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryNotFreeProductCodeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<OutClientFragmentFragment, unknown>;
export const ClientFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OutClient"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}},{"kind":"Field","name":{"kind":"Name","value":"storageId"}}]}}]} as unknown as DocumentNode<ClientFragmentFragment, unknown>;
export const SaleInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SaleInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accDeliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"accTotalPayment"}}]}}]} as unknown as DocumentNode<SaleInfoFragment, unknown>;
export const ClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"clients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OutClientFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OutClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OutClient"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}},{"kind":"Field","name":{"kind":"Name","value":"storageId"}},{"kind":"Field","name":{"kind":"Name","value":"isSabangService"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFreeProductCodeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryNotFreeProductCodeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<ClientsQuery, ClientsQueryVariables>;
export const CreateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createClientInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createClientInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createClientInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OutClientFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OutClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OutClient"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}},{"kind":"Field","name":{"kind":"Name","value":"storageId"}},{"kind":"Field","name":{"kind":"Name","value":"isSabangService"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFreeProductCodeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryNotFreeProductCodeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<CreateClientMutation, CreateClientMutationVariables>;
export const RemoveClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveClientMutation, RemoveClientMutationVariables>;
export const UpdateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateClientInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateClientInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateClientInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OutClientFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OutClientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OutClient"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"manager"}},{"kind":"Field","name":{"kind":"Name","value":"managerTel"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}},{"kind":"Field","name":{"kind":"Name","value":"storageId"}},{"kind":"Field","name":{"kind":"Name","value":"isSabangService"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFreeProductCodeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryNotFreeProductCodeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<UpdateClientMutation, UpdateClientMutationVariables>;
export const SaleMenuClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"saleMenuClients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saleMenuClientsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindDateScrollInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saleMenuClients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"saleMenuClientsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saleMenuClientsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"businessNumber"}},{"kind":"Field","name":{"kind":"Name","value":"clientType"}},{"kind":"Field","name":{"kind":"Name","value":"feeRate"}},{"kind":"Field","name":{"kind":"Name","value":"isSabangService"}},{"kind":"Field","name":{"kind":"Name","value":"payDate"}},{"kind":"Field","name":{"kind":"Name","value":"inActive"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accWonCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccCount"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccWonCost"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccDeliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"accDeliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"accTotalPayment"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccTotalPayment"}},{"kind":"Field","name":{"kind":"Name","value":"monthSales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accWonCost"}},{"kind":"Field","name":{"kind":"Name","value":"accDeliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"accTotalPayment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accWonCost"}},{"kind":"Field","name":{"kind":"Name","value":"accDeliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"accTotalPayment"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SaleMenuClientsQuery, SaleMenuClientsQueryVariables>;
export const DeliveryCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"deliveryCost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deliveryCost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"monthDeliveryPayCost"}}]}}]}}]} as unknown as DocumentNode<DeliveryCostQuery, DeliveryCostQueryVariables>;
export const SetDeliveryCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setDeliveryCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setDeliveryCostInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetDeliveryCostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setDeliveryCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"setDeliveryCostInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setDeliveryCostInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"monthDeliveryPayCost"}}]}}]}}]} as unknown as DocumentNode<SetDeliveryCostMutation, SetDeliveryCostMutationVariables>;
export const CreateFactoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createFactory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createFactoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFactoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFactory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createFactoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createFactoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"productList"}}]}}]} as unknown as DocumentNode<CreateFactoryMutation, CreateFactoryMutationVariables>;
export const UpdateFactoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateFactory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateFactoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFactoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFactory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateFactoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateFactoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"productList"}}]}}]} as unknown as DocumentNode<UpdateFactoryMutation, UpdateFactoryMutationVariables>;
export const FactoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"factories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"factoriesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FactoriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"factoriesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"factoriesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"productList"}}]}}]} as unknown as DocumentNode<FactoriesQuery, FactoriesQueryVariables>;
export const RemoveFactoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeFactory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFactory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"productList"}}]}}]} as unknown as DocumentNode<RemoveFactoryMutation, RemoveFactoryMutationVariables>;
export const LogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"logs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findLogsQuery"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindLogsDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"findLogsQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findLogsQuery"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<LogsQuery, LogsQueryVariables>;
export const StockLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"stockLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findStockLogs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindStockLogs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"findStockLogs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findStockLogs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<StockLogsQuery, StockLogsQueryVariables>;
export const CreateOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOptionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOptionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOptionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OptionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OptionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OutputOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productOptionList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<CreateOptionMutation, CreateOptionMutationVariables>;
export const OptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"options"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"optionsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OptionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"options"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"optionsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"optionsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OptionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OptionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OutputOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productOptionList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<OptionsQuery, OptionsQueryVariables>;
export const RemoveOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveOptionMutation, RemoveOptionMutationVariables>;
export const UpdateOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOptionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOptionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOptionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OptionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OptionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OutputOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productOptionList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<UpdateOptionMutation, UpdateOptionMutationVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoriesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoriesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoriesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const RemoveCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createProductInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createProductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createProductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"storageId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isFreeDeliveryFee"}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const ProductSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accProfit"}}]}}]}}]} as unknown as DocumentNode<ProductSaleQuery, ProductSaleQueryVariables>;
export const ProductSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productSalesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productSales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productSalesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productSalesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isFreeDeliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accWonCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"recentCreateDate"}},{"kind":"Field","name":{"kind":"Name","value":"clients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accWonCost"}},{"kind":"Field","name":{"kind":"Name","value":"accDeliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"accTotalPayment"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prevAccCount"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccWonCost"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccDeliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"accDeliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"accTotalPayment"}},{"kind":"Field","name":{"kind":"Name","value":"prevAccTotalPayment"}}]}}]}}]}}]} as unknown as DocumentNode<ProductSalesQuery, ProductSalesQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"products"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"storageId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isFreeDeliveryFee"}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const RemoveProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveProductMutation, RemoveProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProductInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"barCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"storageId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isFreeDeliveryFee"}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const CompleteOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"completeOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"completeOrderInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompleteOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"completeOrderInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"completeOrderInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductOrderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOrderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payCost"}},{"kind":"Field","name":{"kind":"Name","value":"notPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"isDone"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}}]}}]} as unknown as DocumentNode<CompleteOrderMutation, CompleteOrderMutationVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrderInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrderInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrderInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductOrderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOrderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payCost"}},{"kind":"Field","name":{"kind":"Name","value":"notPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"isDone"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOrderInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOrderInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOrderInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductOrderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOrderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payCost"}},{"kind":"Field","name":{"kind":"Name","value":"notPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"isDone"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}}]}}]} as unknown as DocumentNode<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const OrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"orders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordersInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrdersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ordersInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductOrderFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOrderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payCost"}},{"kind":"Field","name":{"kind":"Name","value":"notPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"isDone"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}}]}}]} as unknown as DocumentNode<OrdersQuery, OrdersQueryVariables>;
export const RemoveOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductOrderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOrderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payCost"}},{"kind":"Field","name":{"kind":"Name","value":"notPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"isDone"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}}]}}]} as unknown as DocumentNode<RemoveOrderMutation, RemoveOrderMutationVariables>;
export const LoadSabangDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loadSabangData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loadSabangData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productCode"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"mallId"}}]}}]}}]} as unknown as DocumentNode<LoadSabangDataMutation, LoadSabangDataMutationVariables>;
export const SaleOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"saleOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saleOrdersInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SaleOrdersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saleOrders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"saleOrdersInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saleOrdersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"mallId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"payCost"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"saleAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayment"}},{"kind":"Field","name":{"kind":"Name","value":"wonCost"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"accTotalPayment"}},{"kind":"Field","name":{"kind":"Name","value":"accWonCost"}},{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accDeliveryCost"}}]}}]}}]}}]} as unknown as DocumentNode<SaleOrdersQuery, SaleOrdersQueryVariables>;
export const OutSaleDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"outSaleData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"outSaleData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNoCountSale"}},{"kind":"Field","name":{"kind":"Name","value":"hasNoProductCodeSale"}},{"kind":"Field","name":{"kind":"Name","value":"hasNoMatchClientSale"}},{"kind":"Field","name":{"kind":"Name","value":"hasNoMatchStorageSale"}},{"kind":"Field","name":{"kind":"Name","value":"hasNoStockSale"}},{"kind":"Field","name":{"kind":"Name","value":"hasNoMatchStorageProductStockSale"}},{"kind":"Field","name":{"kind":"Name","value":"totalErrors"}}]}}]}}]} as unknown as DocumentNode<OutSaleDataMutation, OutSaleDataMutationVariables>;
export const SaleOutCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"saleOutCheck"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saleOutCheck"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isChecked"}}]}}]}}]} as unknown as DocumentNode<SaleOutCheckQuery, SaleOutCheckQueryVariables>;
export const TotalSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"totalSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalSaleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"totalSaleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalSaleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accDeliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"accTotalPayment"}},{"kind":"Field","name":{"kind":"Name","value":"accWonCost"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"accCount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accDeliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"accTotalPayment"}},{"kind":"Field","name":{"kind":"Name","value":"accWonCost"}}]}}]}}]}}]} as unknown as DocumentNode<TotalSaleQuery, TotalSaleQueryVariables>;
export const AddStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addStocksInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStockInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addStocksInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addStocksInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<AddStockMutation, AddStockMutationVariables>;
export const OutStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"outStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"outStocksInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStockInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"outStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"outStocksInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"outStocksInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<OutStockMutation, OutStockMutationVariables>;
export const ProductCountStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productCountStocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productCountStocksInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCountStocksInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCountStocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productCountStocksInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productCountStocksInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<ProductCountStocksQuery, ProductCountStocksQueryVariables>;
export const StocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"stocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stocksInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StocksInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stocksInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stocksInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StockColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StockColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StockColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockCount"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"leftDate"}},{"kind":"Field","name":{"kind":"Name","value":"monthSaleCount"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productCode"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}}]}}]} as unknown as DocumentNode<StocksQuery, StocksQueryVariables>;
export const StocksOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"stocksOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stocksOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductOrderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOrderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payCost"}},{"kind":"Field","name":{"kind":"Name","value":"notPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"isDone"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}}]}}]} as unknown as DocumentNode<StocksOrderQuery, StocksOrderQueryVariables>;
export const StocksStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"stocksState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stocksState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"orderCompleteDate"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<StocksStateQuery, StocksStateQueryVariables>;
export const SubsidiaryCountStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"subsidiaryCountStocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productCountStocksInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCountStocksInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subsidiaryCountStocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productCountStocksInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productCountStocksInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<SubsidiaryCountStocksQuery, SubsidiaryCountStocksQueryVariables>;
export const SubsidiaryStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"subsidiaryStocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stocksInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StocksInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subsidiaryStocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stocksInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stocksInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubsidiaryStockColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubsidiaryStockColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubsidiaryStockColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockCount"}},{"kind":"Field","name":{"kind":"Name","value":"leadTime"}},{"kind":"Field","name":{"kind":"Name","value":"productList"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"wonPrice"}}]}}]} as unknown as DocumentNode<SubsidiaryStocksQuery, SubsidiaryStocksQueryVariables>;
export const SubsidiaryStocksStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"subsidiaryStocksState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subsidiaryStocksState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<SubsidiaryStocksStateQuery, SubsidiaryStocksStateQueryVariables>;
export const CreateStorageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStorage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createStorageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStorageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStorage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createStorageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createStorageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Storage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]} as unknown as DocumentNode<CreateStorageMutation, CreateStorageMutationVariables>;
export const UpdateStorageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStorage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateStorageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStorageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStorage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateStorageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateStorageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Storage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]} as unknown as DocumentNode<UpdateStorageMutation, UpdateStorageMutationVariables>;
export const RemoveStorageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeStorage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeStorage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Storage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]} as unknown as DocumentNode<RemoveStorageMutation, RemoveStorageMutationVariables>;
export const StoragesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"storages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storagesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StoragesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storagesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storagesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Storage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]} as unknown as DocumentNode<StoragesQuery, StoragesQueryVariables>;
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
export const CreateWholeSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createWholeSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createWholeSaleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWholeSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWholeSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createWholeSaleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createWholeSaleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mallId"}}]}}]}}]} as unknown as DocumentNode<CreateWholeSaleMutation, CreateWholeSaleMutationVariables>;
export const RemoveWholeSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeWholeSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeWholeSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<RemoveWholeSaleMutation, RemoveWholeSaleMutationVariables>;
export const UpdateWholeSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateWholeSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateWholeSaleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWholeSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWholeSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateWholeSaleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateWholeSaleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mallId"}},{"kind":"Field","name":{"kind":"Name","value":"saleAt"}},{"kind":"Field","name":{"kind":"Name","value":"telephoneNumber1"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalWonCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"isDone"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryBoxCount"}},{"kind":"Field","name":{"kind":"Name","value":"productList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storageName"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productCode"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"payCost"}},{"kind":"Field","name":{"kind":"Name","value":"wonCost"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWholeSaleMutation, UpdateWholeSaleMutationVariables>;
export const WholeSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"wholeSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wholeSalesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WholeSalesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wholeSales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"wholeSalesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wholeSalesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mallId"}},{"kind":"Field","name":{"kind":"Name","value":"saleAt"}},{"kind":"Field","name":{"kind":"Name","value":"telephoneNumber1"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalWonCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"isDone"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryCost"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryBoxCount"}},{"kind":"Field","name":{"kind":"Name","value":"productList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storageName"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productCode"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"payCost"}},{"kind":"Field","name":{"kind":"Name","value":"wonCost"}}]}}]}}]}}]}}]} as unknown as DocumentNode<WholeSalesQuery, WholeSalesQueryVariables>;