import { Box, IconButton, Menu, Paper, Stack } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Client } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';
import { SelectOption } from '../../types';

interface Props {
  client: Client;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, client: Client) => void;
  onClickOption: (option: SelectOption | null, client: Client | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ClientCard: FC<Props> = ({ client, scrollRef, onClickOption, onClickRow }) => {
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
    <Paper ref={scrollRef} sx={{ position: 'relative', py: 3, px: 4 }}>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>
      <IconButton
        sx={{ position: 'absolute', right: 3, top: 3 }}
        onClick={(event) => {
          setMenuAnchor(event.currentTarget);
        }}
      >
        <MoreHorizIcon />
      </IconButton>
      <Box onClick={(event) => onClickRow(event, client)}>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="이름" text={client.name} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="상호" text={client.businessName ?? EMPTY} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="코드" text={client.code} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="거래여부" text={client.inActive ? '거래중' : '거래종료'} />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText
              label="수수료율"
              text={client.feeRate == null ? EMPTY : client.feeRate * 100 + '%'}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="분류" text={client.clientType ?? EMPTY} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="담당자" text={client.manager ?? EMPTY} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="연락처" text={client.clientType ?? EMPTY} />
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ClientCard;
