'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import SubHeader from '@/components/layout/header/SubHeader';
import { Box, FormControlLabel, Stack, Switch, Tab, Tabs } from '@mui/material';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { useReactiveVar } from '@apollo/client';
import { clientTotal, saleRange, saleTotal, showPrevSaleData } from '@/store/saleStore';
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
      clientTotal({ totalCount: 0, totalPayCost: 0, totalProfit: 0, totalPayment: 0 });
      saleTotal({ totalCount: 0, totalPayCost: 0, totalProfit: 0, totalPayment: 0 });
    };
  }, []);

  const isShowPrevSaleData = useReactiveVar(showPrevSaleData);

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <SubHeader title="판매">
        <Tabs value={currentTabIndex == -1 ? 0 : currentTabIndex} indicatorColor="primary">
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
      <Box sx={{ overflow: 'auto', flex: 1 }}>
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

            px: 4,
          }}
        >
          <SwitchDate
            sx={{ mt: 2 }}
            range={range}
            setRange={setRange}
            searchStandard={searchStandard}
            setSearchStandard={setSearchStandard}
          />
          <FormControlLabel
            label={isShowPrevSaleData ? '수익 비교 끄기' : '수익 비교 켜기'}
            control={
              <Switch
                size="small"
                value={isShowPrevSaleData}
                checked={isShowPrevSaleData}
                onChange={(_, checked) => showPrevSaleData(checked)}
              />
            }
          />
        </Stack>
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
    </Box>
  );
};

export default SaleLayout;
