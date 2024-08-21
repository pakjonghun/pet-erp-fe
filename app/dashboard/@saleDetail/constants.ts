import { SaleToNumber } from './type';

export const SaleOrdersNameMapper = {
  ['saleAt' as string]: '주문날짜',
  mallId: '거래처',
  productName: '제품명',
  count: '판매수',
  totalPayment: '매출',
  payCost: '정산액',
  wonCost: '원가',
  deliveryCost: '택배비',
  orderNumber: '주문번호',
};

export const SaleOrderSortList = [
  { value: 'count', name: '판매수' },
  { value: 'totalPayment', name: '매출' },
  { value: 'wonCost', name: '원가' },
  { value: 'payCost', name: '정산가' },
  { value: 'saleAt', name: '주문날짜' },
  { value: 'productName', name: '제품이름' },
];

export const SaleProductNameMapper = {
  ['name']: '제품',
  ['accTotalPayment']: '매출',
  ['accCount']: '판매수',
  ['accProfit']: '순익',
  ['accProfitRate']: '순익율',
};

export const SaleProductSortList = [
  {
    name: '이름',
    value: 'name',
  },
  {
    name: '매출',
    value: 'accTotalPayment',
  },
  {
    name: '판매수',
    value: 'accCount',
  },
  {
    name: '순익',
    value: 'accProfit',
  },
  {
    name: '순익율',
    value: 'accProfitRate',
  },
];

export const detailHeader = [
  'NO',
  '이름',
  '판매수',
  '매출',
  '정산액',
  '원가',
  '택배비',
  '수익',
  '순익율',
];

export const detailHeaderMapper: Record<string, keyof SaleToNumber> = {
  이름: 'name',
  판매수: 'accCount',
  매출: 'accTotalPayment',
  정산액: 'accPayCost',
  원가: 'accWonCost',
  택배비: 'accDeliveryCost',
  수익: 'profit',
  순익율: 'profitRate',
};

export const detailHeaderMapperToHangle: Record<keyof SaleToNumber, string> = {
  name: '이름',
  accCount: '판매수',
  accTotalPayment: '매출',
  accPayCost: '정산액',
  accWonCost: '원가',
  accDeliveryCost: '택배비',
  profit: '수익',
  profitRate: '순익율',
};
