'use client';

import { FC, ReactNode, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { saleRange } from '@/store/saleStore';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { getToday } from '@/components/calendar/dateFilter/utils';
import SaleOrders from './@saleDetail/SaleOrders';
import dayjs from 'dayjs';
import SubHeader from '@/components/layout/header/SubHeader';

interface Props {
  totalSale: ReactNode;
  saleDetail: ReactNode;
  saleDetailDate: ReactNode;
}

const DashboardLayout: FC<Props> = ({ totalSale, saleDetail, saleDetailDate }) => {
  const setRange = (value: DateRange) => saleRange(value);

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
        gap: 3,
        bgcolor: (theme) => theme.palette.primary.light,
      }}
    >
      <SubHeader title="대시보드" sx={{ boxShadow: 0 }} />
      <Box sx={{ p: 3, overflow: 'auto' }}>
        <div id="dashboardDetail"></div>
        <Grid container spacing={2}>
          <Grid item xs={12} xl={6}>
            {totalSale}
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2, gap: 2 }}>
          <Box sx={{ width: '100%' }}>{saleDetail}</Box>
          <Box
            sx={{
              width: '100%',
              p: 2,
              bgcolor: 'white',
              borderRadius: 1,
              boxShadow: 2,
              minHeight: '60vh',
            }}
          >
            <SaleOrders
              size="large"
              initProductName=""
              initMallId=""
              initDateRange={{ from: dayjs().startOf('day'), to: dayjs().endOf('day') }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
