'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import SubHeader from '@/components/layout/header/SubHeader';
import {
  Box,
  Tabs,
  Tab,
  Stack,
  FormControlLabel,
  Switch,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
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
import SubTitle from '@/components/ui/typograph/SubTitle';

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
      <SubTitle title="대시보드" />
      <Box sx={{ p: 3, overflow: 'auto' }}>{children}</Box>
    </Box>
  );
};

export default DashboardLayout;
