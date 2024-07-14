import { FC } from 'react';
import { OutClient, Storage } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { Stack, Button, Chip } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';
import { EMPTY } from '@/constants';
import { getFixedTwo } from '@/utils/sale';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  selectedClient: OutClient;
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
  const { data: storages } = useStorages({
    keyword: '',
    limit: 1000,
    skip: 0,
  });

  const targetStorage = ((storages?.storages.data as Storage[]) ?? []).find(
    (item) => item._id === selectedClient?.storageId
  );

  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="거래처 세부내용" />
      <Stack>
        <LabelText label="코드" text={selectedClient.code} />
        <LabelText label="이름" text={selectedClient.name} />
        <LabelText label="분류" text={selectedClient.clientType ?? EMPTY} />
        <LabelText label="상호" text={selectedClient.businessName ?? EMPTY} />
        <LabelText label="사업자등록번호" text={selectedClient.businessNumber ?? EMPTY} />
        <LabelText
          label="수수료율"
          text={
            selectedClient.feeRate == null ? EMPTY : getFixedTwo(selectedClient.feeRate * 100) + '%'
          }
        />
        <LabelText label="결제일" text={selectedClient.payDate ?? EMPTY} />
        <LabelText label="관리자" text={selectedClient.manager ?? EMPTY} />
        <LabelText label="연락처" text={selectedClient.managerTel ?? EMPTY} />
        <LabelText label="거래여부" text={selectedClient.inActive ? '거래중' : '거래종료'} />
        <LabelText label="출고창고" text={targetStorage?.name ?? EMPTY} />
        <LabelText
          label="무료배송 제품"
          text={
            selectedClient.deliveryFreeProductCodeList ? (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {selectedClient.deliveryFreeProductCodeList.map((item) => (
                  <Chip key={Math.random()} label={item.name || EMPTY} />
                ))}
              </Stack>
            ) : (
              ''
            )
          }
        />
        <LabelText
          label="유료배송 제품"
          text={
            selectedClient.deliveryNotFreeProductCodeList ? (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {selectedClient.deliveryNotFreeProductCodeList.map((item) => (
                  <Chip key={Math.random()} label={item.name || EMPTY} />
                ))}
              </Stack>
            ) : (
              ''
            )
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

export default ClientDetailPopover;
