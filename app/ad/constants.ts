import { AdType } from '@/http/graphql/codegen/graphql';

export const ContextOptions = ['edit', 'delete'] as const;
export const ProductHeaderList = [
  '코드',
  '분류',
  '바코드',
  '이름',
  '원가',
  '판매가',
  '리드타임(일)',
  '',
];

export const headerList = ['시작날짜', '종료날짜', '광고종류', '거래처', '제품목록'];

export const initProductOption = {
  count: 1,
  productCode: {
    code: '',
    name: '',
  },
};

export const CreateAdTabs: Record<AdType, string> = {
  [AdType.ChannelAppProduct]: '채널제품',
  [AdType.ChannelSpecialProduct]: '제품채널',
  [AdType.ChannelProductRate]: '채널공통광고',
  [AdType.CompanyRate]: '회사공통',
};
