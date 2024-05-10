import { FC, MouseEvent, useState } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import Cell from '@/components/table/Cell';
import { IconButton, Menu, TableRow } from '@mui/material';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { StockStorageOutput } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import CollapseRow from './CollapseRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Props {
  storageStock: StockStorageOutput;
  onClickRow: (
    event: MouseEvent<HTMLTableCellElement>,
    stock: StockStorageOutput
  ) => void;
  onClickOption: (
    option: any | null,
    client: StockStorageOutput | null
  ) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const StorageStockBodyRow: FC<Props> = ({
  storageStock,
  scrollRef,
  onClickOption,
  onClickRow,
}) => {
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('add', storageStock);
        setMenuAnchor(null);
      },
      label: '입고',
      icon: <InventoryIcon />,
    },
    delete: {
      callback: () => {
        onClickOption('out', storageStock);
        setMenuAnchor(null);
      },
      label: '출고',
      icon: <InventoryIcon />,
    },
  };

  const createRow = (stock: StockStorageOutput) => {
    return [
      stock.name,
      stock.phoneNumber ?? EMPTY,
      stock.address ?? EMPTY,
      stock.note ?? EMPTY,
      stock.totalStock ?? 0,
      stock.totalWonCost ?? 0,
    ];
  };

  const parsedClient = createRow(storageStock);

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
            key={`${storageStock.__typename}_${index}`}
            onClick={(event) => {
              onClickRow(event, storageStock);
              setOpen((prev) => !prev);
            }}
            sx={{ minWidth: 200 }}
          >
            {item}
          </Cell>
        ))}

        {/* <OptionCell onClick={setMenuAnchor} /> */}
      </TableRow>
      <CollapseRow
        onClickOption={onClickOption}
        storageStock={storageStock}
        open={open}
      />
    </>
  );
};

export default StorageStockBodyRow;
