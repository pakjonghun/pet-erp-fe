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

export const headerList = ['시작날짜', '종료날짜', '광고종류', '광고비용', '거래처', '제품목록'];

export const initProductOption = {
  count: 1,
  productCode: {
    code: '',
    name: '',
  },
};

export const AdTypeToHangle: Record<AdType | '모든타입', string> = {
  ['모든타입']: '모든타입',
  [AdType.ChannelAppProduct]: '채널제품',
  [AdType.ChannelSpecialProduct]: '제품채널',
  [AdType.ChannelProductRate]: '채널공통광고',
  [AdType.CompanyRate]: '회사공통',
};

export const AdTypeToEng: Record<string, AdType | '모든타입'> = {
  ['모든타입' as string]: '모든타입',
  ['채널제품' as string]: AdType.ChannelAppProduct,
  ['제품채널' as string]: AdType.ChannelSpecialProduct,
  ['채널공통광고' as string]: AdType.ChannelProductRate,
  ['회사공통' as string]: AdType.CompanyRate,
};
