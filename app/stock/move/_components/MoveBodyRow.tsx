import Cell from '@/components/table/Cell';
import { IconButton, Menu, TableRow } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Move } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import dayjs from 'dayjs';
// import { SelectOption } from '../../types';

interface Props {
  move: Move;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, move: Move) => void;
  onClickOption: (option: any | null, move: Move | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const MoveBodyRow: FC<Props> = ({ move, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('edit', move);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <Edit />,
    },
    delete: {
      callback: () => {
        onClickOption('delete', move);
        setMenuAnchor(null);
      },
      label: '삭제',
      icon: <DeleteOutlinedIcon />,
    },
  };

  const createRow = (move: Move) => {
    return [
      move.fromStorage?.name,
      move.toStorage?.name,
      dayjs(move.startDate.name).format('YYYY-MM-DD'),
      dayjs(move.endDate.name).format('YYYY-MM-DD'),
      move.products.map((item) => `${item.product.name}(${item.count}EA), `),
    ];
  };

  const parsedClient = createRow(move);

  return (
    <TableRow hover ref={scrollRef}>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>
      {parsedClient.map((item, index) => (
        <Cell
          key={`${move._id}_${index}`}
          onClick={(event) => onClickRow(event, move)}
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

export default MoveBodyRow;
