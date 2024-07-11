import { FC } from 'react';
import { OutputOption } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { Stack, Button, Chip } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  selectedOption: OutputOption;
  onClose: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const SubsidiaryDetailPopover: FC<Props> = ({
  open,
  anchorEl,
  position,
  selectedOption,
  onClose,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="제품 세부내용" />
      <Stack sx={{ maxWidth: 200 }}>
        <LabelText label="아이디" text={selectedOption.id} />
        <LabelText label="이름" text={selectedOption.name} />
        <LabelText label="제품개수" text={selectedOption.count} />
        <LabelText
          label="사용되는 제품목록"
          text={
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {(selectedOption.productCodeList ?? [])?.map((product) => {
                return <Chip key={product.code} label={product.name} />;
              })}
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

export default SubsidiaryDetailPopover;
