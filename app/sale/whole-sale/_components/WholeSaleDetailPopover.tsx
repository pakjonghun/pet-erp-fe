import { FC } from 'react';
import { WholeSaleOutput } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { getKCWFormat } from '@/utils/common';
import { Stack, Button, Chip } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';
import { EMPTY } from '@/constants';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  selectedWholeSale: WholeSaleOutput;
  onClose: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const WholeSaleDetailPopover: FC<Props> = ({
  open,
  anchorEl,
  position,
  selectedWholeSale,
  onClose,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <BasePopover
      onClose={onClose}
      position={position}
      open={open}
      anchorEl={anchorEl}
    >
      <ModalTitle text="제품 세부내용" />
      <Stack>
        <LabelText label="거래처" text={selectedWholeSale.mallId} />
        <LabelText
          label="제품목록"
          text={selectedWholeSale.productList.map((product) => (
            <Chip key={product.code} label={product.productName} />
          ))}
        />
        <LabelText
          label="연락처"
          text={selectedWholeSale.telephoneNumber1 ?? EMPTY}
        />
        <LabelText label="원가" text={selectedWholeSale.wonCost ?? EMPTY} />
        <LabelText
          label="판매가"
          text={
            selectedWholeSale.payCost == null
              ? EMPTY
              : getKCWFormat(selectedWholeSale.payCost) ?? EMPTY
          }
        />
        <LabelText
          label="원가"
          text={
            selectedWholeSale.wonCost == null
              ? EMPTY
              : getKCWFormat(selectedWholeSale.wonCost) ?? EMPTY
          }
        />
        <LabelText label="수익" text={EMPTY} />
        <LabelText label="수익율" text={EMPTY} />
        <LabelText label="판매수량" text={EMPTY} />
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

export default WholeSaleDetailPopover;
