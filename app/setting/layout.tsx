'use client';

import { Box, Tab, Tabs } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { SettingTabs } from './constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getOriginPath } from '@/utils/common';
import SubHeader from '@/components/layout/header/SubHeader';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';

interface Props {
  children: ReactNode;
}

const SettingLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const tabs = Object.keys(SettingTabs) as (keyof typeof SettingTabs)[];
  const currentTabIndex = tabs.findIndex((item) => item === getOriginPath(pathname));
  const { role } = useReactiveVar(authState);

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <SubHeader title="설정">
        <Tabs value={currentTabIndex == -1 ? 0 : currentTabIndex} indicatorColor="primary">
          {tabs.map((tab) => {
            const tabItem = SettingTabs[tab];
            const canDisplay =
              tabItem.role.length == 0 || tabItem.role.some((item) => role.includes(item));
            if (!canDisplay) return <></>;
            return (
              <Tab
                sx={{
                  transition: 'all .3s',
                  fontSize: 16,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.action.selected,
                  },
                  '&.Mui-selected': {
                    fontWeight: 800,
                  },
                }}
                href={`/${tab}`}
                component={Link}
                label={tabItem.label}
                key={tab}
              />
            );
          })}
        </Tabs>
      </SubHeader>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>{children}</Box>
    </Box>
  );
};

export default SettingLayout;
