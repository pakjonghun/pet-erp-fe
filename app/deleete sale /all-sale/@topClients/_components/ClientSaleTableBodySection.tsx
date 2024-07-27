'use client';

import { FC } from 'react';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { TableRow } from '@mui/material';
import SaleTableCell from '@/components/table/SaleTableCell';
import { getProfitRate } from '@/utils/sale';
import { CommonListProps } from '@/types';
import { CommonTableBody } from '@/components/commonStyles';
import { useReactiveVar } from '@apollo/client';
import { showPrevSaleData } from '@/store/saleStore';
import LoadingRow from '@/components/table/LoadingRow';

interface Props extends CommonListProps<ClientSaleMenu> {
  setSelectedClient: (selectedClient: null | ClientSaleMenu) => void;
}

const ClientSaleTableBodySection: FC<Props> = ({
  data,
  isEmpty,
  isLoading,
  scrollRef,
  setSelectedClient,
}) => {
  const isShowSalePrevData = useReactiveVar(showPrevSaleData);

  return (
    <CommonTableBody>
      <EmptyRow colSpan={5} isEmpty={isEmpty} />
      <LoadingRow colSpan={5} isLoading={isLoading} />
      {data.map((row, index) => {
        const isLast = index === data.length - 1;
        const currentProfit =
          (row.accPayCost ?? 0) - (row.accWonCost ?? 0) - (row.accDeliveryCost ?? 0);
        const prevProfit =
          (row.prevAccPayCost ?? 0) - (row.prevAccWonCost ?? 0) - (row.prevAccDeliveryCost ?? 0);
        return (
          //@ts-ignore
          <TableRow
            onClick={() => setSelectedClient(row)}
            hover
            ref={isLast ? scrollRef : null}
            key={index}
          >
            <Cell sx={{ minWidth: 200 }}>{row.name}</Cell>
            <SaleTableCell
              isShowPrevData={isShowSalePrevData}
              current={row?.accCount ?? 0}
              previous={row.prevAccCount ?? 0}
              numberType="comma"
            />
            <SaleTableCell
              isShowPrevData={isShowSalePrevData}
              current={row.accTotalPayment ?? 0}
              previous={row.prevAccTotalPayment ?? 0}
            />
            <SaleTableCell
              isShowPrevData={isShowSalePrevData}
              current={currentProfit}
              previous={prevProfit}
            />
            <SaleTableCell
              isShowPrevData={isShowSalePrevData}
              numberType="percent"
              current={getProfitRate(currentProfit, row?.accPayCost ?? 0)}
              previous={getProfitRate(prevProfit, row?.prevAccPayCost ?? 0)}
            />
          </TableRow>
        );
      })}
    </CommonTableBody>
  );
};

export default ClientSaleTableBodySection;
