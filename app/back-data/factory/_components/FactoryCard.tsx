import { FC, useState } from 'react';
import { Paper, Stack, Button } from '@mui/material';
import DeleteStorageModal from './DeleteFactoryModal';
import { Storage } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import { EMPTY } from '@/constants';
import EditStorageModal from './EditFactoryModal';

interface Props {
  item: Storage;
}

const FactoryCard: FC<Props> = ({
  item: { _id, name, address, note, phoneNumber },
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 1,
      }}
    >
      <DeleteStorageModal
        open={openDelete}
        onClose={handleCloseDelete}
        item={{ _id, name }}
      />
      <EditStorageModal
        open={openEdit}
        onClose={handleCloseEdit}
        storage={{ _id, name, address, note, phoneNumber }}
      />
      <LabelText label="이름" text={name} />
      <LabelText label="연락처" text={phoneNumber ?? EMPTY} />
      <LabelText label="주소" text={address ?? EMPTY} />
      <LabelText label="메모" text={note ?? EMPTY} />
      <Stack direction="row" gap={1} sx={{ alignSelf: 'flex-end' }}>
        <Button
          onClick={() => setOpenDelete(true)}
          color="error"
          variant="outlined"
        >
          삭제
        </Button>
        <Button onClick={() => setOpenEdit(true)} variant="contained">
          수정
        </Button>
      </Stack>
    </Paper>
  );
};

export default FactoryCard;
