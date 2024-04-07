'use client';

import { useGetMyInfo } from '@/api/graphql/hooks/useGetMyInfo';
import { isLogin } from '@/store/isLogin';
import React, { FC, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PUBLIC_PATH } from '@/constants';
import { getFirstPath } from '@/util';

interface Props {
  children: ReactNode;
}

const Guard: FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const firstPath = getFirstPath(pathname);
  const isPublic = PUBLIC_PATH.includes(firstPath);
  const { data: myInfo } = useGetMyInfo();

  useEffect(() => {
    isLogin(!!myInfo);
  }, [myInfo, router]);

  if (isPublic) {
    return children;
  }

  return !!myInfo ? children : <>로그인 정보가 없습니다.</>;
};

export default Guard;
