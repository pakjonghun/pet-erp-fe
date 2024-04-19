import { Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  text: string;
}

const ModalTitle: FC<Props> = ({ text }) => {
  return (
    <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
      {text}
    </Typography>
  );
};

export default ModalTitle;
