import React, { FC } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { Stack, Typography } from '@mui/material';
import Link from 'next/link';

interface Props {
  isLogin: boolean;
}

const Hero: FC<Props> = ({ isLogin }) => {
  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
      }}
      href={isLogin ? '/' : '/login'}
      component={Link}
      direction="row"
    >
      <PetsIcon sx={{ mr: 1 }} fontSize="small" />
      <Typography
        noWrap
        sx={{
          fontSize: { xs: '15px', sm: '20px' },
          fontFamily: 'monospace',
          fontWeight: 700,
        }}
      >
        Think Pet
      </Typography>
    </Stack>
  );
};

export default Hero;
