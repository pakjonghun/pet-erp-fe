'use client';

import { FC, ReactNode } from 'react';
import SubHeader from '@/components/layout/header/SubHeader';
import { Box, Tabs, Tab } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getOriginPath } from '@/utils/common';
import { DashboardTabs } from './constants';

interface Props {
  children: ReactNode;
}

const StockLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const tabs = Object.keys(DashboardTabs) as (keyof typeof DashboardTabs)[];
  const currentTabIndex = tabs.findIndex((item) => {
    return item === getOriginPath(pathname);
  });

  return (
    <Box
      sx={{ height: '100%', bgcolor: (theme) => theme.palette.primary.light }}
    >
      <SubHeader title="재고">
        <Tabs
          sx={{ mt: 2 }}
          value={currentTabIndex == -1 ? 0 : currentTabIndex}
          indicatorColor="primary"
        >
          {tabs.map((tab) => {
            const tabItem = DashboardTabs[tab];
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
      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  );
};

export default StockLayout;
