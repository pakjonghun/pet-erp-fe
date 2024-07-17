'use client';

import { TableHead } from '@mui/material';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import TableTitle from '@/components/ui/typograph/TableTitle';
import HeadCell from '@/components/table/HeadCell';
import TablePage from '@/components/table/TablePage';
import { LIMIT } from '@/constants';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useReactiveVar } from '@apollo/client';
import { clientTotal, saleRange } from '@/store/saleStore';
import { useEffect, useState } from 'react';
import ClientSaleTableBodySection from './_components/ClientSaleTableBodySection';
import ClientSaleCards from './_components/ClientSaleCards';
import { CommonHeaderRow, CommonTable } from '@/components/commonStyles';
import { useSaleMenuClients } from '@/http/graphql/hooks/client/useSaleMenuClients';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import { getProfitRate } from '@/utils/sale';
import ClientSaleModal from './_components/ClientSaleModa';

const TopClients = () => {
  const { from, to } = useReactiveVar(saleRange);
  const { data, fetchMore, networkStatus } = useSaleMenuClients({
    from: from.toISOString(),
    to: to.toISOString(),
    limit: LIMIT,
    skip: 0,
  });

  const rows = (data?.saleMenuClients.data as ClientSaleMenu[]) ?? [];
  const isLoading = networkStatus == 1 || networkStatus == 2 || networkStatus == 3;
  const isEmpty = !isLoading && rows.length === 0;
  const { totalCount, totalPayCost, totalProfit, totalPayment } = useReactiveVar(clientTotal);
  const [selectedClient, setSelectedClient] = useState<null | ClientSaleMenu>(null);
  const profitRate = getProfitRate(totalProfit, totalPayCost);

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.saleMenuClients?.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            saleMenuClientsInput: {
              skip: rows.length,
              limit: LIMIT,
              from: from.toISOString(),
              to: to.toISOString(),
            },
          },
        });
      }
    }
  };
  const tableScrollRef = useInfinityScroll({ callback });
  const cardScrollRef = useInfinityScroll({ callback });

  useEffect(() => {
    const totalData = rows.reduce(
      (acc, cur) => {
        const totalProfit =
          (cur.accPayCost ?? 0) - (cur.accWonCost ?? 0) - (cur.accDeliveryCost ?? 0);

        return {
          totalPayment: acc.totalPayment + (cur.accTotalPayment ?? 0),
          totalCount: acc.totalCount + (cur?.accCount ?? 0),
          totalPayCost: acc.totalPayCost + (cur?.accPayCost ?? 0),
          totalProfit: acc.totalProfit + totalProfit,
        };
      },
      { totalCount: 0, totalPayCost: 0, totalProfit: 0, totalPayment: 0 }
    );

    clientTotal(totalData);
  }, [data?.saleMenuClients]);

  return (
    <TablePage sx={{ minHeight: 700 }}>
      {!!selectedClient && (
        <ClientSaleModal
          onClose={() => {
            setSelectedClient(null);
          }}
          open={!!selectedClient}
          selectedClient={selectedClient}
        />
      )}
      <TableTitle sx={{ ml: 2 }} title={`거래처`} />
      <ClientSaleCards
        setSelectedClient={setSelectedClient}
        sx={{
          display: {
            md: 'none',
          },
          mt: 1,
        }}
        data={rows}
        isEmpty={isEmpty}
        isLoading={isLoading}
        scrollRef={cardScrollRef}
      />
      <ScrollTableContainer
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <CommonTable stickyHeader>
          <TableHead>
            <CommonHeaderRow hover>
              <HeadCell text="이름" />
              <HeadCell
                sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
                text={<>판매수량({getNumberWithComma(totalCount)})</>}
              />
              <HeadCell
                sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
                text={<>매출({getKCWFormat(totalPayment)})</>}
              />

              <HeadCell
                sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
                text={<>수익 ({getKCWFormat(totalProfit)})</>}
              />
              <HeadCell
                sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
                text={<>수익율({profitRate}%)</>}
              />
            </CommonHeaderRow>
          </TableHead>

          <ClientSaleTableBodySection
            setSelectedClient={setSelectedClient}
            data={rows}
            isEmpty={isEmpty}
            isLoading={isLoading}
            scrollRef={tableScrollRef}
          />
        </CommonTable>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default TopClients;
