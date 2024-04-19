import { FC, ReactNode } from 'react';
import { Box, IconButton } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';

interface Props {
  onClose: () => void;
  children: ReactNode;
  isModal?: boolean;
}

const PopupContainer: FC<Props> = ({ children, onClose, isModal = true }) => {
  const modalContainerSx = isModal
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
        bgcolor: 'background.paper',
        boxShadow: 10,
        px: 3,
        py: 2,
        borderRadius: 2,
        minWidth: 300,
      }}
    >
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 3, top: 3 }}>
        <ClearIcon />
      </IconButton>
      {children}
    </Box>
  );
};

export default PopupContainer;
