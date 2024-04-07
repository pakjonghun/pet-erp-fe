'use client';

import { AppBar, Tab, Tabs, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { SettingTabs } from './constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getOriginPath } from '@/util';

interface Props {
  children: ReactNode;
}

const SettingLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const tabs = Object.keys(SettingTabs) as (keyof typeof SettingTabs)[];
  const currentTabIndex = tabs.findIndex((item) => item === getOriginPath(pathname));

  return (
    <>
      <AppBar sx={{ color: 'black', bgcolor: 'background.paper', boxShadow: 1 }} position="static">
        <Typography variant="h4" component="h4" sx={{ fontWeight: 600, p: 3 }}>
          설정
        </Typography>
        <Tabs value={currentTabIndex} indicatorColor="primary">
          {tabs.map((tab) => {
            const tabItem = SettingTabs[tab];
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
      </AppBar>
      {children}
    </>
  );
};

export default SettingLayout;
