import Cell from '@/components/table/Cell';
import { IconButton, Menu, TableRow } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Client } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import { SelectOption } from '../../types';
import { ClientTypeToHangle } from '../constants';
import { getFixedTwo } from '@/utils/sale';

interface Props {
  isSelected: boolean;
  client: Client;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, client: Client) => void;
  onClickOption: (option: SelectOption | null, client: Client | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ClientBodyRow: FC<Props> = ({
  isSelected,
  client,
  scrollRef,
  onClickOption,
  onClickRow,
}) => {
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

  const createRow = (client: Client) => {
    return [
      client.name,
      client.businessName ?? EMPTY,
      client.code,
      client.feeRate == null ? EMPTY : getFixedTwo(client.feeRate * 100) + '%',
      ClientTypeToHangle[client.clientType],
      client.payDate ?? EMPTY,
      client.manager ?? EMPTY,
      client.managerTel ?? EMPTY,
      client.inActive ? '거래중' : '거래종료',
    ];
  };

  const parsedClient = createRow(client);

  return (
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
      {parsedClient.map((item, index) => (
        <Cell
          key={`${client._id}_${index}`}
          onClick={(event) => onClickRow(event, client)}
          sx={{ minWidth: 200 }}
        >
          {item}
        </Cell>
      ))}
      {/* 
      <Cell sx={{ minWidth: 50 }}>
        <IconButton
          onClick={(event) => {
            setMenuAnchor(event.currentTarget);
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Cell> */}
    </TableRow>
  );
};

export default ClientBodyRow;
