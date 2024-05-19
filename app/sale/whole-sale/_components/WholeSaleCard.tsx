import { FC, MouseEvent, useState } from 'react';
import { Chip, IconButton, Menu, Paper, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SelectedOptionItem } from '@/constants';
import { Edit } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { UserRole, WholeSaleItem } from '@/http/graphql/codegen/graphql';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import LabelText from '@/components/ui/typograph/LabelText';
import { SelectOption } from '@/app/back-data/types';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import { getProfitRate } from '@/utils/sale';
import dayjs from 'dayjs';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';

interface Props {
  sale: WholeSaleItem;
  onClickRow: (event: MouseEvent<HTMLSpanElement>, sale: WholeSaleItem) => void;
  onClickOption: (option: SelectOption | null, sale: WholeSaleItem | null) => void;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const WholeSaleCard: FC<Props> = ({ sale, scrollRef, onClickOption, onClickRow }) => {
  const { role } = useReactiveVar(authState);
  const cannotModify = role == UserRole.Staff;
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const productOptionMenus: Record<SelectOption, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('edit', sale);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <Edit />,
    },
    delete: {
      callback: () => {
        onClickOption('delete', sale);
        setMenuAnchor(null);
      },
      label: '삭제',
      icon: <DeleteOutlinedIcon />,
    },
  };

  const profit = sale.totalPayCost - sale.totalWonCost;
  const profitRate = getProfitRate(profit, sale.totalPayCost);

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

      <Stack gap={2}>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <LabelText sx={{ flex: 1 }} label="거래처" text={sale.mallId} />
          <LabelText
            sx={{ flex: 1 }}
            label="판매날짜"
            text={dayjs(sale.saleAt).format('YYYY-MM-DD')}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <LabelText
            sx={{ flex: 1 }}
            label="판매수량 합계"
            text={getNumberWithComma(sale.totalCount)}
          />
          <LabelText sx={{ flex: 1 }} label="원가 합계" text={getKCWFormat(sale.totalWonCost)} />
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <LabelText sx={{ flex: 1 }} label="판매가 합계" text={getKCWFormat(sale.totalPayCost)} />
          <LabelText sx={{ flex: 1 }} label="수익" text={getKCWFormat(profit)} />
        </Stack>
        <LabelText label="수익율" text={`${profitRate}%`} />
        <LabelText
          label="제품목록"
          text={sale.productList.map((product) => (
            <Chip key={product.productCode} label={product.productName} />
          ))}
        />
      </Stack>
    </Paper>
  );
};

export default WholeSaleCard;
