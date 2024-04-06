'use client';

import { useGetMyInfo } from '@/api/graphql/hooks/useGetMyInfo';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Guard: FC<Props> = ({ children }) => {
  const { data } = useGetMyInfo();
  // console.log('data : ', data);ㄱ
  return <>{children}</>;
};

export default Guard;
