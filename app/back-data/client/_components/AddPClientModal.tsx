import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
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
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateClientForm, createClientSchema } from '../_validations/createClientValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { modalSizeProps } from '@/components/commonStyles';
import { useCreateClient } from '@/http/graphql/hooks/client/useCreateClient';
import { ClientType, Storage } from '@/http/graphql/codegen/graphql';
import { filterEmptyValues } from '@/utils/common';
import { clientTypes } from '../constants';
import NumberInput from '@/components/ui/input/NumberInput';
import { CLIENT_PREFIX, LIMIT } from '@/constants';
import { client } from '@/http/graphql/client';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';
import SearchAutoComplete from '@/components/ui/select/SearchAutoComplete';
import useTextDebounce from '@/hooks/useTextDebounce';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import useInfinityScroll from '@/hooks/useInfinityScroll';

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
      deliveryFreeProductCodeList: [],
      deliveryNotFreeProductCodeList: [],
    },
  });
  const { data: storageData, networkStatus } = useStorages({
    keyword: '',
    limit: 100,
    skip: 0,
  });
  const storageList = (storageData?.storages.data as Storage[]) ?? [];
  const storageNameList = storageList.map((item) => item.name);

  const [productKeyword, setProductKeyword] = useState('');
  const delayedProductKeyword = useTextDebounce(productKeyword);

  const {
    data: products,
    networkStatus: productNetwork,
    fetchMore: productFetchMore,
  } = useProducts({
    keyword: delayedProductKeyword,
    limit: LIMIT,
    skip: 0,
  });
  const productRows = products?.products.data ?? [];
  const cachedOptions = productRows;
  const isProductLoading = productNetwork == 1 || productNetwork == 2 || productNetwork == 3;
  const productCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isProductLoading) return;

      const totalCount = products?.products.totalCount;
      if (totalCount != null && totalCount > productRows.length) {
        productFetchMore({
          variables: {
            productsInput: {
              keyword: delayedProductKeyword,
              limit: LIMIT,
              skip: productRows.length,
            },
          },
        });
      }
    }
  };
  const productScrollRef = useInfinityScroll({ callback: productCallback });

  const onSubmit = (values: CreateClientForm) => {
    const newValues = filterEmptyValues(values) as CreateClientForm;
    createClient({
      variables: {
        createClientInput: {
          ...newValues,
          deliveryFreeProductCodeList:
            values.deliveryFreeProductCodeList?.map((item) => item.code) ?? [],
          deliveryNotFreeProductCodeList:
            values.deliveryNotFreeProductCodeList?.map((item) => item.code) ?? [],
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
          <Typography>새로운 거래처를 입력합니다.</Typography>
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
          <Controller
            control={control}
            name="deliveryFreeProductCodeList"
            render={({ field }) => {
              return (
                <Autocomplete
                  multiple
                  options={cachedOptions}
                  loading={isProductLoading}
                  getOptionLabel={(item) => `${item.name}(${item.code})`}
                  fullWidth
                  disableCloseOnSelect
                  defaultValue={[]}
                  inputValue={productKeyword}
                  onInputChange={(_, newValue) => setProductKeyword(newValue)}
                  noOptionsText="검색 결과가 없습니다."
                  loadingText="로딩중입니다."
                  onChange={(_, value) => field.onChange(value)}
                  // value={field.value ?? []}
                  renderOption={(props, item, state) => {
                    const { key, ...rest } = props as any;
                    const isLast = state.index === cachedOptions.length - 1;
                    return (
                      <Box
                        component="li"
                        ref={isLast ? productScrollRef : null}
                        key={item}
                        {...rest}
                      >
                        {`${item.name}(${item.code})`}
                      </Box>
                    );
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => {
                    return (
                      <FormControl fullWidth>
                        <TextField
                          {...params}
                          name={field.name}
                          label="배송비 무료 제품선택"
                          error={!!errors.deliveryFreeProductCodeList?.message}
                          helperText={errors.deliveryFreeProductCodeList?.message ?? ''}
                          size="small"
                        />
                      </FormControl>
                    );
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="deliveryNotFreeProductCodeList"
            render={({ field }) => {
              return (
                <Autocomplete
                  multiple
                  options={cachedOptions}
                  loading={isProductLoading}
                  getOptionLabel={(item) => `${item.name}(${item.code})`}
                  fullWidth
                  disableCloseOnSelect
                  defaultValue={[]}
                  inputValue={productKeyword}
                  onInputChange={(_, newValue) => setProductKeyword(newValue)}
                  noOptionsText="검색 결과가 없습니다."
                  loadingText="로딩중입니다."
                  onChange={(_, value) => field.onChange(value)}
                  // value={field.value ?? []}
                  renderOption={(props, item, state) => {
                    const { key, ...rest } = props as any;
                    const isLast = state.index === cachedOptions.length - 1;
                    return (
                      <Box
                        component="li"
                        ref={isLast ? productScrollRef : null}
                        key={item}
                        {...rest}
                      >
                        {`${item.name}(${item.code})`}
                      </Box>
                    );
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => {
                    return (
                      <FormControl fullWidth>
                        <TextField
                          {...params}
                          name={field.name}
                          label="배송비 유료 제품선택"
                          error={!!errors.deliveryNotFreeProductCodeList?.message}
                          helperText={errors.deliveryNotFreeProductCodeList?.message ?? ''}
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
            등록
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default CreateClientModal;
