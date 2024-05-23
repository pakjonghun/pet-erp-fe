import { FC, MouseEvent, useState } from 'react';
import Cell from '@/components/table/Cell';
import { Chip, IconButton, Menu, Stack, TableRow } from '@mui/material';
import { getKCWFormat } from '@/utils/common';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Subsidiary } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import { SelectOption } from '../../types';

interface Props {
  subsidiary: Subsidiary;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, subsidiary: Subsidiary) => void;
  onClickOption: (option: SelectOption | null, product: Subsidiary | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const SubsidiaryBodyRow: FC<Props> = ({ subsidiary, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<SelectOption, SelectedOptionItem> = {
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

  const createRow = (subsidiary: Subsidiary) => {
    return [
      subsidiary.name,
      subsidiary.category?.name ?? EMPTY,
      subsidiary.code,
      subsidiary.wonPrice == null ? EMPTY : getKCWFormat(subsidiary.wonPrice),
      subsidiary.leadTime ? `${subsidiary.leadTime}일` : EMPTY,
      <Stack key={Math.random()} direction="column" gap={1}>
        {(subsidiary.productList ?? []).map((subsidiary) => {
          return <Chip key={subsidiary._id} label={subsidiary.name} />;
        })}
      </Stack>,
    ];
  };

  const parsedRowData = createRow(subsidiary);

  return (
    <TableRow hover ref={scrollRef}>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>
      {parsedRowData.map((item, index) => (
        <Cell
          key={`${subsidiary._id}_${index}`}
          onClick={(event) => onClickRow(event, subsidiary)}
          sx={{ minWidth: 200 }}
        >
          {item}
        </Cell>
      ))}

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

export default SubsidiaryBodyRow;
