import React, { FC } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { Stack, SxProps, Typography } from '@mui/material';
import Link from 'next/link';

interface Props {
  isLogin: boolean;
  isMobile: boolean;
}

const Hero: FC<Props> = ({ isLogin, isMobile }) => {
  const dynamicSx: SxProps = isMobile //
    ? { display: { xs: 'flex', md: 'none' }, alignItems: 'center' }
    : { display: { xs: 'none', md: 'flex' }, alignItems: 'center' };

  return (
    <Stack
      sx={{ ...dynamicSx, textDecoration: 'none', color: 'inherit' }}
      href={isLogin ? '/' : '/login'}
      component={Link}
      direction="row"
    >
      <PetsIcon sx={{ mr: 1 }} fontSize="small" />
      <Typography
        noWrap
        variant={isMobile ? 'subtitle1' : 'h6'}
        sx={{
          fontSize: { xs: '16px', sm: '22px' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.2rem',
        }}
      >
        Think Pet
      </Typography>
    </Stack>
  );
};

export default Hero;
