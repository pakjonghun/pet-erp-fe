import DoneIcon from '@mui/icons-material/Done';
import { Box, Chip, IconButton, Menu, Paper, Stack } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ProductOrder, UserRole } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';
import dayjs from 'dayjs';

interface Props {
  client: ProductOrder;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, client: ProductOrder) => void;
  onClickOption: (option: any | null, client: ProductOrder | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const OrderCard: FC<Props> = ({ client, scrollRef, onClickOption, onClickRow }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      role: [UserRole.OrderEdit],
      callback: () => {
        onClickOption('edit', client);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <Edit />,
    },
    complete: {
      role: [UserRole.OrderEdit],
      callback: () => {
        onClickOption('complete', client);
        setMenuAnchor(null);
      },
      label: '발주완료',
      icon: <DoneIcon />,
    },
    delete: {
      role: [UserRole.OrderDelete],
      callback: () => {
        onClickOption('delete', client);
        setMenuAnchor(null);
      },
      label: '삭제',
      icon: <DeleteOutlinedIcon />,
    },
  };

  const allHasNoLeadTime = client.products.every((item) => item.product.leadTime == null);
  const biggestLeadTime = allHasNoLeadTime
    ? -1
    : client.products.reduce(
        (acc, cur) => ((cur.product.leadTime ?? 0) > acc ? cur.product.leadTime ?? 0 : acc),
        -Infinity
      );
  const leadTime = biggestLeadTime < 0 ? null : biggestLeadTime;

  return (
    <Paper ref={scrollRef} sx={{ position: 'relative', p: 3 }}>
      {!client.isDone && (
        <>
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
        </>
      )}

      <Box
        onClick={(event) => onClickRow(event, client)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="공장" text={client?.factory?.name ?? ''} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="공장 연락처" text={client?.factory?.phoneNumber ?? ''} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="계약금" text={client.payCost} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="잔금" text={client.notPayCost} />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="총 금액" text={client.totalPayCost} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText
              label="발주 날짜"
              text={
                client?.orderDate
                  ? dayjs(client.orderDate).subtract(9, 'hour').format('YYYY.MM.DD')
                  : EMPTY
              }
            />
          </Box>
        </Stack>
        <LabelText
          label="생산완료 예정일"
          text={
            client?.orderDate
              ? leadTime == null
                ? '제품 리드타임 미입력'
                : dayjs(client?.orderDate)
                    .add(leadTime * 24, 'hour')
                    .format('YYYY-MM-DD')
              : EMPTY
          }
        />
      </Box>
      <LabelText
        label="제품목록"
        text={
          <Stack sx={{ mt: 1 }} direction="row" gap={1} flexWrap="wrap">
            {client.products.map((item) => {
              return <Chip key={Math.random()} label={`${item.product.name}(${item.count}EA)`} />;
            })}
          </Stack>
        }
      />
    </Paper>
  );
};

export default OrderCard;
