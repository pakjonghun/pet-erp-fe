import { FC, useState } from 'react';
import { Paper, Typography, Stack, Button } from '@mui/material';
import DeleteCategoryModal from './DeleteCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import { SubsidiaryCategory, UserRole } from '@/http/graphql/codegen/graphql';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';

interface Props {
  item: SubsidiaryCategory;
}

const CategoryCard: FC<Props> = ({ item: { _id, name } }) => {
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
        alignItems: 'flex-end',
        gap: 1,
      }}
    >
      <DeleteCategoryModal open={openDelete} onClose={handleCloseDelete} item={{ _id, name }} />
      <EditCategoryModal open={openEdit} onClose={handleCloseEdit} item={{ _id, name }} />
      <Typography
        variant="body1"
        sx={{
          width: '100%',
          alignSelf: 'flex-start',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          fontWeight: 500,
          p: 1,
          mb: 1,
        }}
        title={name ?? ''}
      >
        {name}
      </Typography>
      <Stack direction="row" gap={1}>
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

export default CategoryCard;
