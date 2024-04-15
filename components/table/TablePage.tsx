import { Paper, SxProps } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sx?: SxProps;
}

const TablePage: FC<Props> = ({ children, sx }) => {
  return (
    <Paper
      sx={{
        mx: 3,
        mt: 3,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};

export default TablePage;
