import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import {
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import LoadingRow from './LoadingRow';
import EmptyRow from './EmptyRow';

interface Props {
  title: string;
  headerList: string[];
  rowList: ReactNode[][];
  scrollRef?: Dispatch<SetStateAction<null | HTMLElement>>;
  isLoading?: boolean;
  onClickItem?: (item: any) => void;
  idIndex?: number;
  sx?: SxProps;
}

const CommonAnyTypeTable: FC<Props> = ({
  title,
  headerList,
  rowList,
  scrollRef,
  isLoading,
  onClickItem,
  idIndex = 0,
  sx,
}) => {
  const isEmpty = !isLoading && rowList.length == 0;
  return (
    <TableContainer sx={{ pr: 3, maxHeight: 1000, overflow: 'auto', ...sx }}>
      <Typography sx={{ mb: 1, fontWeight: 600 }}>{title}</Typography>
      <Table
        stickyHeader
        size="small"
        sx={{
          '& th, & td': {
            border: (theme) => `1px solid ${theme.palette.divider}`,
            py: 1,
            px: 0.4,
            fontSize: {
              xs: 12,
              md: 14,
            },
          },
        }}
      >
        <TableHead>
          {headerList.map((head) => {
            return (
              <TableCell sx={{ textAlign: 'center' }} key={head}>
                {head}
              </TableCell>
            );
          })}
        </TableHead>
        <TableBody>
          {rowList.map((cells, idx) => {
            const isLast = idx + 1 === rowList.length;
            const key = cells.join(', ');
            return (
              <TableRow
                hover
                onClick={!!onClickItem ? () => onClickItem(cells[idIndex]) : () => {}}
                key={key}
                ref={isLast ? scrollRef : null}
              >
                {cells.map((cell, index) => {
                  return (
                    <TableCell
                      sx={{ width: index == 1 ? '20%' : 'auto' }}
                      align={'center'}
                      key={`${key}_column)_${index}`}
                    >
                      {cell}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          {isLoading !== null && <LoadingRow colSpan={headerList.length} isLoading={!!isLoading} />}
          {isEmpty && <EmptyRow colSpan={headerList.length} isEmpty={isEmpty} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonAnyTypeTable;
