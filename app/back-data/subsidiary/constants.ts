import { HeaderItem } from '@/types';

export const SubsidiaryHeaderList: HeaderItem[] = [
  { sortable: true, id: 'name', label: '이름' },
  { sortable: false, id: 'category', label: '분류' },
  { sortable: true, id: 'code', label: '코드' },
  { sortable: true, id: 'wonPrice', label: '원가' },
  { sortable: true, id: 'leadTime', label: '리드타임(일)' },
  { sortable: false, id: 'productList', label: '사용되는 제품목록' },
];
