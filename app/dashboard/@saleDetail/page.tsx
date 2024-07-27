'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import DetailTabs from './DetailTabs';
import { DASHBOARD_DETAIL_TABS } from '../constants';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { useReactiveVar } from '@apollo/client';
import { saleRange } from '@/store/saleStore';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import TotalSaleCaption from './TotalSaleCaption';

const SaleDetail = () => {
  const { from, to } = useReactiveVar(saleRange);
  const setRange = (value: DateRange) => saleRange(value);
  const [tabValue, setTabValue] = useState(0);
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  const onChangeTab = (_: any, newValue: number) => {
    setTabValue(newValue);
  };

  console.log('from : ', from.format('YYYY-MM-DD'));

  return (
    <Card>
      <CardHeader
        title={`${DASHBOARD_DETAIL_TABS[tabValue] ?? ''} 판매수 순`}
        action={<DetailTabs tabValue={tabValue} onChangeTab={onChangeTab} />}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <SwitchDate
          range={{ from, to }}
          setRange={setRange}
          searchStandard={searchStandard}
          setSearchStandard={setSearchStandard}
        />
      </CardContent>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="caption">검색된 데이터 수 100개</Typography>
        <Typography variant="caption">
          <TotalSaleCaption from={from} to={to} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SaleDetail;
