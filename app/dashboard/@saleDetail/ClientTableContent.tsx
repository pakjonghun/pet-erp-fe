import { Chip, Stack } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import CommonAnyTypeTable from '@/components/table/CommonAnyTypeTable';
import { getNumberToString, getProfit, getProfitRate } from '@/utils/sale';

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
  const headerList = ['NO', '거래처', '매출', '판매수', '순이익', '순익율', 'TOP3 제품'];

  const handleClickItem = (clientName: string) => {
    const target = rows.find((item) => item.name === clientName);
    if (!target) return;

    onClickItem(target);
  };

  return (
    <CommonAnyTypeTable
      idIndex={1}
      onClickItem={handleClickItem}
      isLoading={isLoading}
      scrollRef={tableScrollRef}
      sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
      }}
      title=""
      headerList={headerList}
      rowList={rows.map((item, index) => createTableRow(item, index + 1))}
    />
  );
};

export default ClientTableContent;

function createTableRow(item: ClientSaleMenu, no: number) {
  const profit = getProfit({
    accCount: item.accWonCost,
    accDeliveryCost: item.accDeliveryCost,
    accPayCost: item.accPayCost,
  });

  return [
    no,
    item.name,
    getNumberToString(item.accTotalPayment ?? 0, 'comma'),
    getNumberToString(item.accCount ?? 0, 'comma'),
    getNumberToString(profit ?? 0, 'comma'),
    getNumberToString(getProfitRate(profit ?? 0, item.accPayCost ?? 0), 'percent'),
    <Stack
      sx={{
        alignContent: 'flex-start',
        // justifyContent: 'center',
        flexDirection: {
          xs: 'column',
          // lg: 'row',
        },
        flexWrap: 'wrap',
        gap: 0.3,
        width: 'fit-content',
      }}
      key={`${no}_${item.name}`}
    >
      {item.products.slice(0, 3).map((p, i) => {
        return (
          <Chip
            size="small"
            sx={{ borderRadius: 1, width: 'fit-content' }}
            key={Object.values(p).join(', ')}
            label={`${i + 1} ${p.name}(${p.accCount}EA)`}
          />
        );
      })}
    </Stack>,
  ];
}
