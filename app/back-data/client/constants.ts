import { ClientType } from '@/http/graphql/codegen/graphql';

export const ClientHeaderList = [
  '쇼핑몰명',
  '상호',
  '코드',
  '수수료율',
  '분류',
  '결제일(매월)',
  '담당자 이름',
  '연락처',
  '거래여부',
  '출고창고',
  '택배비 무료제품',
  '택배비 유료제품',
];

export const ClientTypeToHangle = {
  wholeSale: '도매몰',
  platform: '플렛폼',
  cs: 'cs',
  reward: '리워드',
  marketing: '마케팅',
  bender: '밴더',
  offline: '오프라인',
  openMarket: '오픈마켓',
  proMall: '전문몰',
};

export const clientTypes: Record<ClientType, string> = {
  [ClientType.Bender]: '밴더',
  [ClientType.Cs]: 'CS',
  [ClientType.Marketing]: '마케팅',
  [ClientType.Offline]: '오프라인',
  [ClientType.OpenMarket]: '오픈마켓',
  [ClientType.Platform]: '플렛폼',
  [ClientType.ProMall]: '전문몰',
  [ClientType.Reward]: '리워드',
  [ClientType.WholeSale]: '도매몰',
};
