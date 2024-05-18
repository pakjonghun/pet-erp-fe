import { FC, MouseEvent, useState } from 'react';
import Cell from '@/components/table/Cell';
import { IconButton, Menu, TableRow } from '@mui/material';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { WholeSaleItem } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import { SelectOption } from '@/app/back-data/types';
import dayjs from 'dayjs';
import { getProfitRate } from '@/utils/sale';

interface Props {
  wholeSale: WholeSaleItem;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, sale: WholeSaleItem) => void;
  onClickOption: (option: SelectOption | null, sale: WholeSaleItem | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const WholeSaleBodyRow: FC<Props> = ({ wholeSale, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<SelectOption, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('edit', wholeSale);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <Edit />,
    },
    delete: {
      callback: () => {
        onClickOption('delete', wholeSale);
        setMenuAnchor(null);
      },
      label: '삭제',
      icon: <DeleteOutlinedIcon />,
    },
  };

  const createRow = (sale: WholeSaleItem) => {
    const saleCount = sale.productList.reduce((acc, cur) => acc + cur.count, 0);
    const totalWonPrice = sale.productList.reduce((acc, cur) => acc + (cur.wonCost ?? 0), 0);
    const totalSalePrice = sale.productList.reduce((acc, cur) => acc + cur.payCost, 0);
    const profitRate = getProfitRate(totalSalePrice - totalWonPrice, totalSalePrice);
    return [
      sale.mallId,
      dayjs(sale.saleAt).format('YYYY-MM-DD'),
      sale.productList.map((item) => item.productName).join(', '),
      getNumberWithComma(saleCount),
      getKCWFormat(totalWonPrice),
      getKCWFormat(totalSalePrice),
      getKCWFormat(totalSalePrice - totalWonPrice),
      `${profitRate}%`,
    ];
  };

  const parsedRowData = createRow(wholeSale);

  return (
    <TableRow hover ref={scrollRef}>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>
      {parsedRowData.map((item, index) => (
        <Cell
          key={`${wholeSale._id}_${index}`}
          onClick={(event) => onClickRow(event, wholeSale)}
          sx={{ minWidth: 200 }}
        >
          {item}
        </Cell>
      ))}

      <Cell sx={{ minWidth: 50 }}>
        <IconButton
          onClick={(event) => {
            setMenuAnchor(event.currentTarget);
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Cell>
    </TableRow>
  );
};

export default WholeSaleBodyRow;
