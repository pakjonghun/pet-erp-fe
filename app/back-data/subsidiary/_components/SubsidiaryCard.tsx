import { FC, MouseEvent, useState } from 'react';
import { Box, Chip, IconButton, Menu, Paper, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SelectOption } from '../../types';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Subsidiary } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';

interface Props {
  subsidiary: Subsidiary;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, subsidiary: Subsidiary) => void;
  onClickOption: (option: SelectOption | null, product: Subsidiary | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const SubsidiaryCard: FC<Props> = ({ subsidiary, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const subsidiaryOptionMenus: Record<SelectOption, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('edit', subsidiary);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <Edit />,
    },
    delete: {
      callback: () => {
        onClickOption('delete', subsidiary);
        setMenuAnchor(null);
      },
      label: '삭제',
      icon: <DeleteOutlinedIcon />,
    },
  };

  return (
    <Paper ref={scrollRef} sx={{ position: 'relative', py: 3, px: 4 }}>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(subsidiaryOptionMenus).map(([option, menu]) => (
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
      <Box onClick={(event) => onClickRow(event, subsidiary)}>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="이름" text={subsidiary.name} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="분류" text={subsidiary.category?.name ?? EMPTY} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="코드" text={subsidiary.code} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="원가" text={subsidiary.wonPrice ?? EMPTY} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText
              label="리드타임(일)"
              text={subsidiary.leadTime ? `${subsidiary.leadTime}일` : EMPTY}
            />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <LabelText
            label="사용되는 제품 리스트"
            text={
              <Stack direction="row" gap={1} flexWrap="wrap">
                {(subsidiary.productList ?? []).map((product) => (
                  <Chip key={product._id} label={product.name} />
                ))}
              </Stack>
            }
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default SubsidiaryCard;
