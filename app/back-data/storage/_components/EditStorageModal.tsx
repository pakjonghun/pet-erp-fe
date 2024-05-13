import { FC, useEffect } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import { Button, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { CreateStorageForm, createStorageSchema } from '../_validations/createStorageValidation';
import { modalSizeProps } from '@/components/commonStyles';
import { Storage } from '@/http/graphql/codegen/graphql';
import { useEditStorage } from '@/http/graphql/hooks/storage/useEditStorage';

interface Props {
  open: boolean;
  storage: Storage;
  onClose: () => void;
}

const EditStorageModal: FC<Props> = ({ open, storage, onClose }) => {
  const [editStorage, { loading }] = useEditStorage();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStorageForm>({
    resolver: zodResolver(createStorageSchema),
    defaultValues: {
      name: storage.name,
      phoneNumber: storage.phoneNumber,
      address: storage.address,
      note: storage.note,
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    reset({
      name: storage.name,
      phoneNumber: storage.phoneNumber,
      address: storage.address,
      note: storage.note,
    });
  }, [storage, reset]);

  const onSubmit = (values: CreateStorageForm) => {
    editStorage({
      variables: {
        updateStorageInput: {
          _id: storage._id,
          name: values.name,
          address: values.address,
          phoneNumber: values.phoneNumber,
          note: values.note,
        },
      },
      onCompleted: () => {
        snackMessage({
          message: '창고 데이터 편집이 완료되었습니다.',
          severity: 'success',
        });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '창고 편집이 실패했습니다.',
          severity: 'error',
        });
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
        창고 데이터 수정
      </Typography>
      <Typography sx={{ mb: 3 }}>창고 데이터를 수정합니다.</Typography>
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
                label="창고 이름"
                error={!!errors.name?.message}
                helperText={errors.name?.message ?? ''}
              />
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="연락처"
                error={!!errors.name?.message}
                helperText={errors.name?.message ?? ''}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="주소"
                error={!!errors.name?.message}
                helperText={errors.name?.message ?? ''}
              />
            )}
          />
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="비고"
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
              수정
            </Button>
          </Stack>
        </FormGroup>
      </form>
    </BaseModal>
  );
};

export default EditStorageModal;
