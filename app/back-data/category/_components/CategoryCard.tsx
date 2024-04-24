import { FC, useState } from 'react';
import { Paper, Typography, Stack, Button, Box } from '@mui/material';
import { Category } from '@/http/graphql/codegen/graphql';
import DeleteCategoryModal from './DeleteCategoryModal';
import EditCategoryModal from './EditCategoryModal';

interface Props {
  item: Category;
}

const CategoryCard: FC<Props> = ({ item: { _id, name } }) => {
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
        variant="h6"
        sx={{
          width: '100%',
          alignSelf: 'flex-start',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
        title={name ?? ''}
      >
        {name}
      </Typography>
      <Stack direction="row" gap={1}>
        <Button onClick={() => setOpenDelete(true)} color="error" variant="outlined">
          삭제
        </Button>
        <Button onClick={() => setOpenEdit(true)} variant="contained">
          수정
        </Button>
      </Stack>
    </Paper>
  );
};

export default CategoryCard;
