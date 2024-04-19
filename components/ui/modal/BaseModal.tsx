'use client';

import { FC, ReactNode } from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PopupContainer from './ModalContainer';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BaseModal: FC<Props> = ({ open, children, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <PopupContainer onClose={onClose}>{children}</PopupContainer>
    </Modal>
  );
};

export default BaseModal;
