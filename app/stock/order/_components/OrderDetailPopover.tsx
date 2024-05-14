import { FC } from 'react';
import { ProductOrder } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { Stack, Button } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';
import { EMPTY } from '@/constants';

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
  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="발주 세부내용" />
      <Stack>
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
      <Stack direction="row" gap={1} sx={{ mt: 2 }} justifyContent="flex-end">
        <Button color="error" variant="outlined" onClick={onClickDelete}>
          삭제
        </Button>
        <Button variant="contained" onClick={onClickEdit}>
          편집
        </Button>
      </Stack>
    </BasePopover>
  );
};

export default OrderDetailPopover;
