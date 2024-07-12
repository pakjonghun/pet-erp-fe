'use client';

import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Hero from './Hero';
import MobileNavTrigger from './MobileNavTrigger';
import SettingMenuTrigger from './SettingMenuTrigger';
import HeaderNav from '../navigation/\bHeaderNav';
import { useSaleOutCheck } from '@/http/graphql/hooks/sale/useSaleoutCheck';
import { Badge, styled } from '@mui/material';

interface Props {
  isLogin: boolean;
  toggleOpen: () => void;
}

const MainHeader: FC<Props> = ({ isLogin, toggleOpen }) => {
  return (
    <AppBar
      sx={{
        position: 'relative',
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
        {isLogin && <MobileNavTrigger toggleOpen={toggleOpen} />}
        <Hero isLogin={isLogin} />
        {isLogin && <HeaderNav />}
        {isLogin && <SettingMenuTrigger />}
      </Toolbar>
    </AppBar>
  );
};
export default MainHeader;
