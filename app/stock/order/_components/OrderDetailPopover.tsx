import { FC } from 'react';
import { ProductOrder, UserRole } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { Stack, Button } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';
import { EMPTY } from '@/constants';
import dayjs from 'dayjs';
import { authState } from '@/store/isLogin';
import { useReactiveVar } from '@apollo/client';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  selectedOrder: ProductOrder;
  onClose: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const OrderDetailPopover: FC<Props> = ({
  open,
  anchorEl,
  position,
  selectedOrder,
  onClose,
  onClickDelete,
  onClickEdit,
}) => {
  const { role } = useReactiveVar(authState);
  const cannotModify = role === UserRole.Staff;

  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="발주 세부내용" />
      <Stack>
        <LabelText
          label="발주 날짜"
          text={
            selectedOrder?.createdAt
              ? dayjs(selectedOrder.createdAt).subtract(9, 'hour').format('YYYY.MM.DD')
              : EMPTY
          }
        />
        <LabelText label="공장" text={selectedOrder?.factory?.name ?? ''} />
        <LabelText label="공장 연락처" text={selectedOrder?.factory?.phoneNumber ?? '' ?? EMPTY} />
        <LabelText label="공장 주소" text={selectedOrder?.factory?.address ?? EMPTY} />
        <LabelText
          label="제품 목록"
          text={
            selectedOrder.products.map((item) => `${item.product.name}(${item.count})`) ?? EMPTY
          }
        />

        <LabelText label="계약금" text={selectedOrder.payCost} />
        <LabelText label="잔금" text={selectedOrder.notPayCost} />
        <LabelText label="전체금액" text={selectedOrder.totalPayCost} />
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

export default OrderDetailPopover;
