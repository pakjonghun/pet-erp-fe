'use client';

import { Card, CardHeader, FormControlLabel, Skeleton, Switch } from '@mui/material';
import dayjs from 'dayjs';
import SaleCardContent from './SaleCardContent';
import useGetTotalSale from '../_hooks/useGetSaleData';

const TotalSale = () => {
  const today = dayjs();
  const todayFrom = today.startOf('day');
  const todayTo = today.endOf('day');
  const { loading: todayLoading, saleInfo: todaySaleInfo } = useGetTotalSale({
    from: todayFrom,
    to: todayTo,
  });

  const monthFrom = today.startOf('month');
  const monthTo = today.endOf('month');
  const { loading: monthLoading, saleInfo: monthSaleInfo } = useGetTotalSale({
    from: monthFrom,
    to: monthTo,
  });

  if (todayLoading || monthLoading) {
    return <Skeleton variant="rounded" width="100%" height="100%" sx={{ minHeight: '139px' }} />;
  }

  return (
    <Card>
      <CardHeader
        title="매출합계"
        subheader={`오늘 날짜 ${today.format('YYYY-MM-DD')}`}
        // action={<FormControlLabel control={<Switch />} label="광고비 적용" />}
      />
      <SaleCardContent title="오늘매출" saleInfo={todaySaleInfo} />
      <SaleCardContent title="이번달 매출" saleInfo={monthSaleInfo} />
    </Card>
  );
};

export default TotalSale;
