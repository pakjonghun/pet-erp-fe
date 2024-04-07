'use client';

import { NAV_WIDTH } from '@/components/layout/constants';
import Header from '@/components/layout/header/Header';
import MobileNav from '@/components/layout/navigation/MobileNav';
import NavContent from '@/components/layout/navigation/NavContent';
import WebNav from '@/components/layout/navigation/WebNav';
import { isLogin } from '@/store/isLogin';
import { useReactiveVar } from '@apollo/client';
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
  const isLoginStatus = useReactiveVar(isLogin);

  useEffect(() => {
    if (!isLoginStatus) {
      router.replace('/login');
    }
  }, [isLoginStatus, router]);

  return (
    <Box component="main">
      {!!isLoginStatus && (
        <>
          <MobileNav open={open} onClose={onClose}>
            <NavContent />
          </MobileNav>
          <WebNav>
            <NavContent />
          </WebNav>
        </>
      )}
      <Box
        sx={{
          ml: 'auto',
          width: {
            sm: '100%',
            md: isLoginStatus ? `calc(100% - ${NAV_WIDTH}px)` : '100%',
          },
        }}
      >
        <Header isLogin={isLoginStatus} toggleOpen={toggleOpen} />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
