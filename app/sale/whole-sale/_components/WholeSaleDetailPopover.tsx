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
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      {/* <ModalTitle text="제품 세부내용" />
      <Stack>
        <LabelText label="거래처" text={selectedWholeSale.mallId} />
        <LabelText
          label="제품목록"
          text={selectedWholeSale.productList.map((product) => (
            <Chip key={product.code} label={product.productName} />
          ))}
        />
        <LabelText label="분류" text={selectedWholeSale.category?.name ?? EMPTY} />
        <LabelText label="바코드" text={selectedWholeSale.barCode ?? EMPTY} />
        <LabelText
          label="판매가"
          text={
            selectedWholeSale.salePrice == null
              ? EMPTY
              : getKCWFormat(selectedWholeSale.salePrice) ?? EMPTY
          }
        />
        <LabelText
          label="원가"
          text={
            selectedWholeSale.wonPrice == null
              ? EMPTY
              : getKCWFormat(selectedWholeSale.wonPrice) ?? EMPTY
          }
        />
        <LabelText label="유지기간" text={selectedWholeSale.maintainDate ?? EMPTY} />
        <LabelText label="리드타임" text={selectedWholeSale.leadTime ?? EMPTY} />
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

export default WholeSaleDetailPopover;
