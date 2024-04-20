'use client';

import { FC, ReactNode } from 'react';
import { Modal } from '@mui/material';
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
