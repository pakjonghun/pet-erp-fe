import InventoryIcon from '@mui/icons-material/Inventory';
import Cell from '@/components/table/Cell';
import { IconButton, Menu, TableRow } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import { SelectedOptionItem } from '@/constants';
import { TotalProductStockOutput } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import CollapseRow from './CollapseRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OptionCell from './OptionCell';

interface Props {
  productStock: TotalProductStockOutput;
  onClickRow: (
    event: MouseEvent<HTMLTableCellElement>,
    stock: TotalProductStockOutput
  ) => void;
  onClickOption: (
    option: any | null,
    client: TotalProductStockOutput | null
  ) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductStockBodyRow: FC<Props> = ({
  productStock,
  scrollRef,
  onClickOption,
  onClickRow,
}) => {
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('add', productStock);
        setMenuAnchor(null);
      },
      label: '입고',
      icon: <InventoryIcon />,
    },
    delete: {
      callback: () => {
        onClickOption('out', productStock);
        setMenuAnchor(null);
      },
      label: '출고',
      icon: <InventoryIcon />,
    },
  };

  const createRow = (stock: TotalProductStockOutput) => {
    return [
      stock.product.name,
      `${stock.storageCount}(${stock.orderCount})` ?? 0,
      stock.recentSaleCount,
      0,
    ];
  };

  const parsedClient = createRow(productStock);

  return (
    <>
      <TableRow hover ref={scrollRef}>
        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(null)}
        >
          {Object.entries(productOptionMenus).map(([option, menu]) => (
            <OptionMenu key={option} menu={menu} option={option} />
          ))}
        </Menu>
        <Cell onClick={() => setOpen((prev) => !prev)}>
          <IconButton>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
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
      <CollapseRow
        onClickOption={onClickOption}
        productStock={productStock}
        open={open}
      />
    </>
  );
};

export default ProductStockBodyRow;
