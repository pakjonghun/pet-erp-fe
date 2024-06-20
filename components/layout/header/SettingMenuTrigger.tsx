'use client';

import WebStoriesOutlinedIcon from '@mui/icons-material/WebStoriesOutlined';
import { MouseEvent, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Menu } from '@mui/material';
import { BaseListItem } from '@/components/ui/listItem/menuStyles';
import ListMenu from '@/components/ui/listItem/ListMenu';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { UserRole } from '@/http/graphql/codegen/graphql';
import { useLogout } from '@/http/rest/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { client } from '@/http/graphql/client';
import { snackMessage } from '@/store/snackMessage';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';

const SettingMenuTrigger = () => {
  const { role } = useReactiveVar(authState);
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
      role: [] as string[],
      callback: handleClickLogout,
      label: '로그아웃',
      icon: <LogoutOutlinedIcon />,
    },
    profile: {
      role: [] as string[],
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
      role: [UserRole.AdminDelivery] as string[],
      label: '택배비용 관리',
      icon: <LocalShippingOutlinedIcon />,
    },
    account: {
      callback: () => {
        router.push('/setting/account');
        setSettingMenuAnchor(null);
      },
      role: [UserRole.AdminAccount] as string[],
      label: '계정 관리',
      icon: <PeopleOutlineOutlinedIcon />,
    },
    log: {
      callback: () => {
        router.push('/setting/log');
        setSettingMenuAnchor(null);
      },
      role: [UserRole.AdminLog] as string[],
      label: '로그 조회',
      icon: <WebStoriesOutlinedIcon />,
    },
  };
  const { data } = useGetMyInfo();

  const settingMenuKeys = Object.keys(SettingMenus) as (keyof typeof SettingMenus)[];

  return (
    <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
      <Typography variant="body2" sx={{ ml: 'auto' }}>
        {data?.myInfo.id ?? ''}
      </Typography>
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
        {[
          settingMenuKeys.map((item) => {
            const menu = SettingMenus[item];
            const canDisplay =
              menu.role.length == 0 || menu.role.some((item) => !!role?.includes(item));

            if (!canDisplay) return <></>;
            return (
              <BaseListItem disablePadding key={menu.label}>
                <ListMenu menu={menu} />
              </BaseListItem>
            );
          }),
        ]}
      </Menu>
    </Box>
  );
};

export default SettingMenuTrigger;
