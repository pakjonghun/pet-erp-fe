import Cell from '@/components/table/Cell';
import { IconButton, Menu, TableRow } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ProductOrder } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import dayjs from 'dayjs';
// import { SelectOption } from '../../types';

interface Props {
  client: ProductOrder;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, client: ProductOrder) => void;
  onClickOption: (option: any | null, client: ProductOrder | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const OrderBodyRow: FC<Props> = ({ client, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('edit', client);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <Edit />,
    },
    delete: {
      callback: () => {
        onClickOption('delete', client);
        setMenuAnchor(null);
      },
      label: '삭제',
      icon: <DeleteOutlinedIcon />,
    },
  };

  const createRow = (order: ProductOrder) => {
    const allHasNoLeadTime = order.products.every((item) => item.product.leadTime == null);

    const biggestLeadTime = allHasNoLeadTime
      ? -1
      : order.products.reduce(
          (acc, cur) => ((cur.product.leadTime ?? 0) > acc ? cur.product.leadTime ?? 0 : acc),
          -Infinity
        );

    const leadTime = biggestLeadTime < 0 ? null : biggestLeadTime;

    return [
      order?.createdAt ? dayjs(order?.createdAt).subtract(9, 'hour').format('YYYY-MM-DD') : EMPTY,
      order?.factory?.name ?? '',
      order.products.map((item) => `${item.product.name}(${item.count}EA), `),
      order.products.reduce((acc, cur) => acc + cur.count, 0),
      order.payCost,
      order.notPayCost,
      order.totalPayCost,
      order.isDone ? '지불 완료' : '미지불',
      order?.createdAt
        ? leadTime == null
          ? '알수없음'
          : dayjs(order?.createdAt).subtract(9, 'hour').add(leadTime, 'day').format('YYYY-MM-DD')
        : EMPTY,
    ];
  };

  const parsedClient = createRow(client);

  return (
    <TableRow hover ref={scrollRef}>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>
      {parsedClient.map((item, index) => (
        <Cell
          key={`${client._id}_${index}`}
          onClick={(event) => onClickRow(event, client)}
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

export default OrderBodyRow;
