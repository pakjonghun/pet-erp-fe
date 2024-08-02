import { Chip, Stack } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import { ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import CommonAnyTypeTable from '@/components/table/CommonAnyTypeTable';
import { getNumberToString, getProfit, getProfitRate } from '@/utils/sale';

interface Props {
  rows: ProductSaleMenu[];
  isLoading: boolean;
  onClickItem: (item: ProductSaleMenu) => void;
  tableScrollRef: Dispatch<SetStateAction<null | HTMLElement>>;
}

const ProductTableContent: FC<Props> = ({ rows, isLoading, onClickItem, tableScrollRef }) => {
  const headerList = ['NO', '제품', '매출', '판매수', '순이익', '순익율', 'TOP3 제품'];

  const handleClickItem = (name: string) => {
    const target = rows.find((item) => item.name === name);
    if (!target) return;

    onClickItem(target);
  };

  return (
    <CommonAnyTypeTable
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

export default ProductTableContent;

function createTableRow(item: ProductSaleMenu, no: number) {
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
      {item.clients.slice(0, 3).map((p, i) => {
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
