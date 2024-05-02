'use client';

import { useTopClients } from '@/http/graphql/hooks/client/useTopClients';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import TableTitle from '@/components/ui/typograph/TableTitle';
import HeadCell from '@/components/table/HeadCell';
import TablePage from '@/components/table/TablePage';
import { LIMIT, TABLE_MAX_HEIGHT } from '@/constants';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useReactiveVar } from '@apollo/client';
import { clientTotal, saleRange } from '@/store/saleStore';
import { useEffect } from 'react';
import { useDashboardClients } from '@/http/graphql/hooks/client/useDashboardClients';
import ClientSaleTableBodySection from './_components/ClientSaleTableBodySection';
import ClientSaleCards from './_components/ClientSaleCards';

const TopClients = () => {
  const { from, to } = useReactiveVar(saleRange);
  const { data, fetchMore, networkStatus } = useDashboardClients({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const rows = data?.dashboardClients ?? [];
  const isLoading = networkStatus == 1 || networkStatus == 2 || networkStatus == 3;
  const isEmpty = !isLoading && rows.length === 0;
  const { totalCount, totalPayCost, totalProfit } = useReactiveVar(clientTotal);

  // const callback: IntersectionObserverCallback = (entries) => {
  //   if (entries[0].isIntersecting) {
  //     if (isLoading) return;

  //     const totalCount = data?.dashboardClients?.totalCount;
  //     if (totalCount != null && totalCount > rows.length) {
  //       fetchMore({
  //         variables: {
  //           topClientInput: {
  //             skip: rows.length,
  //             limit: LIMIT,
  //             from: from.toISOString(),
  //             to: to.toISOString(),
  //           },
  //         },
  //       });
  //     }
  //   }
  // };
  // const scrollRef = useInfinityScroll({ callback });

  useEffect(() => {
    const totalData = rows.reduce(
      (acc, cur) => {
        return {
          totalCount: acc.totalCount + (cur?.accCount ?? 0),
          totalPayCost: acc.totalPayCost + (cur?.accPayCost ?? 0),
          totalProfit: acc.totalProfit + (cur?.accProfit ?? 0),
        };
      },
      { totalCount: 0, totalPayCost: 0, totalProfit: 0 }
    );

    clientTotal(totalData);
  }, [data?.dashboardClients]);

  return (
    <TablePage>
      <TableTitle title={`TOP10 거래처`} />
      <ClientSaleCards
        sx={{
          display: {
            md: 'none',
          },
        }}
        data={rows}
        isEmpty={isEmpty}
        isLoading={isLoading}
        scrollRef={null}
      />
      <ScrollTableContainer
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
          maxHeight: `calc(${TABLE_MAX_HEIGHT} + 71.98px)`,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow hover>
              <HeadCell text="이름" />
              <HeadCell
                text={
                  <>
                    판매수량
                    <br />({getNumberWithComma(totalCount)})
                  </>
                }
              />
              <HeadCell
                text={
                  <>
                    매출
                    <br />({getKCWFormat(totalPayCost)})
                  </>
                }
              />

              <HeadCell
                text={
                  <>
                    수익
                    <br />({getKCWFormat(totalProfit)})
                  </>
                }
              />
              <HeadCell
                text={
                  <>
                    수익율
                    <br />({getKCWFormat(totalProfit)})
                  </>
                }
              />
            </TableRow>
          </TableHead>

          <ClientSaleTableBodySection
            data={rows}
            isEmpty={isEmpty}
            isLoading={isLoading}
            scrollRef={null}
          />
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default TopClients;
