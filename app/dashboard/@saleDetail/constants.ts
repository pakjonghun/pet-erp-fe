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
