import { CircularProgress, Collapse, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';

interface Props {
  isLoading: boolean;
  colSpan: number;
}

const LoadingRow: FC<Props> = ({ isLoading, colSpan }) => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan}>
        <Collapse in={isLoading}>{<CircularProgress />}</Collapse>
      </TableCell>
    </TableRow>
  );
};

export default LoadingRow;
