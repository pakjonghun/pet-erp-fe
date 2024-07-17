'use client';

import { FC } from 'react';
import { ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { TableRow, Stack, Chip, Typography } from '@mui/material';
import SaleTableCell from '@/components/table/SaleTableCell';
import { getProfitRate } from '@/utils/sale';
import { CommonListProps } from '@/types';
import LoadingRow from '@/components/table/LoadingRow';
import { CommonTableBody } from '@/components/commonStyles';
import { useReactiveVar } from '@apollo/client';
import { showPrevSaleData } from '@/store/saleStore';

interface Props extends CommonListProps<ProductSaleMenu> {
  setSelectedProductSale: (product: ProductSaleMenu | null) => void;
}

const TableBodySection: FC<Props> = ({
  data,
  isEmpty,
  isLoading,
  scrollRef,
  setSelectedProductSale,
}) => {
  const isShowPrevData = useReactiveVar(showPrevSaleData);

  return (
    <CommonTableBody>
      <EmptyRow colSpan={6} isEmpty={isEmpty} />
      {data.map((row, index) => {
        const isLast = index === data.length - 1;

        const profit = (row.accPayCost ?? 0) - (row.accDeliveryCost ?? 0);
        const prevProfit = (row.prevAccPayCost ?? 0) - (row.prevAccDeliveryCost ?? 0);

        return (
          //@ts-ignore
          <TableRow
            onClick={() => setSelectedProductSale(row)}
            hover
            ref={isLast ? scrollRef : null}
            key={index}
          >
            <Cell
            // sx={{ minWidth: 200 }}
            >
              {row.name}
              <br />
              <Typography color="gray" variant="caption">
                {row.code}
              </Typography>
            </Cell>
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              current={row.accCount ?? 0}
              previous={row.prevAccCount ?? 0}
              numberType="comma"
            />
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              current={row.accTotalPayment ?? 0}
              previous={row.prevAccTotalPayment ?? 0}
            />
            <SaleTableCell isShowPrevData={isShowPrevData} current={profit} previous={prevProfit} />
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              numberType="percent"
              current={getProfitRate(prevProfit, row?.accPayCost ?? 0)}
              previous={getProfitRate(prevProfit, row?.prevAccPayCost ?? 0)}
            />
            <Cell sx={{ width: '50%' }}>
              <Stack direction="row" flexWrap="wrap" gap={0}>
                {row.clients.map((client) => {
                  if (!!client.name) {
                    return (
                      <Chip
                        size="small"
                        key={`${client.name}_${client.__typename}`}
                        label={client.name}
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
      <LoadingRow colSpan={6} isLoading={isLoading} />
    </CommonTableBody>
  );
};

export default TableBodySection;
