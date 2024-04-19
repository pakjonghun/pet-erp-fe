import { FC, ReactNode } from 'react';
import { Button, IconButton } from '@mui/material';

interface Props {
  text: string;
  icon: ReactNode;
  onClick: () => void;
}

const ActionButton: FC<Props> = ({ text, icon, onClick }) => {
  return (
    <>
      <Button
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
