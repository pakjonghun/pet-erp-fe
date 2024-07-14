import { FC, MouseEvent, useState } from 'react';
import Cell from '@/components/table/Cell';
import { Chip, Menu, Stack, TableRow } from '@mui/material';
import { SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { OutputOption } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import { SelectOption } from '../../types';

interface Props {
  isSelected: boolean;
  subsidiary: OutputOption;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, option: OutputOption) => void;
  onClickOption: (option: SelectOption | null, product: OutputOption | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const SubsidiaryBodyRow: FC<Props> = ({
  isSelected,
  subsidiary,
  scrollRef,
  onClickOption,
  onClickRow,
}) => {
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

  const createRow = (subsidiary: OutputOption) => {
    return [
      subsidiary.id,
      subsidiary.name,
      <Stack key={Math.random()} direction="row" flexWrap="wrap" gap={1}>
        {(subsidiary.productOptionList ?? []).map((subsidiary) => {
          return (
            <Chip
              key={subsidiary.productCode.name}
              label={`(${subsidiary.productCode.name}(${subsidiary.count})EA`}
            />
          );
        })}
      </Stack>,
    ];
  };

  const parsedRowData = createRow(subsidiary);

  return (
    <TableRow
      sx={(theme) => ({
        bgcolor: isSelected ? theme.palette.action.hover : '',
      })}
      hover
      ref={scrollRef}
    >
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
    </TableRow>
  );
};

export default SubsidiaryBodyRow;
