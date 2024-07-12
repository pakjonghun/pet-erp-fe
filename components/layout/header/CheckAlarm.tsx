'use client';

import { useSaleOutCheck } from '@/http/graphql/hooks/sale/useSaleoutCheck';
import { Badge, styled } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const CheckAlarm = () => {
  const { data, refetch } = useSaleOutCheck();
  const [shouldCheck, setShouldCheck] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      refetch();
      getSaleOutTime();
      const shouldCheck = getSaleOutTime();
      setShouldCheck(shouldCheck);
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (data?.saleOutCheck?.isChecked || !shouldCheck) {
    return <></>;
  }

  return <BlankBadge>판매 출고 할 시간입니다.!</BlankBadge>;
};

export default CheckAlarm;

const BlankBadge = styled(Badge)(({ theme }) => ({
  '@keyframes blank': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.1 },
    '100%': { opacity: 1 },
  },
  position: 'absolute',
  top: '-50%',
  right: 1,
  fontSize: 10,
  animation: 'blank 2s infinite',
}));

function getSaleOutTime() {
  const now = dayjs();
  const h = now.get('hour');
  const m = now.get('minute');
  return h >= 18 && m >= 30;
}
