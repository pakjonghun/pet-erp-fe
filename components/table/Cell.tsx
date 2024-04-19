import { FC, MouseEvent, ReactNode } from 'react';
import { SxProps, TableCell } from '@mui/material';

interface Props {
  children: ReactNode;
  sx?: SxProps;
  width?: number | string;
  onClick?: (event: MouseEvent<HTMLTableCellElement>) => void;
}

const Cell: FC<Props> = ({ children, sx, width = 100, onClick }) => {
  return (
    <TableCell onClick={onClick} sx={{ px: 3, width, ...sx }}>
      {children}
    </TableCell>
  );
};

export default Cell;
