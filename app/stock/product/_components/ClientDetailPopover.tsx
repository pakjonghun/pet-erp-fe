import { FC } from 'react';
import { StockColumn } from '@/http/graphql/codegen/graphql';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { Stack, Button } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';
import { EMPTY } from '@/constants';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  productStock: StockColumn;
  onClose: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const ClientDetailPopover: FC<Props> = ({
  open,
  anchorEl,
  position,
  productStock,
  onClose,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="거래처 세부내용" />
      {/* <Stack>
        <LabelText label="코드" text={selectedClient.code} />
        <LabelText label="이름" text={selectedClient.name} />
        <LabelText label="분류" text={selectedClient.clientType ?? EMPTY} />
        <LabelText label="상호" text={selectedClient.businessName ?? EMPTY} />
        <LabelText label="사업자등록번호" text={selectedClient.businessNumber ?? EMPTY} />
        <LabelText
          label="수수료율"
          text={selectedClient.feeRate == null ? EMPTY : (selectedClient.feeRate ?? 0) * 100 + '%'}
        />
        <LabelText label="결제일" text={selectedClient.payDate ?? EMPTY} />
        <LabelText label="관리자" text={selectedClient.manager ?? EMPTY} />
        <LabelText label="연락처" text={selectedClient.managerTel ?? EMPTY} />
        <LabelText label="거래여부" text={selectedClient.inActive ? '거래중' : '거래종료'} />
      </Stack> */}
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

export default ClientDetailPopover;
