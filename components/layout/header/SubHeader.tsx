'use client';

import { FC, ReactNode } from 'react';
import { AppBar, SxProps, Typography } from '@mui/material';

interface Props {
  title: string;
  sx?: SxProps;
  children?: ReactNode;
}

const SubHeader: FC<Props> = ({ title, children, sx }) => {
  return (
    <AppBar
      sx={{
        color: 'black',
        bgcolor: 'primary.light',
        boxShadow: 1,
        ...sx,
      }}
      position="static"
    >
      <Typography variant="h4" component="h4" sx={{ fontWeight: 600, p: 3, pb: 1 }}>
        {title}
      </Typography>
      {!!children ? children : ''}
    </AppBar>
  );
};

export default SubHeader;
