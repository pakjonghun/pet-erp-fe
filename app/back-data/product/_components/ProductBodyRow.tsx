import { FC, MouseEvent, useState } from 'react';
import Cell from '@/components/table/Cell';
import { Menu, TableRow } from '@mui/material';
import { getKCWFormat } from '@/utils/common';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Product, Storage } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import { SelectOption } from '../../types';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';

interface Props {
  isSelected: boolean;
  product: Product;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, product: Product) => void;
  onClickOption: (option: SelectOption | null, product: Product | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductBodyRow: FC<Props> = ({
  product,
  scrollRef,
  onClickOption,
  onClickRow,
  isSelected,
}) => {
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

  const { data: storages } = useStorages({
    keyword: '',
    limit: 1000,
    skip: 0,
  });

  const targetStorage = ((storages?.storages.data as Storage[]) ?? []).find(
    (item) => item._id === product?.storageId
  );

  const createRow = (product: Product) => {
    return [
      product.name,
      product.category?.name ?? EMPTY,
      product.barCode ?? EMPTY,
      product.code,
      product.wonPrice == null ? EMPTY : getKCWFormat(product.wonPrice),
      product.salePrice == null ? EMPTY : getKCWFormat(product.salePrice),
      product.leadTime ? `${product.leadTime}일` : EMPTY,
      targetStorage?.name ?? EMPTY,
      product.isFreeDeliveryFee ? '무료배송' : '유료배송',
    ];
  };

  const parsedRowData = createRow(product);

  return (
    <TableRow sx={{ bgcolor: isSelected ? 'action.hover' : '' }} hover ref={scrollRef}>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>
      {parsedRowData.map((item, index) => (
        <Cell
          key={`${product._id}_${index}`}
          onClick={(event) => onClickRow(event, product)}
          sx={{ minWidth: 200 }}
        >
          {item}
        </Cell>
      ))}

      {/* <Cell sx={{ minWidth: 50 }}>
        <IconButton
          onClick={(event) => {
            setMenuAnchor(event.currentTarget);
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Cell> */}
    </TableRow>
  );
};

export default ProductBodyRow;
