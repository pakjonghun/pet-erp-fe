import { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

interface Props {
  label: string;
  text: ReactNode;
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
