import { PlusOneOutlined } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React, { FC } from 'react';

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
            sm: 'none',
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
