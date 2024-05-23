import { FC } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import { Button, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { CreateStorageForm, createStorageSchema } from '../_validations/createStorageValidation';
import { modalSizeProps } from '@/components/commonStyles';
import { filterEmptyValues } from '@/utils/common';
import { CreateStorageInput } from '@/http/graphql/codegen/graphql';
import { useCreateStorage } from '@/http/graphql/hooks/storage/useCreateStorage';
import { client } from '@/http/graphql/client';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddStorageModal: FC<Props> = ({ open, onClose }) => {
  const [createStorage, { loading }] = useCreateStorage();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStorageForm>({
    resolver: zodResolver(createStorageSchema),
    defaultValues: {
      name: '',
      address: '',
      note: '',
      phoneNumber: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (values: CreateStorageForm) => {
    const filterEmptyValue = filterEmptyValues(values) as CreateStorageInput;
    createStorage({
      variables: {
        createStorageInput: filterEmptyValue,
      },
      onCompleted: () => {
        snackMessage({
          message: '창고 등록이 완료되었습니다.',
          severity: 'success',
        });
        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'subsidiaryStocks' });
            cache.evict({ fieldName: 'subsidiaryStocksState' });
            cache.evict({ fieldName: 'subsidiaryCountStocks' });
            cache.evict({ fieldName: 'stocks' });
            cache.evict({ fieldName: 'productCountStocks' });
            cache.evict({ fieldName: 'stocksState' });
          },
        });

        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '창고 등록이 실패했습니다.',
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
        창고 등록
      </Typography>
      <Typography sx={{ mb: 3 }}>새로운 창고를 등록합니다.</Typography>
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
              등록
            </Button>
          </Stack>
        </FormGroup>
      </form>
    </BaseModal>
  );
};

export default AddStorageModal;
