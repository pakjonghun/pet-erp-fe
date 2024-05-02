import { FC, MouseEvent, useState } from 'react';
import { Box, IconButton, Menu, Paper, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Product } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';
import { SelectOption } from '@/app/back-data/types';

interface Props {
  product: Product;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, product: Product) => void;
  onClickOption: (option: SelectOption | null, product: Product | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductCard: FC<Props> = ({ product, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<SelectOption, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('edit', product);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <Edit />,
    },
    delete: {
      callback: () => {
        onClickOption('delete', product);
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
      <Box onClick={(event) => onClickRow(event, product)}>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="이름" text={product.name} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="분류" text={product.category?.name ?? EMPTY} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="코드" text={product.code} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="바코드" text={product.barCode ?? EMPTY} />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="원가" text={product.wonPrice ?? EMPTY} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="판매가" text={product.salePrice ?? EMPTY} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText
              label="리드타임(일)"
              text={product.leadTime ? `${product.leadTime}일` : EMPTY}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText
              label="최소 유지기간(일)"
              text={product.maintainDate ? `${product.maintainDate}일` : EMPTY}
            />
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProductCard;
