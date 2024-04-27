import { FC } from 'react';
import { Subsidiary } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { getKCWFormat } from '@/util';
import { Stack, Button } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';
import { EMPTY } from '@/constants';
import { getProductList } from '../util';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  selectedSubsidiary: Subsidiary;
  onClose: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const SubsidiaryDetailPopover: FC<Props> = ({
  open,
  anchorEl,
  position,
  selectedSubsidiary,
  onClose,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="제품 세부내용" />
      <Stack sx={{ maxWidth: 200 }}>
        <LabelText label="코드" text={selectedSubsidiary.code} />
        <LabelText label="이름" text={selectedSubsidiary.name} />
        <LabelText label="분류" text={selectedSubsidiary.category?.name ?? EMPTY} />
        <LabelText
          label="원가"
          text={selectedSubsidiary.wonPrice ? getKCWFormat(selectedSubsidiary.wonPrice) : EMPTY}
        />
        <LabelText label="리드타임" text={selectedSubsidiary.leadTime ?? EMPTY} />
        <LabelText
          label="사용되는 제품목록"
          text={getProductList(selectedSubsidiary.productList)}
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

export default SubsidiaryDetailPopover;
