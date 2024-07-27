'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import SubHeader from '@/components/layout/header/SubHeader';
import { Box, Tabs, Tab, Stack, FormControlLabel, Switch, IconButton, Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getOriginPath } from '@/utils/common';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { useReactiveVar } from '@apollo/client';
import { saleRange, showPrevData } from '@/store/saleStore';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { DashboardTabs } from './constants';
import { getToday } from '@/components/calendar/dateFilter/utils';

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  const isShowPrevData = useReactiveVar(showPrevData);

  const pathname = usePathname();
  const tabs = Object.keys(DashboardTabs) as (keyof typeof DashboardTabs)[];
  const currentTabIndex = tabs.findIndex((item) => {
    return item === getOriginPath(pathname);
  });

  const { from, to } = useReactiveVar(saleRange);
  const setRange = (value: DateRange) => saleRange(value);
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  const handleResetDateRange = () => {
    setRange(getToday());
  };

  useEffect(() => {
    return handleResetDateRange();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        bgcolor: (theme) => theme.palette.primary.light,
      }}
    >
      <SubHeader title="대시보드">
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
                onClick={handleResetDateRange}
              />
            );
          })}
        </Tabs>
      </SubHeader>
      <Box sx={{ p: 3, overflow: 'auto' }}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            gap: 3,
            justifyContent: {
              md: 'space-between',
            },
          }}
        >
          <SwitchDate
            dateRange={{ from, to }}
            setDateRange={setRange}
            searchStandard={searchStandard}
            setSearchStandard={setSearchStandard}
          />
          <FormControlLabel
            label={isShowPrevData ? '수익 비교 끄기' : '수익 비교 켜기'}
            control={
              <Switch
                size="small"
                value={isShowPrevData}
                checked={isShowPrevData}
                onChange={(_, checked) => showPrevData(checked)}
              />
            }
          />
        </Stack>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
