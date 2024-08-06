import { HeaderItem } from '@/types';

export const ProductHeaderList: HeaderItem[] = [
  { label: '이름', id: 'name', sortable: true },
  { label: '분류', id: 'category', sortable: false },
  { label: '바코드', id: 'barCode', sortable: true },
  { label: '코드', id: 'code', sortable: true },
  { label: '원가', id: 'wonPrice', sortable: true },
  { label: '판매가', id: 'salePrice', sortable: true },
  { label: '리드타임(일)', id: 'leadTime', sortable: true },
  { label: '출고창고', id: 'storage', sortable: false },
  { label: '착불여부', id: 'isFreeDeliveryFee', sortable: true },
];
