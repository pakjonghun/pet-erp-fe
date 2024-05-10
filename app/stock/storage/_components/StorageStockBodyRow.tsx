import { FC, MouseEvent, useState } from 'react';
import Cell from '@/components/table/Cell';
import { IconButton, TableRow } from '@mui/material';
import { EMPTY } from '@/constants';
import { StockStorageOutput } from '@/http/graphql/codegen/graphql';
import CollapseRow from './CollapseRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Props {
  storageStock: StockStorageOutput;
  onClickRow: (
    event: MouseEvent<HTMLTableCellElement>,
    stock: StockStorageOutput
  ) => void;
  onClickOption: (option: any | null, stock: StockStorageOutput) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
  setProductName: (productName: string) => void;
}

const StorageStockBodyRow: FC<Props> = ({
  storageStock,
  scrollRef,
  onClickOption,
  onClickRow,
  setProductName,
}) => {
  const [open, setOpen] = useState(false);

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
      </TableRow>
      <CollapseRow
        setProductName={setProductName}
        onClickOption={onClickOption}
        storageStock={storageStock}
        open={open}
      />
    </>
  );
};

export default StorageStockBodyRow;
