import { ClientType } from '@/http/graphql/codegen/graphql';
import { HeaderItem } from '@/types';

export const ClientHeaderList: HeaderItem[] = [
  { id: 'name', sortable: true, label: '쇼핑몰명' },
  { id: 'businessName', sortable: true, label: '상호' },
  { id: 'code', sortable: true, label: '코드' },
  { id: 'feeRate', sortable: true, label: '수수료율' },
  { id: 'category', sortable: false, label: '분류' },
  { id: 'payDate', sortable: true, label: '결제일(매월)' },
  { id: 'manager', sortable: true, label: '담당자 이름' },
  { id: 'managerTel', sortable: true, label: '연락처' },
  { id: 'inActive', sortable: true, label: '거래여부' },
  { id: 'storage', sortable: false, label: '출고창고' },
  { id: 'freeDelivery', sortable: false, label: '택배비 무료제품' },
  { id: 'notFreeDelivery', sortable: false, label: '택배비 유료제품' },
  { id: 'isSabangService', sortable: true, label: '사방넷 지원여부' },
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
