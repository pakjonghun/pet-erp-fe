import { UserRole } from '@/api/graphql/codegen/graphql';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';

export const SettingTabs = {
  setting: {
    label: '내 프로필',
    icon: <LockResetOutlinedIcon />,
  },
  'setting/delivery': {
    role: [UserRole.Admin, UserRole.Manager],
    label: '택배비용 관리',
    icon: <LocalShippingOutlinedIcon />,
  },
  'setting/account': {
    role: [UserRole.Admin],
    label: '계정 관리',
    icon: <PeopleOutlineOutlinedIcon />,
  },
};
