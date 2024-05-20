import { Box, IconButton, Menu, Paper, Stack } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY, SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ProductOrder, UserRole } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';
import dayjs from 'dayjs';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';
// import { SelectOption } from '../../types';

interface Props {
  client: ProductOrder;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, client: ProductOrder) => void;
  onClickOption: (option: any | null, client: ProductOrder | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const OrderCard: FC<Props> = ({ client, scrollRef, onClickOption, onClickRow }) => {
  const { role } = useReactiveVar(authState);
  const cannotModify = role == UserRole.Staff;
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

  return (
    <Paper ref={scrollRef} sx={{ position: 'relative', py: 3, px: 4 }}>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>
      {!cannotModify && (
        <IconButton
          sx={{ position: 'absolute', right: 3, top: 3 }}
          onClick={(event) => {
            setMenuAnchor(event.currentTarget);
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      )}
      <Box onClick={(event) => onClickRow(event, client)}>
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
            <LabelText
              label="제품"
              text={client.products.map((item) => `${item.product.name}(${item.count}EA)`)}
            />
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
      </Box>
    </Paper>
  );
};

export default OrderCard;
