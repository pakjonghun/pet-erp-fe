import { FC, MouseEvent, useState } from 'react';
import Cell from '@/components/table/Cell';
import { Chip, IconButton, Menu, TableRow } from '@mui/material';
import { EMPTY, SelectedOptionItem } from '@/constants';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import CollapseRow from './CollapseRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OptionCell from './OptionCell';
import { StockColumn, SubsidiaryStockColumn } from '@/http/graphql/codegen/graphql';
import { getNumberToString } from '@/utils/sale';
import { getKCWFormat } from '@/utils/common';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Props {
  productStock: SubsidiaryStockColumn;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, stock: SubsidiaryStockColumn) => void;
  onClickOption: (option: any | null, client: SubsidiaryStockColumn | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductStockBodyRow: FC<Props> = ({ productStock, scrollRef, onClickOption, onClickRow }) => {
  const [open, setOpen] = useState(false);
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

  const createRow = (stock: SubsidiaryStockColumn) => {
    return [
      stock.productName,
      stock.stockCount,
      stock.wonPrice ? getKCWFormat(stock.wonPrice) : EMPTY,
      stock.leadTime == null ? EMPTY : `${stock.leadTime}일`,
      'z',
    ];
  };

  const parsedClient = createRow(productStock);

  return (
    <>
      <TableRow hover ref={scrollRef}>
        <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
          {Object.entries(productOptionMenus).map(([option, menu]) => (
            <OptionMenu key={option} menu={menu} option={option} />
          ))}
        </Menu>
        <Cell onClick={() => setOpen((prev) => !prev)}>
          <IconButton>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
        </Cell>
        {parsedClient.map((item, index) => (
          <Cell
            key={`${productStock.__typename}_${index}`}
            onClick={(event) => {
              onClickRow(event, productStock);
              setOpen((prev) => !prev);
            }}
            sx={{ minWidth: 200 }}
          >
            {item}
          </Cell>
        ))}

        <OptionCell onClick={setMenuAnchor} />
      </TableRow>
      {open && (
        <CollapseRow onClickOption={onClickOption} productStock={productStock} open={open} />
      )}
    </>
  );
};

export default ProductStockBodyRow;
