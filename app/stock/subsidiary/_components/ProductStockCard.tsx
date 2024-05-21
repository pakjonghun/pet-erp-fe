import { FC, MouseEvent, useState } from 'react';
import { Box, IconButton, Menu, Paper, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { StockColumn } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';
import InventoryIcon from '@mui/icons-material/Inventory';

interface Props {
  stock: StockColumn;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, stock: StockColumn) => void;
  onClickOption: (option: any | null, stock: StockColumn | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductStockCard: FC<Props> = ({ stock, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('add', stock);
        setMenuAnchor(null);
      },
      label: '입고',
      icon: <InventoryIcon />,
    },
    delete: {
      callback: () => {
        onClickOption('out', stock);
        setMenuAnchor(null);
      },
      label: '출고',
      icon: <InventoryIcon />,
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
      <Box onClick={(event) => onClickRow(event, stock)}>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="이름" text={stock.productName} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="재고수량" text={stock.stockCount} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="최근 1달 판매량" text={stock.monthSaleCount} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="재고소진까지 남은 기간" text={`${stock.leftDate}일`} />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="리드타임" text={stock.leadTime ?? EMPTY} />
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProductStockCard;
