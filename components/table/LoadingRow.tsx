import { CircularProgress, Collapse, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import CommonLoading from '../ui/loading/CommonLoading';

interface Props {
  isLoading: boolean;
  colSpan: number;
}

const LoadingRow: FC<Props> = ({ isLoading, colSpan }) => {
  if (!isLoading) return <></>;

  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan}>
        <Collapse in={isLoading}>{<CommonLoading />}</Collapse>
      </TableCell>
    </TableRow>
  );
};

export default LoadingRow;
