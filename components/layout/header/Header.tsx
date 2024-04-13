'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Hero from './Hero';
import { FC } from 'react';
import MobileNavTrigger from './MobileNavTrigger';
import SettingMenuTrigger from './SettingMenuTrigger';
import WebNav from '../navigation/WebNav';
import NavContent from '../navigation/NavContent';
import HeaderNav from '../navigation/\bHeaderNav';

interface Props {
  isLogin: boolean;
  toggleOpen: () => void;
}

const Header: FC<Props> = ({ isLogin, toggleOpen }) => {
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
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        {/* <WebNav> */}
        {/* <NavContent /> */}
        {/* </WebNav> */}

        {isLogin && <MobileNavTrigger toggleOpen={toggleOpen} />}

        <Hero isLogin={isLogin} />
        <HeaderNav />
        {isLogin && <SettingMenuTrigger />}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
