'use client';

import { FC } from 'react';
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { TableRow, Stack, Chip } from '@mui/material';
import SaleTableCell from '@/components/table/SaleTableCell';
import { getProfitRate } from '@/utils/sale';
import { CommonListProps } from '@/types';
import LoadingRow from '@/components/table/LoadingRow';
import { CommonTableBody } from '@/components/commonStyles';
import { useReactiveVar } from '@apollo/client';
import { showPrevSaleData } from '@/store/saleStore';

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
  const isShowPrevData = useReactiveVar(showPrevSaleData);

  return (
    <CommonTableBody>
      <EmptyRow colSpan={6} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const row = item as unknown as ProductSaleData;
        const isLast = index === data.length - 1;

        return (
          //@ts-ignore
          <TableRow
            onClick={() => setSelectedProductSale(row)}
            hover
            ref={isLast ? scrollRef : null}
            key={index}
          >
            <Cell sx={{ minWidth: 200 }}>{row.name}</Cell>
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              current={row.sales?.accCount ?? 0}
              previous={row.sales?.prevAccCount ?? 0}
              numberType="comma"
            />
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              current={row.sales?.accPayCost ?? 0}
              previous={row.sales?.prevAccPayCost ?? 0}
            />
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              current={row.sales?.accProfit ?? 0}
              previous={row.sales?.prevAccProfit ?? 0}
            />
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              numberType="percent"
              current={getProfitRate(
                row?.sales?.accProfit ?? 0,
                row?.sales?.accPayCost ?? 0
              )}
              previous={getProfitRate(
                row?.sales?.prevAccProfit ?? 0,
                row?.sales?.prevAccPayCost ?? 0
              )}
            />
            <Cell sx={{ width: '30%' }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {row.clients.map((client) => {
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
      <LoadingRow colSpan={6} isLoading={isLoading} />
    </CommonTableBody>
  );
};

export default TableBodySection;
