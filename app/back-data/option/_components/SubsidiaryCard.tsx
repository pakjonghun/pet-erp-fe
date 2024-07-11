import { FC, MouseEvent, useState } from 'react';
import { Box, Chip, IconButton, Menu, Paper, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SelectOption } from '../../types';
import { SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { OutputOption, UserRole } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';

interface Props {
  option: OutputOption;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, productOption: OutputOption) => void;
  onClickOption: (option: SelectOption | null, productOption: OutputOption | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const SubsidiaryCard: FC<Props> = ({ option, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const subsidiaryOptionMenus: Record<SelectOption, SelectedOptionItem> = {
    edit: {
      role: [UserRole.BackEdit],
      callback: () => {
        onClickOption('edit', option);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <Edit />,
    },
    delete: {
      role: [UserRole.BackDelete],
      callback: () => {
        onClickOption('delete', option);
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
      <Box onClick={(event) => onClickRow(event, option)}>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="아이디" text={option.id} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="이름" text={option.name} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="제품개수" text={option.count} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <LabelText
            label="사용되는 제품 리스트"
            text={
              <Stack direction="row" gap={1} flexWrap="wrap">
                {(option.productCodeList ?? []).map((product) => (
                  <Chip key={product.code} label={product.name} />
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
