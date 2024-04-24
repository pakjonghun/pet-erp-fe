import BaseModal from '@/components/ui/modal/BaseModal';
import {
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
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateClientForm, createClientSchema } from '../_validations/createClientValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { useCreateProduct } from '@/http/graphql/hooks/product/useCreateProduct';
import { useFindManyCategory } from '@/http/graphql/hooks/category/useFindCategories';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import { SelectItem } from '@/components/ui/select/SearchAutoComplete';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import SearchAutoComplete from '@/components/ui/select/SearchAutoComplete';
import { modalSizeProps } from '@/components/commonStyles';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useCreateClient } from '@/http/graphql/hooks/client/useCreateClient';
import { ClientType, CreateClientDocument } from '@/http/graphql/codegen/graphql';

interface Props {
  open: boolean;
  onClose: () => void;
}

const clientTypes: Record<ClientType, string> = {
  [ClientType.Bender]: '밴더',
  [ClientType.Cs]: 'CS',
  [ClientType.Marketing]: '마케팅',
  [ClientType.Offline]: '오프라인',
  [ClientType.OpenMarket]: '오픈마켓',
  [ClientType.Platform]: '플렛폼',
  [ClientType.ProMall]: '전문몰',
  [ClientType.Reward]: '리워드',
  [ClientType.WholeSale]: '도매몰',
};

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
      feeRate: 0,
      clientType: '',
      businessName: '',
      businessNumber: '',
      payDate: 1,
      manager: '',
      managerTel: '',
      inActive: true,
    },
  });

  const [categoryKeyword, setCategoryKeyword] = useState('');
  const delayedCategoryKeyword = useTextDebounce(categoryKeyword);

  // const rows = data?.categories.data ?? [];

  const onSubmit = (values: CreateClientForm) => {
    createClient({
      variables: {
        createClientInput: {
          ...values,
          feeRate: (Number(values.feeRate) ?? 0) % 100,
        },
      },
      onCompleted: () => {
        snackMessage({ message: '거래처등록이 완료되었습니다.', severity: 'success' });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '거래처등록이 실패했습니다.', severity: 'error' });
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
      <Typography sx={{ mb: 3 }}>새로운 거래처을 입력합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={modalSizeProps}>
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
                    startAdornment: <InputAdornment position="start">c - </InputAdornment>,
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
                <TextField
                  size="small"
                  {...field}
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  type="number"
                  label="수수료 비율"
                  error={!!errors.feeRate?.message}
                  helperText={errors.feeRate?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="clientType"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  label="거래처 형태"
                  error={!!errors.clientType?.message}
                  helperText={errors.clientType?.message ?? ''}
                />
              </FormControl>
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
            name="payDate"
            render={({ field }) => (
              <TextField
                type="number"
                size="small"
                {...field}
                label="결제일(매달 결제할 날짜(1~31사이 값을 입력)"
                error={!!errors.businessName?.message}
                helperText={errors.businessName?.message ?? ''}
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
                  label="관리자"
                  error={!!errors.manager?.message}
                  helperText={errors.manager?.message ?? ''}
                />
              </FormControl>
            )}
          />

          {/* <SearchAutoComplete
            setValue={setCategory}
            value={categoryOption}
            scrollRef={null}
            renderSearchInput={(params: AutocompleteRenderInputParams) => {
              return (
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <TextField
                        {...field}
                        {...params}
                        onChange={(event) => {
                          field.onChange(event);
                          setCategoryKeyword(event.target.value);
                        }}
                        label="분류"
                        error={!!errors.category?.message}
                        helperText={errors.category?.message ?? ''}
                        size="small"
                      />
                    </FormControl>
                  )}
                />
              );
            }}
            options={rows.map((row) => ({ _id: row._id, label: row.name }))}
          /> */}
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
