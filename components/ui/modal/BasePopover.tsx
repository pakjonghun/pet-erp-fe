import { FC, ReactNode } from 'react';
import PopupContainer from '@/components/ui/modal/ModalContainer';

import { Popover } from '@mui/material';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  onClose: () => void;
  children: ReactNode;
}

const BasePopover: FC<Props> = ({ open, anchorEl, position, onClose, children }) => {
  return (
    <Popover
      anchorReference="anchorPosition"
      onClose={onClose}
      anchorPosition={position}
      open={open}
      anchorEl={anchorEl}
    >
      <PopupContainer isModal={false} onClose={onClose}>
        {children}
      </PopupContainer>
    </Popover>
  );
};

export default BasePopover;
