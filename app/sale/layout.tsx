'use client';

import { FC, ReactNode, useState } from 'react';
import SubHeader from '@/components/layout/header/SubHeader';
import { Box, Stack } from '@mui/material';
import dayjs from 'dayjs';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { getDateRange, getToday } from '@/components/calendar/dateFilter/utils';
interface Props {
  productSales: ReactNode;
  topClients: ReactNode;
}

const SaleLayout: FC<Props> = ({ productSales, topClients }) => {
  const [range, setRange] = useState<DateRange>(getToday());
  const [dateObj, setDateObj] = useState(dayjs());
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  return (
    <Box sx={{ height: '100%' }}>
      <SubHeader sx={{ boxShadow: 'none' }} title="판매" />
      <SwitchDate
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
        {topClients}
        {productSales}
      </Stack>
    </Box>
  );
};

export default SaleLayout;
