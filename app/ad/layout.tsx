'use client';

import { Tab, Tabs } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getOriginPath } from '@/utils/common';
import SubHeader from '@/components/layout/header/SubHeader';

interface Props {
  children: ReactNode;
}

const BackDataLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <SubHeader title="광고" sx={{ boxShadow: 0 }} />
      {children}
    </>
  );
};

export default BackDataLayout;
