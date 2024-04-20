'use client';

import { Tab, Tabs } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getOriginPath } from '@/util';
import SubHeader from '@/components/layout/header/SubHeader';
import { BackDataTabs } from './constants';

interface Props {
  children: ReactNode;
}

const BackDataLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const tabs = Object.keys(BackDataTabs) as (keyof typeof BackDataTabs)[];
  const currentTabIndex = tabs.findIndex((item) => {
    return item === getOriginPath(pathname);
  });

  return (
    <>
      <SubHeader title="백데이터">
        <Tabs value={currentTabIndex} indicatorColor="primary">
          {tabs.map((tab) => {
            const tabItem = BackDataTabs[tab];
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

export default BackDataLayout;
