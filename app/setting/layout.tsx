'use client';

import { Tab, Tabs } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { SettingTabs } from './constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getOriginPath } from '@/utils/common';
import SubHeader from '@/components/layout/header/SubHeader';

interface Props {
  children: ReactNode;
}

const SettingLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const tabs = Object.keys(SettingTabs) as (keyof typeof SettingTabs)[];
  const currentTabIndex = tabs.findIndex((item) => item === getOriginPath(pathname));

  return (
    <>
      <SubHeader title="설정">
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
      </SubHeader>
      {children}
    </>
  );
};

export default SettingLayout;
