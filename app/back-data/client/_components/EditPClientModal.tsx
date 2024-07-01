import { FC, useEffect } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
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
import { Controller, useForm } from 'react-hook-form';
import { CreateClientForm, createClientSchema } from '../_validations/createClientValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { modalSizeProps } from '@/components/commonStyles';
import { Client, ClientType, Storage } from '@/http/graphql/codegen/graphql';
import { emptyValueToNull } from '@/utils/common';
import { clientTypes } from '../constants';
import { useUpdateClient } from '@/http/graphql/hooks/client/useEditClient';
import NumberInput from '@/components/ui/input/NumberInput';
import { CLIENT_PREFIX } from '@/constants';
import { client } from '@/http/graphql/client';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';
import SearchAutoComplete from '@/components/ui/select/SearchAutoComplete';

interface Props {
  open: boolean;
  selectedClient: Client;
  onClose: () => void;
  setSelectedClient: (item: Client | null) => void;
}

const EditPClientModal: FC<Props> = ({ open, selectedClient, onClose, setSelectedClient }) => {
  const [editClient, { loading }] = useUpdateClient();

  const { data: storages, networkStatus } = useStorages({
    keyword: '',
    limit: 1000,
    skip: 0,
  });

  const storageList = (storages?.storages.data as Storage[]) ?? [];
  const storageNameList = storageList.map((item) => item.name);

  const targetStorage = ((storages?.storages.data as Storage[]) ?? []).find(
    (item) => item._id === selectedClient?.storageId
  );

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientForm>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      code: selectedClient.code,
      name: selectedClient.name,
      feeRate: selectedClient.feeRate == null ? undefined : selectedClient.feeRate * 100,
      clientType: selectedClient.clientType ?? '',
      businessName: selectedClient.businessName ?? '',
      businessNumber: selectedClient.businessNumber ?? '',
      payDate: selectedClient.payDate,
      manager: selectedClient.manager ?? '',
      managerTel: selectedClient.managerTel ?? '',
      inActive: !!selectedClient.inActive,
    },
  });

  useEffect(() => {
    if (networkStatus <= 3) return;

    reset({
      code: selectedClient.code,
      name: selectedClient.name,
      feeRate: selectedClient.feeRate == null ? undefined : selectedClient.feeRate * 100,
      clientType: selectedClient.clientType ?? '',
      businessName: selectedClient.businessName ?? '',
      businessNumber: selectedClient.businessNumber ?? '',
      payDate: selectedClient.payDate,
      manager: selectedClient.manager ?? '',
      managerTel: selectedClient.managerTel ?? '',
      inActive: !!selectedClient.inActive,
      storageName: targetStorage?.name,
    });
  }, [selectedClient, networkStatus]);

  const onSubmit = (values: CreateClientForm) => {
    const { code, name, ...newValues } = emptyValueToNull(values) as CreateClientForm;
    editClient({
      variables: {
        updateClientInput: {
          ...newValues,
          _id: selectedClient._id,
          feeRate: newValues.feeRate == null ? null : Number(newValues.feeRate) / 100,
        },
      },
      onCompleted: (res) => {
        snackMessage({
          message: '거래처수정이 완료되었습니다.',
          severity: 'success',
        });

        setSelectedClient(res.updateClient as Client);

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
          message: message ?? '거래처수정이 실패했습니다.',
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
        거래처 수정
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={3}
          sx={{ mb: 3 }}
        >
          <Typography noWrap>새로운 거래처을 입력합니다.</Typography>
          <Controller
            control={control}
            name="inActive"
            render={({ field }) => {
              return (
                <FormControlLabel
                  sx={{ width: 'fit-content' }}
                  control={<Switch checked={field.value} {...field} />}
                  label={
                    <Typography noWrap variant="caption">
                      {field.value ? '거래중' : '거래종료'}
                    </Typography>
                  }
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
              <FormControl>
                <TextField
                  disabled
                  {...field}
                  size="small"
                  label="거래처코드(편집불가)"
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
                  disabled
                  size="small"
                  {...field}
                  required
                  label="거래처이름(편집불가)"
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
          <Controller
            control={control}
            name="storageName"
            render={({ field }) => {
              return (
                <SearchAutoComplete
                  inputValue={field.value ?? ''}
                  onInputChange={field.onChange}
                  loading={networkStatus <= 3}
                  options={storageNameList}
                  setValue={field.onChange}
                  value={field.value ?? ''}
                  scrollRef={() => {}}
                  renderSearchInput={(params: AutocompleteRenderInputParams) => {
                    return (
                      <FormControl fullWidth>
                        <TextField
                          {...params}
                          {...field}
                          label="출고 창고선택"
                          error={!!errors.storageName?.message}
                          helperText={errors.storageName?.message ?? ''}
                          size="small"
                        />
                      </FormControl>
                    );
                  }}
                />
              );
            }}
          />
        </FormGroup>
        <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
            수정
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default EditPClientModal;
