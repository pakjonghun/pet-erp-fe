import { FC } from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  toggleOpen: () => void;
}

const MobileNavTrigger: FC<Props> = ({ toggleOpen }) => {
  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        onClick={toggleOpen}
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default MobileNavTrigger;
