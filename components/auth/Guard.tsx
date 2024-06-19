'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';
import { authState } from '@/store/isLogin';
import { usePathname } from 'next/navigation';
import { PUBLIC_PATH } from '@/constants';
import { getFirstPath } from '@/utils/common';

interface Props {
  children: ReactNode;
}

const Guard: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const firstPath = getFirstPath(pathname);
  const isPublic = PUBLIC_PATH.includes(firstPath);
  const { data: myInfo, loading } = useGetMyInfo();
  useEffect(() => {
    authState({ loading, isLogin: !!myInfo, role: myInfo?.myInfo.role ?? [] });
  }, [myInfo, loading]);

  if (isPublic) {
    return children;
  }

  return !!myInfo ? children : <>로그인 정보가 없습니다.</>;
};

export default Guard;
