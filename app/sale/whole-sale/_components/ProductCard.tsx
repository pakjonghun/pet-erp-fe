import { FC, MouseEvent, useState } from 'react';
import { Box, IconButton, Menu, Paper, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Product, WholeSaleOutput } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';
import { SelectOption } from '@/app/back-data/types';

interface Props {
  sale: WholeSaleOutput;
  onClickRow: (
    event: MouseEvent<HTMLSpanElement>,
    sale: WholeSaleOutput
  ) => void;
  onClickOption: (
    option: SelectOption | null,
    sale: WholeSaleOutput | null
  ) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const WholeSaleCard: FC<Props> = ({
  sale,
  scrollRef,
  onClickOption,
  onClickRow,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<SelectOption, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('edit', sale);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <Edit />,
    },
    delete: {
      callback: () => {
        onClickOption('delete', sale);
        setMenuAnchor(null);
      },
      label: '삭제',
      icon: <DeleteOutlinedIcon />,
    },
  };

  return (
    <Paper ref={scrollRef} sx={{ position: 'relative', py: 3, px: 4 }}>
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={() => setMenuAnchor(null)}
      >
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
      <Box onClick={(event) => onClickRow(event, sale)}>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="이름" text={sale.mallId} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="연락처" text={sale.telephoneNumber1 ?? EMPTY} />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText
              label="제품 이름"
              text={
                sale.productList.map((item) => item.productName).join(', ') ??
                EMPTY
              }
            />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="원가" text={sale.wonCost ?? EMPTY} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="판매가" text={sale.payCost ?? EMPTY} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="수익" text={EMPTY} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="수익율" text={EMPTY} />
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default WholeSaleCard;
