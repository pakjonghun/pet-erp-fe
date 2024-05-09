import { Box, IconButton, Menu, Paper, Stack } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Move } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';
import dayjs from 'dayjs';
// import { SelectOption } from '../../types';

interface Props {
  move: Move;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, client: Move) => void;
  onClickOption: (option: any | null, client: Move | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const MoveCard: FC<Props> = ({ move, scrollRef, onClickOption, onClickRow }) => {
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
      <Box onClick={(event) => onClickRow(event, move)}>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="출발지" text={move.fromStorage?.name} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="도착지" text={move.toStorage?.name} />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="출발날짜" text={dayjs(move.startDate).format('YYYY-MM-DD')} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="도착날짜" text={dayjs(move.endDate).format('YYYY-MM-DD')} />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText
              label="제품"
              text={move.products.map((item) => `${item.product.name}(${item.count}EA)`)}
            />
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default MoveCard;
