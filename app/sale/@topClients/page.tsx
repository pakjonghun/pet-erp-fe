'use client';

import { useTopClients } from '@/api/graphql/hooks/client/useTopClients';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, alpha } from '@mui/material';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { getKCWFormat, getNumberWithComma } from '@/util';
import TableTitle from '@/components/ui/typograph/TableTitle';
import HeadCell from '@/components/table/HeadCell';

const TopClients = () => {
  const { data } = useTopClients();
  const rows = data?.topClients ?? [];
  const isEmpty = data?.topClients.length === 0;
  return (
    <Paper sx={{ m: 2, pt: 2, pb: 5, mt: 3 }}>
      <TableTitle title={`BEST 거래처`} />
      <TableContainer
        sx={{
          width: '100%',
          overflow: 'auto',
          maxHeight: 1000,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow hover>
              <HeadCell text="이름" />
              <HeadCell text="수량" />
              <HeadCell text="매출" />
              <HeadCell text="수익" />
            </TableRow>
          </TableHead>
          <TableBody>
            <EmptyRow colSpan={4} isEmpty={isEmpty} />
            {rows.map((row) => (
              <TableRow
                sx={{
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.light, 0.5),
                  },
                }}
                key={row.name}
              >
                <Cell>{row.name}</Cell>
                <Cell>{getNumberWithComma(row.accCount)}</Cell>
                <Cell>{getKCWFormat(row.accPayCost)}</Cell>
                <Cell>{getKCWFormat(row.accProfit)}</Cell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopClients;
