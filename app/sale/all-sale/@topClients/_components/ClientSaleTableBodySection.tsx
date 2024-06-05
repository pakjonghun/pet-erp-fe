'use client';

import { FC } from 'react';
import { SaleInfos } from '@/http/graphql/codegen/graphql';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { TableBody, TableRow } from '@mui/material';
import SaleTableCell from '@/components/table/SaleTableCell';
import { getProfitRate } from '@/utils/sale';
import { CommonListProps } from '@/types';
import { CommonTableBody } from '@/components/commonStyles';

interface Props extends CommonListProps<SaleInfos> {}

const ClientSaleTableBodySection: FC<Props> = ({
  data,
  isEmpty,
  isLoading,
  scrollRef,
}) => {
  return (
    <CommonTableBody>
      <EmptyRow colSpan={5} isEmpty={isEmpty} />
      {data.map((row, index) => {
        const isLast = index === data.length - 1;
        return (
          <TableRow
            hover
            // ref={isLast ? scrollRef : null}
            key={index}
          >
            <Cell sx={{ minWidth: 200 }}>{row.name}</Cell>
            <SaleTableCell
              current={row?.accCount ?? 0}
              previous={row.prevAccCount ?? 0}
              numberType="comma"
            />
            <SaleTableCell
              current={row.accPayCost ?? 0}
              previous={row.prevAccPayCost ?? 0}
            />
            <SaleTableCell
              current={row.accProfit ?? 0}
              previous={row.prevAccProfit ?? 0}
            />
            <SaleTableCell
              numberType="percent"
              current={getProfitRate(row?.accProfit ?? 0, row?.accPayCost ?? 0)}
              previous={getProfitRate(
                row?.prevAccProfit ?? 0,
                row?.prevAccPayCost ?? 0
              )}
            />
          </TableRow>
        );
      })}
    </CommonTableBody>
  );
};

export default ClientSaleTableBodySection;
