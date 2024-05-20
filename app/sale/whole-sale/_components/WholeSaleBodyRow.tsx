import { FC, MouseEvent, useState } from 'react';
import Cell from '@/components/table/Cell';
import { Chip, IconButton, Menu, Stack, TableRow } from '@mui/material';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { UserRole, WholeSaleItem } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import { SelectOption } from '@/app/back-data/types';
import dayjs from 'dayjs';
import { getProfitRate } from '@/utils/sale';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';

interface Props {
  wholeSale: WholeSaleItem;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, sale: WholeSaleItem) => void;
  onClickOption: (option: SelectOption | null, sale: WholeSaleItem | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const WholeSaleBodyRow: FC<Props> = ({ wholeSale, scrollRef, onClickOption, onClickRow }) => {
  const { role } = useReactiveVar(authState);
  const cannotModify = role == UserRole.Staff;

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
    const profit = sale.totalPayCost - sale.totalWonCost;
    const profitRate = getProfitRate(sale.totalPayCost - sale.totalWonCost, sale.totalPayCost);
    return [
      sale.mallId,
      dayjs(sale.saleAt).format('YYYY-MM-DD'),
      <Stack key={Math.random()} direction="column" gap={1}>
        {sale.productList.map((item) => (
          <Chip
            key={`${item.__typename}_${Math.random()}`}
            label={`${item.productName}(${item.count})`}
          />
        ))}
      </Stack>,
      getNumberWithComma(sale.totalCount),
      getKCWFormat(sale.totalWonCost),
      getKCWFormat(sale.totalPayCost),
      getKCWFormat(profit),
      `${profitRate}%`,
      sale.isDone ? '정산완료' : '정산중',
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
        {!cannotModify && (
          <IconButton
            onClick={(event) => {
              setMenuAnchor(event.currentTarget);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        )}
      </Cell>
    </TableRow>
  );
};

export default WholeSaleBodyRow;
