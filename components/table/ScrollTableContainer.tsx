import { FC, ReactNode } from 'react';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { SxProps, TableContainer } from '@mui/material';

interface Props {
  children: ReactNode;
  sx?: SxProps;
}

const ScrollTableContainer: FC<Props> = ({ children, sx }) => {
  return (
    <TableContainer
      sx={{
        overflow: 'auto',
        maxHeight: TABLE_MAX_HEIGHT,
        px: 2,
        ...sx,
      }}
    >
      {children}
    </TableContainer>
  );
};

export default ScrollTableContainer;
