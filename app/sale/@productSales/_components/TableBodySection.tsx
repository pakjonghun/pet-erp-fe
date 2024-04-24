'use client';

import { FC } from 'react';
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import { useProductSales } from '@/http/graphql/hooks/product/useProductSaleList';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { getKCWFormat } from '@/util';
import { TableBody, TableRow, Stack, Chip } from '@mui/material';

interface Props {
  keyword: string;
  setSelectedProductSale: (item: ProductSaleData) => void;
}

const TableBodySection: FC<Props> = ({ keyword, setSelectedProductSale }) => {
  const { data, networkStatus, fetchMore, refetch } = useProductSales({
    keywordTarget: 'name',
    keyword,
    limit: LIMIT,
    skip: 0,
  });

  const rows = data?.productSales.data ?? [];
  const isEmpty = rows.length === 0;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (networkStatus != 1 && networkStatus != 3) {
        const totalCount = data?.productSales.totalCount;
        if (totalCount != null && totalCount > rows.length) {
          fetchMore({
            variables: {
              productSalesInput: {
                keywordTarget: 'name',
                keyword,
                limit: LIMIT,
                skip: rows.length,
              },
            },
          });
        }
      }
    }
  };
  const scrollRef = useInfinityScroll({ callback });

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
            <Cell>{getKCWFormat(row.today?.accPayCost ?? 0)}</Cell>
            <Cell>{getKCWFormat(row.thisWeek?.accPayCost ?? 0)}</Cell>
            <Cell>{getKCWFormat(row.lastWeek?.accPayCost ?? 0)}</Cell>
            <Cell>{getKCWFormat(row.thisMonth?.accPayCost ?? 0)}</Cell>
            <Cell sx={{ width: '30%' }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {row.clients.slice(0, 5).map((client) => (
                  <Chip
                    key={`${client._id.mallId}_${client._id.productCode}`}
                    label={client._id.mallId}
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Cell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodySection;
