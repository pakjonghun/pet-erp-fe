'use client';

import { useState } from 'react';
import { Card, CardHeader } from '@mui/material';
import DetailTabs from './DetailTabs';
import { DASHBOARD_DETAIL_TABS } from '../constants';

const SaleDetail = () => {
  const [tabValue, setTabValue] = useState(0);

  const onChangeTab = (_: any, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Card>
      <CardHeader
        title={`${DASHBOARD_DETAIL_TABS[tabValue] ?? ''} 판매수 순`}
        action={<DetailTabs tabValue={tabValue} onChangeTab={onChangeTab} />}
      />
    </Card>
  );
};

export default SaleDetail;
