'use client';

import { FC, useEffect } from 'react';
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import { useProductSales } from '@/http/graphql/hooks/product/useProductSaleList';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import { TableBody, TableRow, Stack, Chip } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { saleRange, saleTotal } from '@/store/saleStore';

interface Props {
  keyword: string;
  setSelectedProductSale: (item: ProductSaleData) => void;
}

const TableBodySection: FC<Props> = ({ keyword, setSelectedProductSale }) => {
  const { from, to } = useReactiveVar(saleRange);
  const { data, networkStatus, fetchMore } = useProductSales({
    keywordTarget: 'name',
    keyword,
    limit: LIMIT,
    skip: 0,
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const rows = (data?.productSales?.data as ProductSaleData[]) ?? [];
  const isEmpty = rows.length === 0;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (networkStatus != 1 && networkStatus != 3) {
        const totalCount = data?.productSales?.totalCount ?? 0;
        if (totalCount != null && totalCount > rows.length) {
          fetchMore({
            variables: {
              productSalesInput: {
                keywordTarget: 'name',
                keyword,
                limit: LIMIT,
                skip: rows.length,
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

  useEffect(() => {
    const totalData = rows.reduce(
      (acc, cur) => {
        return {
          totalCount: acc.totalCount + (cur?.sales?.accCount ?? 0),
          totalPayCost: 0 + (cur?.sales?.accPayCost ?? 0),
          totalProfit: 0 + (cur?.sales?.accProfit ?? 0),
        };
      },
      { totalCount: 0, totalPayCost: 0, totalProfit: 0 }
    );

    saleTotal(totalData);
  }, [data?.productSales?.data]);

  return (
    <TableBody>
      <EmptyRow colSpan={6} isEmpty={isEmpty} />
      {rows.map((item, index) => {
        const row = item as unknown as ProductSaleData;
        const isLast = index === rows.length - 1;
        return (
          <TableRow
            onClick={() => setSelectedProductSale(row)}
            hover
            ref={isLast ? scrollRef : null}
            key={index}
          >
            <Cell sx={{ minWidth: 200 }}>{row.name}</Cell>
            <Cell>{getNumberWithComma(row.sales?.accCount ?? 0)}</Cell>
            <Cell>{getKCWFormat(row.sales?.accPayCost ?? 0)}</Cell>
            <Cell>{getKCWFormat(row.sales?.accProfit ?? 0)}</Cell>
            <Cell sx={{ width: '30%' }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {row.clients.slice(0, 5).map((client) => {
                  if (!!client._id?.mallId) {
                    return (
                      <Chip
                        key={`${client._id.mallId}_${client._id.productCode}`}
                        label={client._id.mallId}
                        variant="outlined"
                      />
                    );
                  }
                  return <></>;
                })}
              </Stack>
            </Cell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodySection;
