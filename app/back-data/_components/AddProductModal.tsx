import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateProductForm, createProductSchema } from '../_validations/createProductValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { useCreateProduct } from '@/api/graphql/hooks/product/useCreateProduct';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateProductModal: FC<Props> = ({ open, onClose }) => {
  const [createProduct, { loading }] = useCreateProduct();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      code: '',
      name: '',
      barCode: '',
      category: '',
      leadTime: 0,
      maintainDate: 0,
      salePrice: 0,
      wonPrice: 0,
    },
  });
  const onSubmit = (values: CreateProductForm) => {
    createProduct({
      variables: {
        createProductInput: values,
      },
      onCompleted: () => {
        snackMessage({ message: '제품등록이 완료되었습니다.', severity: 'success' });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '제품등록이 실패했습니다.', severity: 'error' });
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
        제품 입력
      </Typography>
      <Typography sx={{ mb: 3 }}>새로운 제품을 입력합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{ gap: 2 }}>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  {...field}
                  sx={{ minWidth: 400 }}
                  size="small"
                  required
                  label="제품코드"
                  error={!!errors.code?.message}
                  helperText={errors.code?.message ?? ''}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">p - </InputAdornment>,
                  }}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  size="small"
                  {...field}
                  required
                  label="제품이름"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="salePrice"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  size="small"
                  {...field}
                  required
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  type="number"
                  label="판매가"
                  error={!!errors.salePrice?.message}
                  helperText={errors.salePrice?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="wonPrice"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  size="small"
                  {...field}
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  type="number"
                  required
                  label="원가"
                  error={!!errors.wonPrice?.message}
                  helperText={errors.wonPrice?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="leadTime"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  type="number"
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  label="리드타임"
                  error={!!errors.leadTime?.message}
                  helperText={errors.leadTime?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="maintainDate"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  type="number"
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  label="유지기간"
                  error={!!errors.maintainDate?.message}
                  helperText={errors.maintainDate?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="barCode"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  label="바코드"
                  error={!!errors.barCode?.message}
                  helperText={errors.barCode?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  label="분류"
                  error={!!errors.category?.message}
                  helperText={errors.category?.message ?? ''}
                />
              </FormControl>
            )}
          />
        </FormGroup>
        <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
            생성
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default CreateProductModal;
