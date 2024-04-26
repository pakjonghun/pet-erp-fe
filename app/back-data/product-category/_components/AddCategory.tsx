import BaseModal from '@/components/ui/modal/BaseModal';
import { Button, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { useCreateProductCategory } from '@/http/graphql/hooks/product-category/useCreateProductCategory';
import { CreateCategoryForm, createCategorySchema } from '../_validations/createCategoryValidation';
import { modalSizeProps } from '@/components/commonStyles';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateCategoryModal: FC<Props> = ({ open, onClose }) => {
  const [createCategory, { loading }] = useCreateProductCategory();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryForm>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (values: CreateCategoryForm) => {
    createCategory({
      variables: {
        createCategoryInput: {
          name: values.name,
        },
      },
      onCompleted: () => {
        snackMessage({ message: '제품분류 등록이 완료되었습니다.', severity: 'success' });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '제품분류 등록이 실패했습니다.', severity: 'error' });
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
        제품분류 등록
      </Typography>
      <Typography sx={{ mb: 3 }}>새로운 제품분류를 등록합니다.</Typography>
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
              등록
            </Button>
          </Stack>
        </FormGroup>
      </form>
    </BaseModal>
  );
};

export default CreateCategoryModal;
