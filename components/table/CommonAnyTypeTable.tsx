import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import {
  alpha,
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
import { MIN_MARGIN } from '@/constants';

interface Props {
  title: string;
  headerList: string[];
  rowList: ReactNode[][];
  scrollRef?: Dispatch<SetStateAction<null | HTMLElement>>;
  isLoading?: boolean;
  onClickItem?: (item: any) => void;
  idIndex?: number;
  sx?: SxProps;
  hover?: boolean;
  pointer?: boolean;
}

const CommonAnyTypeTable: FC<Props> = ({
  title,
  headerList,
  rowList,
  scrollRef,
  isLoading,
  onClickItem,
  idIndex = 0,
  hover = true,
  pointer = false,
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

            const hasError = cells.some((item) => item == '알수없음');
            const profitRateIndex = headerList.findIndex((item) => item == '순익율');
            const shouldCheck =
              profitRateIndex != -1 && (cells[profitRateIndex] as string)?.includes('-');

            const profitRateNumber =
              profitRateIndex != -1 && (cells[profitRateIndex] as string).match(/\d+/)?.[0];

            const isBelowTween = Number(profitRateNumber) < MIN_MARGIN;

            return (
              <TableRow
                hover={hover}
                key={key}
                ref={isLast ? scrollRef : null}
                sx={{
                  cursor: pointer ? 'pointer' : 'auto',
                  bgcolor: (theme) => {
                    if (hasError) {
                      return alpha(theme.palette.error.light, 0.2);
                    }

                    if (shouldCheck) {
                      return alpha(theme.palette.warning.light, 0.2);
                    }

                    if (isBelowTween) {
                      return alpha(theme.palette.warning.light, 0.2);
                    }

                    return 'inherit';
                  },
                }}
              >
                {cells.map((cell, index) => {
                  const isLast = index === cells.length - 1;
                  return (
                    <TableCell
                      onClick={() => {
                        if (isLast) return;
                        !!onClickItem && onClickItem(cells[idIndex]);
                      }}
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
