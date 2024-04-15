import { FC, ReactNode } from 'react';
import { SxProps, TableCell, TableCellProps, Typography } from '@mui/material';

interface Props {
  text: ReactNode;
  tableCellProp?: TableCellProps;
  sx?: SxProps;
  width?: number | string;
}

const HeadCell: FC<Props> = ({ text, sx, width = 100, tableCellProp = {} }) => {
  return (
    <TableCell {...tableCellProp} sx={{ px: 3, width, ...sx }}>
      <Typography variant="button" sx={{ whiteSpace: 'noWrap', fontWeight: 800 }}>
        {text}
      </Typography>
    </TableCell>
  );
};

export default HeadCell;
