import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import CommonAnyTypeTable from '@/components/table/CommonAnyTypeTable';
import { getNumberToString, getProfit, getProfitRate } from '@/utils/sale';
import ExpandChip from './_components/ExpandChip';

interface Props {
  rows: ClientSaleMenu[];
  selectedClient: ClientSaleMenu | null;
  isLoading: boolean;
  onClickItem: (item: ClientSaleMenu) => void;
  tableScrollRef: Dispatch<SetStateAction<null | HTMLElement>>;
}

const ClientTableContent: FC<Props> = ({
  rows,
  selectedClient,
  isLoading,
  onClickItem,
  tableScrollRef,
}) => {
  const headerList = ['NO', '거래처', '매출', '판매수', '순이익', '순익율', '제품 판매수순'];

  function createTableRow(item: ClientSaleMenu, no: number) {
    const profit = getProfit({
      accWonCost: item.accWonCost,
      accDeliveryCost: item.accDeliveryCost,
      accPayCost: item.accPayCost,
    });

    return [
      no,
      item.name,
      getNumberToString(item.accTotalPayment ?? 0, 'comma'),
      getNumberToString(item.accCount ?? 0, 'comma'),
      getNumberToString(profit ?? 0, 'comma'),
      getNumberToString(getProfitRate(profit ?? 0, item.accTotalPayment ?? 0), 'percent'),
      <ExpandChip
        key={item._id}
        list={item.products.map((p) => {
          const name = p?.name?.split('_')?.[1] ?? '';
          return {
            ...p,
            name,
          };
        })}
      />,
    ];
  }

  const handleClickItem = (clientName: string) => {
    const target = rows.find((item) => item.name === clientName);
    if (!target) return;

    onClickItem(target);
  };

  return (
    <CommonAnyTypeTable
      pointer
      idIndex={1}
      onClickItem={handleClickItem}
      isLoading={isLoading}
      scrollRef={tableScrollRef}
      title=""
      headerList={headerList}
      rowList={rows.map((item, index) => createTableRow(item, index + 1))}
    />
  );
};

export default ClientTableContent;
