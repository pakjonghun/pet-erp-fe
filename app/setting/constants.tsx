import { UserRole } from '@/api/graphql/codegen/graphql';

export const SettingTabs = {
  setting: {
    label: '내 프로필',
  },
  'setting/delivery': {
    role: [UserRole.Admin, UserRole.Manager],
    label: '택배비용 관리',
  },
  'setting/account': {
    role: [UserRole.Admin],
    label: '계정 관리',
  },
  'setting/log': {
    role: [UserRole.Admin],
    label: '이력 관리',
  },
};
