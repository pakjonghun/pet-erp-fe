import { FC, MouseEvent, useState } from 'react';
import Cell from '@/components/table/Cell';
import { Chip, Menu, Stack, TableRow } from '@mui/material';
import { SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { AdsOutPutItem, OutputOption } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import { SelectOption } from '../types';
import dayjs from 'dayjs';
import { AdTypeToHangle } from '../constants';
import { getNumberToString } from '@/utils/sale';

interface Props {
  isSelected: boolean;
  subsidiary: AdsOutPutItem;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, option: AdsOutPutItem) => void;
  onClickOption: (option: SelectOption | null, product: AdsOutPutItem | null) => void;
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

  const createRow = (ad: AdsOutPutItem) => {
    return [
      dayjs(ad.from).format('YYYY-MM-DD'),
      dayjs(ad.to).format('YYYY-MM-DD'),
      AdTypeToHangle[ad.type],
      getNumberToString(ad.price, 'comma'),
      ad.clientCode?.name ?? '',
      <Stack key={ad._id} direction="row" flexWrap="wrap" gap={1}>
        {(ad.productCodeList ?? []).map((p) => {
          return <Chip key={`${p.name}_${p.code}`} label={`${p.name}(${p.code})`} />;
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
          // sx={{ minWidth: 200 }}
        >
          {item}
        </Cell>
      ))}
    </TableRow>
  );
};

export default SubsidiaryBodyRow;
