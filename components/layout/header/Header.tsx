'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Hero from './Hero';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation';
import { Container } from '@mui/material';
import { FC } from 'react';

interface Props {
  toggleOpen: () => void;
}

const Header: FC<Props> = ({ toggleOpen }) => {
  const navigate = useRouter();

  const handleClickSetting = () => {
    navigate.push('/setting');
  };

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
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            onClick={toggleOpen}
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Hero isMobile />
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            onClick={handleClickSetting}
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
