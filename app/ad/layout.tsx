'use client';

import { FC, ReactNode } from 'react';
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
