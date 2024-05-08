import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  CreateClientForm,
  createClientSchema,
} from '../_validations/createClientValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { modalSizeProps } from '@/components/commonStyles';
import { useCreateClient } from '@/http/graphql/hooks/client/useCreateClient';
import { ClientType } from '@/http/graphql/codegen/graphql';
import { filterEmptyValues } from '@/utils/common';
import { clientTypes } from '../constants';
import NumberInput from '@/components/ui/input/NumberInput';
import { CLIENT_PREFIX } from '@/constants';
import {
  CreateOrderForm,
  createOrderSchema,
} from '../_validations/createOrderValidation';

const factories = [
  {
    _id: '123',
    name: 'Central Warehouse',
    phoneNumber: '123-456-7890',
    address: '123 Central Ave, Big City',
    note: 'Main distribution center',
  },
  {
    _id: '1234',
    name: 'East Side Storage',
    phoneNumber: '987-654-3210',
    address: '456 East St, Capital City',
    note: 'Handles east region deliveries',
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddOrderModal: FC<Props> = ({ open, onClose }) => {
  const [createClient, { loading }] = useCreateClient();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrderForm>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      count: 0,
      factory: '',
      products: [],
      payCost: 0,
      notPayCost: 0,
      totalPayCost: 0,
    },
  });

  const { replace, append, remove, fields } = useFieldArray({
    control,
    name: 'products',
  });

  const onSubmit = (values: CreateOrderForm) => {
    const newValues = filterEmptyValues(values) as CreateOrderForm;
    // createClient({
    //   variables: {
    //     createClientInput: {
    //       ...newValues,
    //       feeRate: values.feeRate == null ? null : values.feeRate / 100,
    //     },
    //   },
    //   onCompleted: () => {
    //     snackMessage({
    //       message: '거래처등록이 완료되었습니다.',
    //       severity: 'success',
    //     });
    //     handleClose();
    //   },
    //   onError: (err) => {
    //     const message = err.message;
    //     snackMessage({
    //       message: message ?? '거래처등록이 실패했습니다.',
    //       severity: 'error',
    //     });
    //   },
    // });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        발주 등록
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>새로운 발주를 등록합니다.</Typography>

        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="payCost"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  sx={{ mt: 4 }}
                  label="계약금"
                  size="small"
                  error={!!errors.payCost?.message}
                  helperText={errors.payCost?.message ?? ''}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="notPayCost"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="잔금"
                  size="small"
                  error={!!errors.notPayCost?.message}
                  helperText={errors.notPayCost?.message ?? ''}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="totalPayCost"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="총 금액"
                  size="small"
                  error={!!errors.totalPayCost?.message}
                  helperText={errors.totalPayCost?.message ?? ''}
                />
              );
            }}
          />
        </FormGroup>
        <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button
            type="submit"
            endIcon={loading ? <CommonLoading /> : ''}
            variant="contained"
          >
            등록
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default AddOrderModal;
