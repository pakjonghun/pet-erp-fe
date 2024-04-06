'use client';

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { NAV_WIDTH } from '../constants';

interface Props {
  children: React.ReactNode;
}

const WebNav: React.FC<Props> = ({ children }) => {
  return (
    <Drawer
      component="nav"
      sx={(theme) => ({
        display: { xs: 'none', md: 'block' },
        zIndex: theme.zIndex.appBar - 1,
        width: NAV_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: NAV_WIDTH,
          borderRight: 'none',
        },
      })}
      variant="permanent"
      anchor="left"
    >
      {children}
    </Drawer>
  );
};

export default WebNav;
