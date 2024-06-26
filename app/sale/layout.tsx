'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import SubHeader from '@/components/layout/header/SubHeader';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { useReactiveVar } from '@apollo/client';
import { clientTotal, saleRange, saleTotal } from '@/store/saleStore';
import { getToday } from '@/components/calendar/dateFilter/utils';
import { usePathname } from 'next/navigation';
import { SaleTabs } from './constants';
import { getOriginPath } from '@/utils/common';
import Link from 'next/link';
interface Props {
  children: ReactNode;
}

const SaleLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const tabs = Object.keys(SaleTabs) as (keyof typeof SaleTabs)[];
  const currentTabIndex = tabs.findIndex((item) => {
    return item === getOriginPath(pathname);
  });

  const range = useReactiveVar(saleRange);
  const setRange = (value: DateRange) => saleRange(value);
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  const handleResetDateRange = () => {
    saleRange(getToday());
  };

  useEffect(() => {
    return () => {
      handleResetDateRange();
      clientTotal({ totalCount: 0, totalPayCost: 0, totalProfit: 0 });
      saleTotal({ totalCount: 0, totalPayCost: 0, totalProfit: 0 });
    };
  }, []);

  return (
    <Box sx={{ height: '100%' }}>
      <SubHeader title="판매">
        <Tabs
          sx={{ mt: 2 }}
          value={currentTabIndex == -1 ? 0 : currentTabIndex}
          indicatorColor="primary"
        >
          {tabs.map((tab) => {
            const tabItem = SaleTabs[tab];
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
      <SwitchDate
        sx={{ pl: 3, mt: 2 }}
        range={range}
        setRange={setRange}
        searchStandard={searchStandard}
        setSearchStandard={setSearchStandard}
      />
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            xl: 'row',
          },
        }}
      >
        {children}
      </Stack>
    </Box>
  );
};

export default SaleLayout;
