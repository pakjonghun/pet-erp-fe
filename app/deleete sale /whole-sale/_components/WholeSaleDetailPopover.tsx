import { FC } from 'react';
import { UserRole, WholeSaleItem } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import { Stack, Button, Chip } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';
import dayjs from 'dayjs';
import { getProfitRate } from '@/utils/sale';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  selectedWholeSale: WholeSaleItem;
  onClose: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const WholeSaleDetailPopover: FC<Props> = ({
  open,
  anchorEl,
  position,
  selectedWholeSale: sale,
  onClose,
  onClickDelete,
  onClickEdit,
}) => {
  const { role } = useReactiveVar(authState);
  const cannotModify = role.includes(UserRole.SaleEdit);
  const profit = sale.totalPayCost - sale.totalWonCost;
  const profitRate = getProfitRate(profit, sale.totalPayCost);

  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="제품 세부내용" />
      <Stack gap={2}>
        <LabelText label="정산여부" text={sale.isDone ? '정산완료' : '정산중'} />
        <LabelText label="거래처" text={sale.mallId} />
        <LabelText label="판매날짜" text={dayjs(sale.saleAt).format('YYYY-MM-DD')} />

        <LabelText label="판매수량 합계" text={getNumberWithComma(sale.totalCount)} />
        <LabelText label="원가 합계" text={getKCWFormat(sale.totalWonCost)} />
        <LabelText label="판매가 합계" text={getKCWFormat(sale.totalPayCost)} />
        <LabelText label="수익" text={getKCWFormat(profit)} />
        <LabelText label="수익율" text={`${profitRate}%`} />
        <LabelText
          label="제품목록"
          text={
            <Stack gap={1} direction="row" flexWrap={'wrap'}>
              {sale.productList.map((product) => (
                <Chip key={product.productCode} label={product.productName} />
              ))}
            </Stack>
          }
        />
      </Stack>
      {!cannotModify && (
        <Stack direction="row" gap={1} sx={{ mt: 2 }} justifyContent="flex-end">
          <Button color="error" variant="outlined" onClick={onClickDelete}>
            삭제
          </Button>
          <Button variant="contained" onClick={onClickEdit}>
            편집
          </Button>
        </Stack>
      )}
    </BasePopover>
  );
};

export default WholeSaleDetailPopover;
