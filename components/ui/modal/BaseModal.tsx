'use client';

import { FC, ReactNode } from 'react';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BaseModal: FC<Props> = ({ open, children, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          bgcolor: 'background.paper',
          boxShadow: 10,
          p: 4,
          borderRadius: 2,
          minWidth: 300,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 3, top: 3 }}>
          <ClearIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export default BaseModal;
