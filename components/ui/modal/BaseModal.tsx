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
      <PopupContainer sx={sx} onClose={onClose}>
        {children}
      </PopupContainer>
    </Modal>
  );
};

export default BaseModal;
