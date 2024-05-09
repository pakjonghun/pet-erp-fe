import { FC, ReactNode } from 'react';
import { Button, IconButton } from '@mui/material';

interface Props {
  text: string;
  icon: ReactNode;
  onClick: () => void;
  size?: 'small' | 'large' | 'medium';
}

const ActionButton: FC<Props> = ({ text, icon, onClick, size = 'medium' }) => {
  return (
    <>
      <Button
        size={size}
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
        onClick={onClick}
        variant="contained"
        startIcon={icon}
      >
        {text}
      </Button>
      <IconButton
        sx={{
          display: {
            md: 'none',
          },
        }}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </>
  );
};

export default ActionButton;
