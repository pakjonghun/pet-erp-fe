import { FC, ReactNode } from 'react';
import { SxProps, TableCell, Typography } from '@mui/material';

interface Props {
  text: ReactNode;
  sx?: SxProps;
  width?: number | string;
}

const HeadCell: FC<Props> = ({ text, sx, width = 100 }) => {
  return (
    <TableCell sx={{ px: 3, width, ...sx }}>
      <Typography variant="button" sx={{ whiteSpace: 'balance', fontWeight: 800 }}>
        {text}
      </Typography>
    </TableCell>
  );
};

export default HeadCell;
