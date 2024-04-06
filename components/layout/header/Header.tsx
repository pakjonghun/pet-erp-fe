'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Hero from './Hero';
import { FC } from 'react';
import MobileNavTrigger from './MobileNavTrigger';
import SettingMenuTrigger from './SettingMenuTrigger';

interface Props {
  toggleOpen: () => void;
}

const Header: FC<Props> = ({ toggleOpen }) => {
  return (
    <AppBar
      sx={{
        px: {
          xs: 0,
          sm: 1,
        },
      }}
      position="static"
      color="primary"
      elevation={1}
    >
      <Toolbar sx={{ display: 'flx', justifyContent: 'space-between' }}>
        <Hero isMobile={false} />
        <MobileNavTrigger toggleOpen={toggleOpen} />
        <Hero isMobile />
        <SettingMenuTrigger />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
