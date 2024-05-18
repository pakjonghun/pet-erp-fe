import { FC, ReactNode } from 'react';
import { SxProps, Typography } from '@mui/material';

interface Props {
  label: string;
  text: ReactNode;
  sx?: SxProps;
}

const LabelText: FC<Props> = ({ label, text, sx }) => {
  return (
    <Typography
      sx={{ display: 'inline-block', whiteSpace: 'break-spaces', ...sx }}
      component="span"
    >
      <Typography component="span" sx={{ fontWeight: 800, mr: 1 }}>
        {label}
      </Typography>
      {text}
    </Typography>
  );
};

export default LabelText;
