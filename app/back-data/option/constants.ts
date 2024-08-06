import { HeaderItem } from '@/types';

export const OptionHeaderList: HeaderItem[] = [
  { sortable: true, id: 'id', label: '아이디' },
  { sortable: true, id: 'name', label: '이름' },
  { sortable: false, id: 'productList', label: '적용 할 수 있는 제품 목록' },
];

export const initProductOption = {
  count: 1,
  productCode: {
    code: '',
    name: '',
  },
};
