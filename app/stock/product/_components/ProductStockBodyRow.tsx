import { FC, MouseEvent, useState } from 'react';
import Cell from '@/components/table/Cell';
import { Chip, Menu, TableRow } from '@mui/material';
import { EMPTY, SelectedOptionItem } from '@/constants';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import { StockColumn } from '@/http/graphql/codegen/graphql';
import { getNumberToString } from '@/utils/sale';
import { getKCWFormat } from '@/utils/common';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Props {
  isSelected: boolean;
  productStock: StockColumn;
  onClickRow: (
    event: MouseEvent<HTMLTableCellElement>,
    stock: StockColumn
  ) => void;
  onClickOption: (option: any | null, client: StockColumn | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductStockBodyRow: FC<Props> = ({
  isSelected,
  productStock,
  scrollRef,
  onClickOption,
  onClickRow,
}) => {
  // const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('add', productStock);
        setMenuAnchor(null);
      },
      label: '입고',
      icon: <AddCircleOutlineIcon />,
    },
    delete: {
      callback: () => {
        onClickOption('out', productStock);
        setMenuAnchor(null);
      },
      label: '출고',
      icon: <RemoveCircleOutlineIcon />,
    },
  };

  const chip = {
    success: <Chip label="1달이상" color="success" />,
    warning: <Chip label="15일이하" color="warning" />,
    danger: <Chip label="10일이하" color="error" />,
    noon: <Chip label="알수없음" />,
  };

  const createRow = (stock: StockColumn) => {
    const leftDate = stock.leftDate;
    const leftDateDisplay =
      leftDate === null
        ? '알수없음'
        : leftDate === -1
        ? '재고없음'
        : `${leftDate}일`;

    let stockHealthy = chip.noon;

    const getStockHealthy = () => {
      if (leftDate == null) return;
      if (leftDate == -1) {
        stockHealthy = chip.danger;
        return;
      }
      const leadTime = stock.leadTime ?? 0;
      if (leftDate + leadTime > 30) {
        stockHealthy = chip.success;
        return;
      }

      if (leftDate + leadTime <= 30 && leftDate + leadTime > 15) {
        stockHealthy = chip.warning;
        return;
      }

      if (leftDate + leadTime <= 10) {
        stockHealthy = chip.danger;
        return;
      }
    };

    getStockHealthy();

    return [
      stock.productName,
      stock.stockCount,
      getNumberToString(stock.monthSaleCount, 'comma'),
      stock.wonPrice ? getKCWFormat(stock.wonPrice) : EMPTY,
      leftDateDisplay,
      stock.leadTime == null ? EMPTY : `${stock.leadTime}일`,
      stockHealthy,
    ];
  };

  const parsedClient = createRow(productStock);

  return (
    <>
      <TableRow
        sx={(theme) => ({
          bgcolor: isSelected ? theme.palette.action.hover : '',
        })}
        hover
        ref={scrollRef}
      >
        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(null)}
        >
          {Object.entries(productOptionMenus).map(([option, menu]) => (
            <OptionMenu key={option} menu={menu} option={option} />
          ))}
        </Menu>
        {/* <Cell onClick={() => setOpen((prev) => !prev)}>
          <IconButton>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Cell> */}
        {parsedClient.map((item, index) => (
          <Cell
            key={`${productStock.__typename}_${index}`}
            onClick={(event) => {
              onClickRow(event, productStock);
              // setOpen((prev) => !prev);
            }}
            sx={{ minWidth: 200 }}
          >
            {item}
          </Cell>
        ))}

        {/* <OptionCell onClick={setMenuAnchor} /> */}
      </TableRow>
      {/* {open && (
        <CollapseRow
          onClickOption={onClickOption}
          productStock={productStock}
          open={open}
        />
      )} */}
    </>
  );
};

export default ProductStockBodyRow;
