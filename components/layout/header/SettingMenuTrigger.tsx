import { MouseEvent, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Menu } from '@mui/material';
import { BaseListItem } from '@/components/ui/listItem/menuStyles';
import ListMenu from '@/components/ui/listItem/ListMenu';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { UserRole } from '@/api/graphql/codegen/graphql';
import { useLogout } from '@/api/rest/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { client } from '@/api/graphql/client';
import { snackMessage } from '@/store/snackMessage';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const SettingMenuTrigger = () => {
  const router = useRouter();
  const [settingMenuAnchor, setSettingMenuAnchor] = useState<null | HTMLElement>(null);
  const handleClickSetting = (event: MouseEvent<HTMLElement>) => {
    setSettingMenuAnchor(event.currentTarget);
  };

  const handleCloseSettingMenu = () => {
    setSettingMenuAnchor(null);
  };

  const { mutate: logout } = useLogout();
  const handleClickLogout = () => {
    logout(undefined, {
      onSuccess: async () => {
        snackMessage({ message: '안녕히 가세요.', severity: 'success' });
        await client.resetStore();
        setSettingMenuAnchor(null);
      },
      onError: (err) => {
        snackMessage({ message: '로그아웃이 실패했습니다.', severity: 'error' });
        const message = err.response?.data.message ?? '로그아웃이 실패했습니다.';
        snackMessage({ message, severity: 'error' });
      },
    });
  };

  const SettingMenus = {
    logout: {
      callback: handleClickLogout,
      label: '로그아웃',
      icon: <LogoutOutlinedIcon />,
    },
    profile: {
      callback: () => {
        router.push('/setting');
        setSettingMenuAnchor(null);
      },
      label: '내 프로필',
      icon: <PeopleAltOutlinedIcon />,
    },
    delivery: {
      callback: () => {
        router.push('/setting/delivery');
        setSettingMenuAnchor(null);
      },
      role: [UserRole.Admin, UserRole.Manager],
      label: '택배비용 관리',
      icon: <LocalShippingOutlinedIcon />,
    },
    account: {
      callback: () => {
        router.push('/setting/account');
        setSettingMenuAnchor(null);
      },
      role: [UserRole.Admin],
      label: '계정 관리',
      icon: <PeopleOutlineOutlinedIcon />,
    },
  };

  const settingMenuKeys = Object.keys(SettingMenus) as (keyof typeof SettingMenus)[];

  return (
    <Box>
      <IconButton
        onClick={handleClickSetting}
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={settingMenuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(settingMenuAnchor)}
        onClose={handleCloseSettingMenu}
      >
        {settingMenuKeys.map((item) => {
          const menu = SettingMenus[item];
          return (
            <BaseListItem disablePadding key={menu.label}>
              <ListMenu menu={menu} />
            </BaseListItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default SettingMenuTrigger;
