import { FC } from 'react';
import { Product } from '@/api/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { getKCWFormat } from '@/util';
import { Stack, Button } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  selectedClient: Product;
  onClose: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const ClientDetailPopover: FC<Props> = ({
  open,
  anchorEl,
  position,
  selectedClient,
  onClose,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="거래처 세부내용" />
      <Stack>
        <LabelText label="코드" text={selectedClient.code} />
        <LabelText label="이름" text={selectedClient.name} />
        <LabelText label="분류" text={selectedClient.category?.name ?? ''} />
        <LabelText label="바코드" text={selectedClient.barCode ?? ''} />
        <LabelText label="판매가" text={getKCWFormat(selectedClient.salePrice)} />
        <LabelText label="원가" text={getKCWFormat(selectedClient.wonPrice)} />
        <LabelText label="유지기간" text={selectedClient.maintainDate ?? ''} />
        <LabelText label="리드타임" text={selectedClient.leadTime} />
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

export default ClientDetailPopover;
