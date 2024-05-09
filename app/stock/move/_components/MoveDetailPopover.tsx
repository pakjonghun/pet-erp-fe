import { FC } from 'react';
import { Move } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { Stack, Button } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';
import { EMPTY } from '@/constants';
import dayjs from 'dayjs';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  selectedMove: Move;
  onClose: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const MoveDetailPopover: FC<Props> = ({
  open,
  anchorEl,
  position,
  selectedMove,
  onClose,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="발주 세부내용" />
      <Stack>
        <LabelText label="출발지" text={selectedMove.fromStorage?.name} />
        <LabelText label="도착지" text={selectedMove.toStorage?.name} />
        <LabelText label="출발날짜" text={dayjs(selectedMove.startDate).format('YYYY.MM.DD')} />
        <LabelText label="도착날짜" text={dayjs(selectedMove.endDate).format('YYYY.MM.DD')} />
        <LabelText
          label="제품 목록"
          text={selectedMove.products.map((item) => `${item.product}(${item.count})`) ?? EMPTY}
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

export default MoveDetailPopover;
