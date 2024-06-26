'use client';

import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import BaseModal from '../../../../components/ui/modal/BaseModal';
import { snackMessage } from '@/store/snackMessage';
import CommonLoading from '../../../../components/ui/loading/CommonLoading';
import { useRemoveProductCategory } from '@/http/graphql/hooks/product-category/useRemoveProductCategory';
import { ProductCategory } from '@/http/graphql/codegen/graphql';

interface Props {
  item: ProductCategory;
  open: boolean;
  onClose: () => void;
}

const DeleteCategoryModal: FC<Props> = ({ item, open, onClose }) => {
  const [deleteCategory, { loading }] = useRemoveProductCategory();

  const handleDelete = () => {
    deleteCategory({
      variables: {
        _id: item._id as string,
      },
      onCompleted: (res) => {
        snackMessage({
          message: `${res.removeCategory.name} 삭제가 완료되었습니다.`,
          severity: 'success',
        });
        onClose();
      },
      onError: (err) => {
        snackMessage({
          message: err.message ?? `${name} 삭제가 실패했습니다.`,
          severity: 'error',
        });
        onClose();
      },
    });
  };
  return (
    <BaseModal open={open} onClose={onClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        제품분류 삭제
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        해당 제품분류가 삭제됩니다.
      </Typography>
      <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
        <Button color="info" variant="outlined" onClick={onClose}>
          취소
        </Button>
        <Button
          color="error"
          endIcon={loading ? <CommonLoading /> : ''}
          variant="contained"
          onClick={handleDelete}
        >
          삭제
        </Button>
      </Stack>
    </BaseModal>
  );
};

export default DeleteCategoryModal;
