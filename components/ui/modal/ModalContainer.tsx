import { ReactNode, forwardRef } from 'react';
import { Box, IconButton, SxProps, Theme } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';

interface Props {
  onClose: () => void;
  children: ReactNode;
  isModal?: boolean;
  sx?: SxProps<Theme>;
}

const PopupContainer = forwardRef<HTMLElement, Props>(
  ({ children, onClose, isModal = true, sx = {} }, ref) => {
    const modalContainerSx: SxProps<Theme> = isModal
      ? {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }
      : {};

    return (
      <Box
        sx={{
          ...modalContainerSx,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          bgcolor: 'background.paper',
          boxShadow: 10,
          px: 3,
          py: 2,
          borderRadius: 2,
          minWidth: 300,
          ...sx,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 3, top: 3 }}>
          <ClearIcon />
        </IconButton>
        <Box sx={{ flex: 1, overflow: 'auto', mt: 4 }}>{children}</Box>
      </Box>
    );
  }
);

PopupContainer.displayName = 'PopupContainer';
export default PopupContainer;
