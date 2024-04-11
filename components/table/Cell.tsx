import { FC, ReactNode } from 'react';
import { SxProps, TableCell } from '@mui/material';

interface Props {
  children: ReactNode;
  sx?: SxProps;
  width?: number | string;
}

const Cell: FC<Props> = ({ children, sx, width = 100 }) => {
  return <TableCell sx={{ px: 3, width, ...sx }}>{children}</TableCell>;
};

export default Cell;
