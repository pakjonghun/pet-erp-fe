import BaseModal from '@/components/ui/modal/BaseModal';
import { Button, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { CreateCategoryForm, createCategorySchema } from '../_validations/createCategoryValidation';
import { Category } from '@/http/graphql/codegen/graphql';
import { useUpdateProductCategory } from '@/http/graphql/hooks/product-category/useEditProductCategory';
import { modalSizeProps } from '@/components/commonStyles';

interface Props {
  open: boolean;
  item: Category;
  onClose: () => void;
}

const EditCategoryModal: FC<Props> = ({ open, item, onClose }) => {
  const [updateCategory, { loading }] = useUpdateProductCategory();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryForm>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: item.name as string,
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    reset({
      name: item.name as string,
    });
  }, [item.name, reset]);

  const onSubmit = (values: CreateCategoryForm) => {
    updateCategory({
      variables: {
        updateCategoryInput: {
          _id: item._id as string,
          name: values.name,
        },
      },
      onCompleted: () => {
        snackMessage({ message: '제품분류 편집이 완료되었습니다.', severity: 'success' });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '제품분류 편집이 실패했습니다.', severity: 'error' });
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        제품분류 편집
      </Typography>
      <Typography sx={{ mb: 3 }}>{`${item.name}`} 제품분류를 편집합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                required
                size="small"
                label="제품분류 이름"
                error={!!errors.name?.message}
                helperText={errors.name?.message ?? ''}
              />
            )}
          />
          <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
            <Button type="button" variant="outlined" onClick={handleClose}>
              취소
            </Button>
            <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
              편집
            </Button>
          </Stack>
        </FormGroup>
      </form>
    </BaseModal>
  );
};

export default EditCategoryModal;
