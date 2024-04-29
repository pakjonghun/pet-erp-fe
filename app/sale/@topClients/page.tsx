'use client';

import { useTopClients } from '@/http/graphql/hooks/client/useTopClients';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { getKCWFormat, getNumberWithComma } from '@/util';
import TableTitle from '@/components/ui/typograph/TableTitle';
import HeadCell from '@/components/table/HeadCell';
import TablePage from '@/components/table/TablePage';
import { LIMIT, TABLE_MAX_HEIGHT } from '@/constants';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useReactiveVar } from '@apollo/client';
import { saleRange } from '@/store/saleRange';

const TopClients = () => {
  const { from, to } = useReactiveVar(saleRange);
  const { data, fetchMore, networkStatus } = useTopClients({
    limit: LIMIT,
    skip: 0,
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const rows = data?.topClients?.data ?? [];
  const isEmpty = rows.length === 0;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (networkStatus != 1 && networkStatus != 3) {
        const totalCount = data?.topClients?.totalCount;
        if (totalCount != null && totalCount > rows.length) {
          fetchMore({
            variables: {
              topClientInput: {
                skip: rows.length,
                limit: LIMIT,
                from: from.toISOString(),
                to: to.toISOString(),
              },
            },
          });
        }
      }
    }
  };
  const scrollRef = useInfinityScroll({ callback });

  return (
    <TablePage>
      <TableTitle title={`BEST 거래처`} />
      <ScrollTableContainer sx={{ maxHeight: `calc(${TABLE_MAX_HEIGHT} + 71.98px)` }}>
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
            {rows.map((row, index) => {
              const isLast = index === rows.length - 1;
              return (
                <TableRow ref={isLast ? scrollRef : null} hover key={row.name}>
                  <Cell>{row.name}</Cell>
                  <Cell>{getNumberWithComma(row.accCount)}</Cell>
                  <Cell>{getKCWFormat(row.accPayCost)}</Cell>
                  <Cell>{getKCWFormat(row.accProfit)}</Cell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default TopClients;
