import { PlusOneOutlined } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { FC } from 'react';

interface Props {
  text: string;
  onClick: () => void;
}

const CreateButton: FC<Props> = ({ text, onClick }) => {
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
        startIcon={<PlusOneOutlined />}
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
        <PlusOneOutlined />
      </IconButton>
    </>
  );
};

export default CreateButton;
