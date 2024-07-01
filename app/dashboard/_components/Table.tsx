import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack, Typography } from '@mui/material';
import { SaleInfos } from '@/http/graphql/codegen/graphql';
import EmptyRow from '@/components/table/EmptyRow';
import DashboardTableBody from './TableBody';
import { Add } from '@mui/icons-material';
import { TABLE_HEIGHT } from '../constants';
import CommonLoading from '@/components/ui/loading/CommonLoading';

interface Props {
  title: string;
  saleInfos: SaleInfos[];
  isLoading: boolean;
  fetchMoreData: () => void;
  hasMore: boolean;
}

const DashboardTable: FC<Props> = ({ saleInfos, title, fetchMoreData, hasMore, isLoading }) => {
  const isEmpty = saleInfos.length === 0;

  return (
    <TableContainer component={Paper} sx={{ maxHeight: TABLE_HEIGHT }}>
      <Typography
        sx={{ my: 1, p: 3, bgcolor: 'inherit' }}
        variant="body1"
        fontWeight="bold"
        color="GrayText"
      >
        {title}
      </Typography>
      <Table stickyHeader sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }} align="right">
              매출
            </TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }} align="right">
              판매수량
            </TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }} align="right">
              수익
            </TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }} align="right">
              수익율
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <EmptyRow colSpan={5} isEmpty={isEmpty} />
          <DashboardTableBody saleInfos={saleInfos} />
        </TableBody>
      </Table>
      {hasMore && (
        <Stack sx={{ m: 2 }}>
          <Button
            disabled={isLoading}
            onClick={fetchMoreData}
            variant="contained"
            sx={{ whiteSpace: 'nowrap', ml: 'auto' }}
            endIcon={isLoading ? <CommonLoading /> : <Add />}
          >
            더보기
          </Button>
        </Stack>
      )}
    </TableContainer>
  );
};

export default DashboardTable;
