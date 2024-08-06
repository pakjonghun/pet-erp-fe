import { FC, ReactNode } from 'react';
import { SxProps, TableCell, TableCellProps, Typography } from '@mui/material';
import SortLabel from '../ui/label/SortLabel';
import { Order } from '@/http/graphql/codegen/graphql';

interface Props {
  text: ReactNode;
  sortable?: boolean;
  order?: Order;
  tableCellProp?: TableCellProps;
  sx?: SxProps;
  width?: number | string;
  onSort?: () => void;
}

const HeadCell: FC<Props> = ({
  text,
  sx,
  sortable = false,
  width = 'auto',
  tableCellProp = {},
  order,
  onSort,
}) => {
  return (
    <TableCell {...tableCellProp} sx={{ px: 3, width, ...sx }}>
      {sortable && onSort ? (
        <SortLabel order={order} onSort={onSort}>
          <Typography variant="button" sx={{ whiteSpace: 'noWrap', fontWeight: 800 }}>
            {text}
          </Typography>
        </SortLabel>
      ) : (
        <Typography variant="button" sx={{ whiteSpace: 'noWrap', fontWeight: 800 }}>
          {text}
        </Typography>
      )}
    </TableCell>
  );
};

export default HeadCell;
