'use client';

import { useGetMyInfo } from '@/api/graphql/hooks/users/useGetMyInfo';
import { NAV_WIDTH } from '@/components/layout/constants';
import Header from '@/components/layout/header/Header';
import MobileNav from '@/components/layout/navigation/MobileNav';
import NavContent from '@/components/layout/navigation/NavContent';
import WebNav from '@/components/layout/navigation/WebNav';
import useGetIsPublicPath from '@/hooks/useGetIsPublicPath';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  const { loading, data: myInfo } = useGetMyInfo();
  useEffect(() => {
    if (!loading && !myInfo) {
      router.replace('/login');
    }
  }, [loading, myInfo, router]);

  const isLogin = !!myInfo && !loading;
  const isPublicPath = useGetIsPublicPath();

  return (
    <Box component="main">
      {!isPublicPath && (
        <MobileNav open={open} onClose={onClose}>
          <NavContent />
        </MobileNav>
      )}
      <Box
        sx={{
          ml: 'auto',
          width: '100%',
        }}
      >
        <Header isLogin={isLogin} toggleOpen={toggleOpen} />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
