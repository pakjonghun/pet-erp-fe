'use client';

import { FC, ReactNode } from 'react';
import { Modal, SxProps } from '@mui/material';
import PopupContainer from './ModalContainer';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  sx?: SxProps;
}

const BaseModal: FC<Props> = ({ open, children, onClose, sx }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <PopupContainer
        sx={{
          overflow: 'auto',
          maxHeight: '90vh',
          minWidth: {
            xs: 380,
            md: 800,
          },
          ...sx,
        }}
        onClose={onClose}
      >
        {children}
      </PopupContainer>
    </Modal>
  );
};

export default BaseModal;
