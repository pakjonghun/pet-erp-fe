'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import SubHeader from '@/components/layout/header/SubHeader';
import { Box, Stack } from '@mui/material';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { useReactiveVar } from '@apollo/client';
import { clientTotal, saleRange, saleTotal } from '@/store/saleStore';
import { getToday } from '@/components/calendar/dateFilter/utils';
interface Props {
  productSales: ReactNode;
  topClients: ReactNode;
}

const SaleLayout: FC<Props> = ({ productSales, topClients }) => {
  const range = useReactiveVar(saleRange);
  const setRange = (value: DateRange) => saleRange(value);
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  useEffect(() => {
    return () => {
      saleRange(getToday());
      clientTotal({ totalCount: 0, totalPayCost: 0, totalProfit: 0 });
      saleTotal({ totalCount: 0, totalPayCost: 0, totalProfit: 0 });
    };
  }, []);

  return (
    <Box sx={{ height: '100%' }}>
      <SubHeader sx={{ boxShadow: 'none' }} title="판매" />
      <SwitchDate
        sx={{ pl: 3 }}
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
