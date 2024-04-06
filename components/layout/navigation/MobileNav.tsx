'use client';

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { NAV_WIDTH } from '../constants';

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<Props> = ({ open, children, onClose }) => {
  return (
    <Drawer
      component="nav"
      ModalProps={{
        keepMounted: true,
      }}
      sx={(theme) => ({
        display: { xs: 'block', md: 'none' },
        zIndex: theme.zIndex.appBar - 1,
        width: NAV_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: NAV_WIDTH,
          borderRight: 'none',
        },
      })}
      onClose={onClose}
      open={open}
      variant="temporary"
      anchor="left"
    >
      {children}
    </Drawer>
  );
};

export default MobileNav;
