import Cell from '@/components/table/Cell';
import { IconButton, Menu, TableRow } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Client } from '@/api/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import { SelectOption } from '../../types';

interface Props {
  client: Client;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, client: Client) => void;
  onClickOption: (option: SelectOption | null, client: Client | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ClientBodyRow: FC<Props> = ({ client, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<SelectOption, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('edit', client);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <Edit />,
    },
    delete: {
      callback: () => {
        onClickOption('delete', client);
        setMenuAnchor(null);
      },
      label: '삭제',
      icon: <DeleteOutlinedIcon />,
    },
  };

  return (
    <TableRow hover ref={scrollRef}>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>
      <Cell onClick={(event) => onClickRow(event, client)} sx={{ minWidth: 200 }}>
        {client.name}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, client)} sx={{ minWidth: 200 }}>
        {client.businessName ?? ''}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, client)} sx={{ minWidth: 200 }}>
        {client.code ?? ''}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, client)} sx={{ minWidth: 200 }}>
        {(client.feeRate ?? 0) * 100 + '%'}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, client)} sx={{ minWidth: 200 }}>
        {client.clientType ?? ''}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, client)} sx={{ minWidth: 200 }}>
        {client.payDate ?? ''}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, client)} sx={{ minWidth: 200 }}>
        {client.manager ?? ''}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, client)} sx={{ minWidth: 200 }}>
        {client.managerTel ?? ''}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, client)} sx={{ minWidth: 200 }}>
        {client.inActive ? '거래중' : '거래종료'}
      </Cell>
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

export default ClientBodyRow;
