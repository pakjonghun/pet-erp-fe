import BaseModal from '@/components/ui/modal/BaseModal';
import { Button, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { CreateStorageForm, createStorageSchema } from '../_validations/createStorageValidation';
import { modalSizeProps } from '@/components/commonStyles';
import { Factory } from '@/http/graphql/codegen/graphql';
import { useEditFactory } from '@/http/graphql/hooks/factory/useEditFactory';
import { client } from '@/http/graphql/client';

interface Props {
  open: boolean;
  factory: Factory;
  onClose: () => void;
}

const EditFactoryModal: FC<Props> = ({ open, factory, onClose }) => {
  const [editFactory, { loading }] = useEditFactory();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStorageForm>({
    resolver: zodResolver(createStorageSchema),
    defaultValues: {
      name: factory.name,
      phoneNumber: factory.phoneNumber,
      address: factory.address,
      note: factory.note,
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    reset({
      name: factory.name,
      phoneNumber: factory.phoneNumber,
      address: factory.address,
      note: factory.note,
    });
  }, [factory, reset]);

  const onSubmit = (values: CreateStorageForm) => {
    editFactory({
      variables: {
        updateFactoryInput: {
          _id: factory._id,
          name: values.name,
          phoneNumber: values.phoneNumber,
          address: values.address,
          note: values.note,
        },
      },
      onCompleted: () => {
        snackMessage({
          message: '공장 등록이 완료되었습니다.',
          severity: 'success',
        });

        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'orders' });
          },
        });

        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '공장 등록이 실패했습니다.',
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
        공장 수정
      </Typography>
      <Typography sx={{ mb: 3 }}>공장 데이터를 편집합니다.</Typography>
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
                label="공장 이름"
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

export default EditFactoryModal;
