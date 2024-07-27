'use client';

import { FC, ReactNode, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { saleRange } from '@/store/saleStore';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { getToday } from '@/components/calendar/dateFilter/utils';
import SubTitle from '@/components/ui/typograph/SubTitle';

interface Props {
  totalSale: ReactNode;
  saleDetail: ReactNode;
}

const DashboardLayout: FC<Props> = ({ totalSale, saleDetail }) => {
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
        bgcolor: (theme) => theme.palette.primary.light,
      }}
    >
      <SubTitle title="대시보드" />
      <Box sx={{ p: 3, overflow: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} xl={6}>
            {totalSale}
          </Grid>
        </Grid>
        <Grid sx={{ mt: 2 }} container spacing={2}>
          <Grid item xs={12} xl={6}>
            {saleDetail}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
