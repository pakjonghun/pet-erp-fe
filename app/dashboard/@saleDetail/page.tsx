'use client';

import { useState } from 'react';
import { Card, CardHeader } from '@mui/material';
import DetailTabs from './_components/DetailTabs';
import { DASHBOARD_DETAIL_TABS } from '../constants';
import ProductSaleDetail from './ProductSaleDetail';
import ClientSaleDetail from './ClientSaleDetail';

const SaleDetail = () => {
  const [tabValue, setTabValue] = useState(0);

  const onChangeTab = (_: any, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Card>
      <CardHeader title={`${DASHBOARD_DETAIL_TABS[tabValue] ?? ''} 판매수 순`} />
      {/* <DetailTabs tabValue={tabValue} onChangeTab={onChangeTab} /> */}
      <ClientSaleDetail />
      {/* {tabValue ? <ProductSaleDetail /> : <ClientSaleDetail />} */}
    </Card>
  );
};

export default SaleDetail;
