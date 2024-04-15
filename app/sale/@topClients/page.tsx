'use client';

import { useTopClients } from '@/api/graphql/hooks/client/useTopClients';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { getKCWFormat, getNumberWithComma } from '@/util';
import TableTitle from '@/components/ui/typograph/TableTitle';
import HeadCell from '@/components/table/HeadCell';
import TablePage from '@/components/table/TablePage';
import { TABLE_MAX_HEIGHT } from '@/constants';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';

const TopClients = () => {
  const { data } = useTopClients();
  const rows = data?.topClients ?? [];
  const isEmpty = data?.topClients.length === 0;
  return (
    <TablePage>
      <TableTitle title={`BEST 거래처`} />
      <ScrollTableContainer sx={{ maxHeight: `${TABLE_MAX_HEIGHT + 71.98}px` }}>
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
              <TableRow hover key={row.name}>
                <Cell>{row.name}</Cell>
                <Cell>{getNumberWithComma(row.accCount)}</Cell>
                <Cell>{getKCWFormat(row.accPayCost)}</Cell>
                <Cell>{getKCWFormat(row.accProfit)}</Cell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default TopClients;
