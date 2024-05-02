'use client';

import { FC } from 'react';
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { TableBody, TableRow, Stack, Chip, SxProps } from '@mui/material';
import SaleTableCell from '@/components/table/SaleTableCell';
import { getProfitRate } from '@/utils/sale';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<ProductSaleData> {
  setSelectedProductSale: (product: ProductSaleData | null) => void;
}

const TableBodySection: FC<Props> = ({
  data,
  isEmpty,
  isLoading,
  scrollRef,
  setSelectedProductSale,
}) => {
  return (
    <TableBody>
      <EmptyRow colSpan={6} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const row = item as unknown as ProductSaleData;
        const isLast = index === data.length - 1;
        return (
          <TableRow
            onClick={() => setSelectedProductSale(row)}
            hover
            // ref={isLast ? scrollRef : null}
            key={index}
          >
            <Cell sx={{ minWidth: 200 }}>{row.name}</Cell>
            <SaleTableCell
              current={row.sales?.accCount ?? 0}
              previous={row.sales?.prevAccCount ?? 0}
              numberType="comma"
            />
            <SaleTableCell
              current={row.sales?.accPayCost ?? 0}
              previous={row.sales?.prevAccPayCost ?? 0}
            />
            <SaleTableCell
              current={row.sales?.accProfit ?? 0}
              previous={row.sales?.prevAccProfit ?? 0}
            />
            <SaleTableCell
              numberType="percent"
              current={getProfitRate(row?.sales?.accProfit ?? 0, row?.sales?.accPayCost ?? 0)}
              previous={getProfitRate(
                row?.sales?.prevAccProfit ?? 0,
                row?.sales?.prevAccPayCost ?? 0
              )}
            />
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
