'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import Header from '@/components/layout/header/MainHeader';
import MobileNav from '@/components/layout/navigation/MobileNav';
import NavContent from '@/components/layout/navigation/NavContent';
import useGetIsPublicPath from '@/hooks/useGetIsPublicPath';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  const { loading, isLogin } = useReactiveVar(authState);
  useEffect(() => {
    if (isLogin) return;

    if (!isLogin) {
      console.log('main layout', isLogin);
      router.replace('/login');
    }
  }, [isLogin, loading, router]);

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
          height: '100vh',
          bgcolor: 'primary.light',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header isLogin={isLogin} toggleOpen={toggleOpen} />
        <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
