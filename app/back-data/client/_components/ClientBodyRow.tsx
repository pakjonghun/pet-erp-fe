import Cell from '@/components/table/Cell';
import { Chip, Menu, Stack, TableRow, Typography } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { OutClient, Storage } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import { SelectOption } from '../../types';
import { ClientTypeToHangle } from '../constants';
import { getFixedTwo } from '@/utils/sale';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';

interface Props {
  isSelected: boolean;
  client: OutClient;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, client: OutClient) => void;
  onClickOption: (option: SelectOption | null, client: OutClient | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ClientBodyRow: FC<Props> = ({ isSelected, client, scrollRef, onClickOption, onClickRow }) => {
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

  const { data: storages } = useStorages({
    keyword: '',
    limit: 1000,
    skip: 0,
  });

  const targetStorage = ((storages?.storages.data as Storage[]) ?? []).find(
    (item) => item._id === client?.storageId
  );

  const createRow = (client: OutClient) => {
    const max = 2;

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
      targetStorage?.name ?? EMPTY,
      client.deliveryFreeProductCodeList ? (
        <Stack
          justifyContent="center"
          direction="column"
          flexWrap="wrap"
          gap={0.4}
          sx={{ minWidth: '170px' }}
        >
          {client.deliveryFreeProductCodeList.slice(0, max).map((item) => (
            <Chip
              sx={{ width: 'fit-content', m: 0 }}
              key={Math.random().toString()}
              label={item.name || EMPTY}
            />
          ))}
          <Typography variant="caption" sx={{ pl: 1 }}>
            {client.deliveryFreeProductCodeList.length > max
              ? `+ ${client.deliveryFreeProductCodeList.length - max}개 제품`
              : ''}
          </Typography>
        </Stack>
      ) : (
        ''
      ),
      client.deliveryNotFreeProductCodeList ? (
        <Stack
          justifyContent="center"
          direction="column"
          flexWrap="wrap"
          gap={0.4}
          sx={{ minWidth: '170px' }}
        >
          {client.deliveryNotFreeProductCodeList.slice(0, max).map((item) => (
            <Chip
              sx={{ width: 'fit-content', m: 0 }}
              key={Math.random().toString()}
              label={item.name || EMPTY}
            />
          ))}
          <Typography variant="caption" sx={{ pl: 1 }}>
            {client.deliveryNotFreeProductCodeList.length > max
              ? `+ ${client.deliveryNotFreeProductCodeList.length - max}개 제품`
              : ''}
          </Typography>
        </Stack>
      ) : (
        ''
      ),
      client.isSabangService ? '지원' : '미지원',
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
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>
      {parsedClient.map((item, index) => (
        <Cell key={`${client._id}_${index}`} onClick={(event) => onClickRow(event, client)}>
          {item}
        </Cell>
      ))}
    </TableRow>
  );
};

export default ClientBodyRow;
