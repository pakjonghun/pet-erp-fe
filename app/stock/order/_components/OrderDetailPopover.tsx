import { FC } from 'react';
import { ProductOrder } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { Stack, Button, Chip } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';
import { EMPTY } from '@/constants';
import dayjs from 'dayjs';

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
  const allHasNoLeadTime = selectedOrder.products.every((item) => item.product.leadTime == null);
  const biggestLeadTime = allHasNoLeadTime
    ? -1
    : selectedOrder.products.reduce(
        (acc, cur) => ((cur.product.leadTime ?? 0) > acc ? cur.product.leadTime ?? 0 : acc),
        -Infinity
      );
  const leadTime = biggestLeadTime < 0 ? null : biggestLeadTime;

  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="발주 세부내용" />
      <Stack gap={1}>
        <LabelText label="발주완료여부" text={selectedOrder.isDone ? '완료' : '발주중'} />
        <LabelText
          label="발주 날짜"
          text={
            selectedOrder?.orderDate ? dayjs(selectedOrder.orderDate).format('YYYY.MM.DD') : EMPTY
          }
        />
        <LabelText label="공장" text={selectedOrder?.factory?.name ?? ''} />
        <LabelText label="공장 연락처" text={selectedOrder?.factory?.phoneNumber ?? '' ?? EMPTY} />
        <LabelText label="공장 주소" text={selectedOrder?.factory?.address ?? EMPTY} />
        <LabelText label="계약금" text={selectedOrder.payCost} />
        <LabelText label="잔금" text={selectedOrder.notPayCost} />
        <LabelText label="전체금액" text={selectedOrder.totalPayCost} />

        <LabelText
          label="생산완료 예정일"
          text={
            selectedOrder.orderDate
              ? leadTime == null
                ? '제품 리드타임 미입력'
                : dayjs(selectedOrder?.orderDate)
                    .add(leadTime * 24, 'hour')
                    .format('YYYY-MM-DD')
              : EMPTY
          }
        />
        <LabelText
          label="제품 목록"
          text={
            <Stack gap={1} direction="row" flexWrap="wrap">
              {selectedOrder.products.map((item) => (
                <Chip key={Math.random()} label={`${item.product.name}(${item.count})` ?? EMPTY} />
              ))}
            </Stack>
          }
        />
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
