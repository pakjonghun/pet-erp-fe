import { ClientType } from '@/http/graphql/codegen/graphql';
// count
// product
// factory
// storage
// products
// count
// payCost
// notPayCost: number;
//   totalPayCost
export const OrderHeaderList = ['출발장소', '도착장소', '출발날짜', '도착날짜', '제품목록', ''];

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
