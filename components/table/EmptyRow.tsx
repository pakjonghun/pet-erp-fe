import { TableCell, TableRow } from '@mui/material';
import { FC } from 'react';

interface Props {
  isEmpty: boolean;
  colSpan: number;
  message?: string;
}

const EmptyRow: FC<Props> = ({ isEmpty, colSpan, message = '검색된 데이터가 없습니다.' }) => {
  if (isEmpty)
    return (
      <TableRow>
        <TableCell sx={{ border: 'none' }} colSpan={colSpan} align="center">
          {message}
        </TableCell>
      </TableRow>
    );

  return <></>;
};

export default EmptyRow;
