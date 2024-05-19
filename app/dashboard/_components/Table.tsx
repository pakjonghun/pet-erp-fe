import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { SaleInfos } from '@/http/graphql/codegen/graphql';
import EmptyRow from '@/components/table/EmptyRow';
import DashboardTableBody from './TableBody';

interface Props {
  title: string;
  saleInfos: SaleInfos[];
}

const DashboardTable: FC<Props> = ({ saleInfos, title }) => {
  const isEmpty = saleInfos.length === 0;
  return (
    <TableContainer component={Paper} sx={{ p: 3 }}>
      <Typography sx={{ my: 1, pl: 1 }} variant="h5">
        {title}
      </Typography>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
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
    </TableContainer>
  );
};

export default DashboardTable;
