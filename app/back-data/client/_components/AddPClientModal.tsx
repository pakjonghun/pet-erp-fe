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
import { Controller, useForm } from 'react-hook-form';
import { CreateClientForm, createClientSchema } from '../_validations/createClientValidation';
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
import { client } from '@/http/graphql/client';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateClientModal: FC<Props> = ({ open, onClose }) => {
  const [createClient, { loading }] = useCreateClient();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientForm>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      code: '',
      name: '',
      clientType: ClientType.Bender,
      businessName: '',
      businessNumber: '',
      manager: '',
      managerTel: '',
      inActive: true,
    },
  });

  const onSubmit = (values: CreateClientForm) => {
    const newValues = filterEmptyValues(values) as CreateClientForm;
    createClient({
      variables: {
        createClientInput: {
          ...newValues,
          feeRate: values.feeRate == null ? null : values.feeRate / 100,
        },
      },
      onCompleted: () => {
        snackMessage({
          message: '거래처등록이 완료되었습니다.',
          severity: 'success',
        });

        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'dashboardClients' });
          },
        });

        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '거래처등록이 실패했습니다.',
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
        거래처 입력
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={3}
          sx={{ mb: 3 }}
        >
          <Typography>새로운 거래처을 입력합니다.</Typography>
          <Controller
            control={control}
            name="inActive"
            render={({ field }) => {
              return (
                <FormControlLabel
                  sx={{ width: 'fit-content' }}
                  control={<Switch defaultChecked {...field} />}
                  label={field.value ? '거래중' : '거래종료'}
                />
              );
            }}
          />
        </Stack>

        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  {...field}
                  size="small"
                  required
                  label="거래처코드"
                  error={!!errors.code?.message}
                  helperText={errors.code?.message ?? ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{`${CLIENT_PREFIX} - `}</InputAdornment>
                    ),
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
                  label="거래처이름"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="feeRate"
            render={({ field }) => (
              <FormControl>
                <NumberInput
                  field={field}
                  label="수수료 비율(0~100사이 숫자)"
                  error={!!errors.feeRate?.message}
                  helperText={errors.feeRate?.message ?? ''}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="clientType"
            render={({ field }) => (
              <Autocomplete
                filterSelectedOptions
                value={field.value}
                onChange={(_, value) => field.onChange(value)}
                noOptionsText="검색결과가 없습니다."
                options={Object.keys(clientTypes)}
                getOptionLabel={(option) => {
                  return clientTypes[option as unknown as ClientType] ?? '';
                }}
                renderInput={(params) => (
                  <FormControl fullWidth>
                    <TextField
                      {...params}
                      size="small"
                      {...field}
                      label="거래처 형태"
                      error={!!errors.clientType?.message}
                      helperText={errors.clientType?.message ?? ''}
                    />
                  </FormControl>
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="businessName"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  label="거래처 상호"
                  error={!!errors.businessName?.message}
                  helperText={errors.businessName?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="businessNumber"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  label="사업자 등록번호"
                  error={!!errors.businessNumber?.message}
                  helperText={errors.businessNumber?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="payDate"
            render={({ field }) => (
              <NumberInput
                field={field}
                label="결제일(매달 결제할 날짜(1~31사이 값을 입력)"
                error={!!errors.payDate?.message}
                helperText={errors.payDate?.message ?? ''}
              />
            )}
          />
          <Controller
            control={control}
            name="manager"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  label="관리자 이름"
                  error={!!errors.manager?.message}
                  helperText={errors.manager?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="manager"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  label="연락처"
                  error={!!errors.managerTel?.message}
                  helperText={errors.managerTel?.message ?? ''}
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
            등록
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default CreateClientModal;
