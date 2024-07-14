import { FC, MouseEvent, useState } from 'react';
import { Box, Chip, IconButton, Menu, Paper, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { StockColumn, SubsidiaryStockColumn, UserRole } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Props {
  stock: SubsidiaryStockColumn;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, stock: SubsidiaryStockColumn) => void;
  onClickOption: (option: any | null, stock: SubsidiaryStockColumn | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductStockCard: FC<Props> = ({ stock, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      role: [UserRole.StockIn],
      callback: () => {
        onClickOption('add', stock);
        setMenuAnchor(null);
      },
      label: '입고',
      icon: <AddCircleOutlineIcon />,
    },
    delete: {
      role: [UserRole.StockOut],
      callback: () => {
        onClickOption('out', stock);
        setMenuAnchor(null);
      },
      label: '출고',
      icon: <RemoveCircleOutlineIcon />,
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
            <LabelText label="리드타임" text={stock.leadTime ?? EMPTY} />
          </Box>
        </Stack>
        <Stack direction="row" gap={1} flexWrap="wrap">
          <LabelText
            label="사용할수있는 제품목록"
            text={
              <>
                <br />
                {(stock?.productList ?? []).map((product, index) => {
                  return (
                    <Chip
                      sx={{ mr: 1, mt: 0.5 }}
                      key={`${product}_${index}`}
                      label={product ?? ''}
                    />
                  );
                })}
              </>
            }
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProductStockCard;
