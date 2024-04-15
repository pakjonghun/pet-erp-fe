'use client';

import { FC, ReactNode } from 'react';
import { AppBar, Typography } from '@mui/material';

interface Props {
  title: string;
  children?: ReactNode;
}

const SubHeader: FC<Props> = ({ title, children }) => {
  return (
    <AppBar
      sx={{
        color: 'black',
        bgcolor: 'primary.light',
        boxShadow: 1,
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
