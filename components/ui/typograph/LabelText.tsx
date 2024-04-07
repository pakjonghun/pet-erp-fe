import { Typography } from '@mui/material';
import React, { FC } from 'react';

interface Props {
  label: string;
  text: string;
}

const LabelText: FC<Props> = ({ label, text }) => {
  return (
    <Typography sx={{ display: 'inline-block' }} component="span">
      <Typography component="span" sx={{ fontWeight: 800, mr: 1 }}>
        {label}
      </Typography>
      {text}
    </Typography>
  );
};

export default LabelText;
