import { FC, useState } from 'react';
import { Paper, Stack, Button } from '@mui/material';
import DeleteStorageModal from './DeleteStorageModal';
import { Storage, UserRole } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import { EMPTY } from '@/constants';
import EditStorageModal from './EditStorageModal';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';

interface Props {
  item: Storage;
}

const StorageCard: FC<Props> = ({ item: { _id, name, address, note, phoneNumber } }) => {
  const { data: userData } = useGetMyInfo();
  const myRole = userData?.myInfo.role ?? [];
  const canDelete = myRole.includes(UserRole.BackDelete);
  const canEdit = myRole.includes(UserRole.BackEdit);

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
      <DeleteStorageModal open={openDelete} onClose={handleCloseDelete} item={{ _id, name }} />
      <EditStorageModal
        open={openEdit}
        onClose={handleCloseEdit}
        storage={{ _id, name, address, note, phoneNumber }}
      />
      <LabelText label="이름" text={name} />
      <LabelText label="연락처" text={phoneNumber ?? EMPTY} />
      <LabelText
        sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}
        label="주소"
        text={address ?? EMPTY}
      />
      <LabelText label="메모" text={note ?? EMPTY} />
      <Stack direction="row" gap={1} sx={{ alignSelf: 'flex-end' }}>
        {canDelete && (
          <Button onClick={() => setOpenDelete(true)} color="error" variant="outlined">
            삭제
          </Button>
        )}
        {canEdit && (
          <Button onClick={() => setOpenEdit(true)} variant="contained">
            수정
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default StorageCard;
