import { Edit } from '@mui/icons-material';
import { FC, MouseEvent, useState } from 'react';
import { Box, Chip, IconButton, Menu, Paper, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SelectOption } from '../types';
import { SelectedOptionItem } from '@/constants';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { AdsOutPutItem, OutputOption, UserRole } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';
import dayjs from 'dayjs';
import { AdTypeToHangle } from '../constants';
import { getNumberToString } from '@/utils/sale';

interface Props {
  option: AdsOutPutItem;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, productOption: AdsOutPutItem) => void;
  onClickOption: (option: SelectOption | null, productOption: AdsOutPutItem | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const SubsidiaryCard: FC<Props> = ({ option, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const subsidiaryOptionMenus: Partial<Record<SelectOption, SelectedOptionItem>> = {
    // edit: {
    //   role: [UserRole.BackEdit],
    //   callback: () => {
    //     onClickOption('edit', option);
    //     setMenuAnchor(null);
    //   },
    //   label: '편집',
    //   icon: <Edit />,
    // },
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
            <LabelText label="시작날짜" text={dayjs(option.from).format('YYYY-MM-DD')} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="종료날짜" text={dayjs(option.to).format('YYYY-MM-DD')} />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="광고타입" text={AdTypeToHangle[option.type]} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="광고비" text={getNumberToString(option.price, 'comma')} />
          </Box>
        </Stack>
        {option.clientCode?.name && (
          <Box sx={{ flex: 1 }}>
            <LabelText label="광고채널" text={option.clientCode?.name ?? ''} />
          </Box>
        )}
        {option.productCodeList && option.productCodeList.length > 0 && (
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <LabelText
              label="사용되는 제품 리스트"
              text={
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {option.productCodeList?.map((option) => (
                    <Chip key={option.name} label={`${option.name}(${option.code})`} />
                  ))}
                </Stack>
              }
            />
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default SubsidiaryCard;
