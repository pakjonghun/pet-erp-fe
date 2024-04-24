import { FC, MouseEvent, useState } from 'react';
import Cell from '@/components/table/Cell';
import { IconButton, Menu, TableRow } from '@mui/material';
import { getKCWFormat } from '@/util';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SelectOption } from '../types';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Product } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';

interface Props {
  product: Product;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, product: Product) => void;
  onClickOption: (option: SelectOption | null, product: Product | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductBodyRow: FC<Props> = ({ product, scrollRef, onClickOption, onClickRow }) => {
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
    <TableRow hover ref={scrollRef}>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>
      <Cell onClick={(event) => onClickRow(event, product)} sx={{ minWidth: 200 }}>
        {product.code}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, product)} sx={{ minWidth: 200 }}>
        {product.category?.name ?? EMPTY}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, product)} sx={{ minWidth: 200 }}>
        {product.barCode ?? EMPTY}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, product)} sx={{ minWidth: 200 }}>
        {product.name}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, product)} sx={{ minWidth: 200 }}>
        {getKCWFormat(product.wonPrice) ?? EMPTY}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, product)} sx={{ minWidth: 200 }}>
        {getKCWFormat(product.salePrice) ?? EMPTY}
      </Cell>
      <Cell onClick={(event) => onClickRow(event, product)} sx={{ minWidth: 200 }}>
        {product.leadTime ?? EMPTY}
      </Cell>
      <Cell sx={{ minWidth: 50 }}>
        <IconButton
          onClick={(event) => {
            setMenuAnchor(event.currentTarget);
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Cell>
    </TableRow>
  );
};

export default ProductBodyRow;
