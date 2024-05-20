import Cell from '@/components/table/Cell';
import { Chip, IconButton, Menu, Stack, TableRow } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ProductOrder, UserRole } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import dayjs from 'dayjs';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';

interface Props {
  client: ProductOrder;
  onClickRow: (event: MouseEvent<HTMLTableCellElement>, client: ProductOrder) => void;
  onClickOption: (option: any | null, client: ProductOrder | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const OrderBodyRow: FC<Props> = ({ client, scrollRef, onClickOption, onClickRow }) => {
  const { role } = useReactiveVar(authState);
  const cannotModify = role === UserRole.Staff;

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
      order?.orderDate ? dayjs(order?.orderDate).format('YYYY-MM-DD') : EMPTY,
      order?.factory?.name ?? '',
      <Stack key={Math.random()} direction="column" gap={1}>
        {order.products.map((item, index) => {
          return (
            <Chip
              key={`${item.__typename}_${index}`}
              label={`${item.product.name}(${item.count})`}
            />
          );
        })}
      </Stack>,
      order.products.reduce((acc, cur) => acc + cur.count, 0),
      order.payCost,
      order.notPayCost,
      order.totalPayCost,
      order.isDone ? '지불 완료' : '미지불',
      order?.orderDate
        ? leadTime == null
          ? '제품 리드타임 미입력'
          : dayjs(order?.orderDate)
              .add(leadTime * 24, 'hour')
              .format('YYYY-MM-DD')
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
        {!cannotModify && (
          <IconButton
            onClick={(event) => {
              setMenuAnchor(event.currentTarget);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        )}
      </Cell>
    </TableRow>
  );
};

export default OrderBodyRow;
