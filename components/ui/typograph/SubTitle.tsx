import { Typography } from '@mui/material';
import React, { FC } from 'react';

interface Props {
  title: string;
}

const SubTitle: FC<Props> = ({ title }) => {
  return (
    <Typography variant="h4" component="h4" sx={{ fontWeight: 600, p: 3, pb: 1 }}>
      {title}
    </Typography>
  );
};

export default SubTitle;
