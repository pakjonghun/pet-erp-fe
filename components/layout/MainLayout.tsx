'use client';

import { NAV_WIDTH } from '@/components/layout/constants';
import Header from '@/components/layout/header/Header';
import MobileNav from '@/components/layout/navigation/MobileNav';
import NavContent from '@/components/layout/navigation/NavContent';
import WebNav from '@/components/layout/navigation/WebNav';
import { Box } from '@mui/material';
import { FC, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Box component="main">
      <MobileNav open={open} onClose={onClose}>
        <NavContent />
      </MobileNav>
      <WebNav>
        <NavContent />
      </WebNav>
      <Box
        sx={{
          ml: 'auto',
          width: {
            sm: '100%',
            md: `calc(100% - ${NAV_WIDTH}px)`,
          },
        }}
      >
        <Header toggleOpen={toggleOpen} />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
