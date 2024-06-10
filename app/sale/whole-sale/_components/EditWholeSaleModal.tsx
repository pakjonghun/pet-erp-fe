import { FC, useEffect, useState } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, FieldArrayWithId, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import useTextDebounce from '@/hooks/useTextDebounce';
import { modalSizeProps } from '@/components/commonStyles';
import { filterEmptyValues } from '@/utils/common';
import {
  CreateWholeSaleForm,
  CreateWholeSaleProductForm,
  createWholeSaleSchema,
} from '../_validations/createWholeSaleValidation';
import { Client, ClientType, WholeSaleItem } from '@/http/graphql/codegen/graphql';
import { PlusOne } from '@mui/icons-material';
import WholeSaleProductSearch from './WholeSaleProductSearch';
import LabelText from '@/components/ui/typograph/LabelText';
import { EMPTY, LIMIT } from '@/constants';
import { getProfitRate } from '@/utils/sale';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { client } from '@/http/graphql/client';
import { useUpdateWholeSale } from '@/http/graphql/hooks/wholeSale/useUpdateWholeSale';
import NumberInput from '@/components/ui/input/NumberInput';

export const initProductItem: CreateWholeSaleProductForm = {
  storageName: '',
  productName: '',
  productCode: '',
  count: 0,
  payCost: 0,
  wonCost: 0,
};

interface Props {
  open: boolean;
  wholeSale: WholeSaleItem;
  onClose: () => void;
  setSelectedWholeSale: (item: null | WholeSaleItem) => void;
}

const EditWholeSaleModal: FC<Props> = ({ open, wholeSale, onClose, setSelectedWholeSale }) => {
  const [updateWholeSale, { loading }] = useUpdateWholeSale();
  const [clientKeyword, setClientKeyword] = useState('');
  const delayedClientKeyword = useTextDebounce(clientKeyword);
  const {
    data: clientData,
    networkStatus: clientNetwork,
    fetchMore: clientFetchMore,
  } = useClients({
    keyword: delayedClientKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const isClientLoading = clientNetwork === 1 || clientNetwork === 2 || clientNetwork === 3;
  const clientRows = (clientData?.clients.data as Client[]) ?? [];

  const clientCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isClientLoading) return;

      const totalCount = clientData?.clients.totalCount;
      if (!totalCount || totalCount <= clientRows.length) return;

      clientFetchMore({
        variables: {
          clientsInput: {
            keyword: delayedClientKeyword,
            limit: LIMIT,
            skip: 0,
            clientType: [ClientType.WholeSale, ClientType.Offline],
          },
        },
      });
    }
  };

  const clientScrollRef = useInfinityScroll({ callback: clientCallback });

  const {
    clearErrors,
    setError,
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateWholeSaleForm>({
    resolver: zodResolver(createWholeSaleSchema),
    defaultValues: {
      ...wholeSale,
      deliveryBoxCount: wholeSale.deliveryBoxCount ?? 1,
      productList: wholeSale.productList,
      isDone: !!wholeSale.isDone,
      saleAt: new Date(wholeSale.saleAt),
    },
  });

  useEffect(() => {
    reset({
      ...wholeSale,
      deliveryBoxCount: wholeSale.deliveryBoxCount ?? 1,
      isDone: !!wholeSale.isDone,
      saleAt: new Date(wholeSale.saleAt),
    });
  }, [wholeSale, reset]);

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'productList',
  });

  const onSubmit = (createProductInput: CreateWholeSaleForm) => {
    const newValues = filterEmptyValues(createProductInput) as CreateWholeSaleForm;
    updateWholeSale({
      variables: {
        updateWholeSaleInput: {
          wholeSaleId: wholeSale._id,
          ...newValues,
        },
      },
      onCompleted: (res) => {
        snackMessage({
          message: '비 사방넷 판매 편집이 완료되었습니다.',
          severity: 'success',
        });
        if (Array.isArray(res.updateWholeSale) && res.updateWholeSale[0]) {
          console.log('res.updateWholeSale[0] : ', res.updateWholeSale[0]);
          setSelectedWholeSale(res.updateWholeSale[0] as WholeSaleItem);
        }
        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'wholeSales' });
            cache.evict({ fieldName: 'dashboardClients' });
            cache.evict({ fieldName: 'stocks' });
            cache.evict({ fieldName: 'stocksState' });
            cache.evict({ fieldName: 'productCountStocks' });
            cache.evict({ fieldName: 'productSales' });
            cache.evict({ fieldName: 'productSale' });
            cache.evict({ fieldName: 'topClients' });
          },
        });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '비 사방넷 판매 편집이 실패했습니다.',
          severity: 'error',
        });
      },
    });
  };

  const handleClose = () => {
    // reset();
    onClose();
  };

  const handleAddProduct = () => {
    if (productList.length === 0) {
      clearErrors('productList');
    }
    append(initProductItem);
  };

  const handleReplace = (
    index: number,
    newItem: FieldArrayWithId<CreateWholeSaleForm, 'productList', 'id'>
  ) => {
    const newFields = [...fields];
    newFields[index] = newItem;
    replace(newFields);
  };

  const productList = watch('productList');

  const { totalPayCost, totalWonCost } = productList.reduce(
    (acc, cur) => {
      const newPayCost = cur.count * cur.payCost + acc.totalPayCost;
      const newWonCost = cur.count * (cur.wonCost ?? 0) + acc.totalWonCost;
      return { totalPayCost: newPayCost, totalWonCost: newWonCost };
    },
    { totalPayCost: 0, totalWonCost: 0 }
  );

  const telNumber = watch('telephoneNumber1');

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        비 사방넷 판매 편집
      </Typography>
      <Typography sx={{ mb: 3 }}>비 사방넷 판매를 편집합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{ ...modalSizeProps, mb: 2 }}>
          <Stack direction="row" gap={3} alignItems="center">
            <FormLabel>거래처 정보 입력</FormLabel>
            <Controller
              control={control}
              name="isDone"
              render={({ field }) => {
                return (
                  <FormControlLabel
                    label={field.value ? '정산완료' : '정산중'}
                    control={<Switch checked={field.value} {...field} />}
                  />
                );
              }}
            />
          </Stack>
          <Stack
            sx={{
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              alignItems: {
                xs: 'flex-start',
              },
            }}
            gap={3}
          >
            <Controller
              name="mallId"
              control={control}
              render={({ field }) => {
                return (
                  <Autocomplete
                    fullWidth
                    sx={{ minWidth: 300 }}
                    value={clientRows.find((client) => client.name === field.value)}
                    onChange={(_, value) => {
                      field.onChange(value?.name ?? '');
                      setValue('telephoneNumber1', value?.managerTel ?? EMPTY);
                    }}
                    getOptionLabel={(item) => item.name}
                    size="small"
                    options={clientRows as Client[]}
                    isOptionEqualToValue={(item1, item2) => item1 == item2}
                    defaultValue={{
                      _id: '',
                      name: field.value,
                      code: '',
                      clientType: ClientType.WholeSale,
                      managerTel: EMPTY,
                    }}
                    inputValue={clientKeyword}
                    onInputChange={(_, value) => setClientKeyword(value)}
                    loading={isClientLoading}
                    loadingText="로딩중"
                    noOptionsText="검색 결과가 없습니다."
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        value={field.value}
                        label="거래처"
                        required
                        error={!!errors.mallId?.message}
                        helperText={errors.mallId?.message ?? ''}
                      />
                    )}
                    renderOption={(props, item, state) => {
                      const { key, ...rest } = props as any;
                      const isLast = state.index === clientRows.length - 1;
                      return (
                        <Box
                          component="li"
                          ref={isLast ? clientScrollRef : null}
                          key={item.name}
                          {...rest}
                        >
                          {item.name}
                        </Box>
                      );
                    }}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="saleAt"
              render={({ field }) => {
                return (
                  <DatePicker
                    sx={{
                      '& input': {
                        py: 1.2,
                      },
                      width: '100%',
                      minWidth: 160,
                    }}
                    label="판매날짜"
                    value={dayjs(field.value)}
                    onChange={(value) => {
                      if (!value) return;
                      const _value = value as any;
                      field.onChange(new Date(_value));
                    }}
                  />
                );
              }}
            />
          </Stack>
          <Controller
            control={control}
            name={'deliveryBoxCount'}
            render={({ field }) => {
              return (
                <NumberInput
                  sx={{ minWidth: 70, width: '100%' }}
                  helperText={errors?.deliveryBoxCount?.message ?? ''}
                  error={!!errors?.deliveryBoxCount?.message}
                  label="송장 개수"
                  field={field}
                />
              );
            }}
          />
        </FormGroup>
        {!!telNumber && <LabelText label="연락처 : " text={telNumber ?? EMPTY} />}
        {productList.length > 0 && (
          <Stack direction="row" sx={{ mt: 2 }} gap={3} alignItems="center">
            <LabelText label="판매가" text={totalPayCost} />
            <LabelText label="원가" text={totalWonCost} />
            <LabelText label="수익" text={totalPayCost - totalWonCost} />
            <LabelText
              label="수익율"
              text={getProfitRate(totalPayCost - totalWonCost, totalPayCost) + '%'}
            />
          </Stack>
        )}
        <FormGroup sx={{ mt: 4 }}>
          <Stack direction="row" alignItems="center" gap={3}>
            <FormLabel>판매 제품 목록</FormLabel>
            <Button onClick={handleAddProduct} variant="outlined" endIcon={<PlusOne />}>
              추가
            </Button>
          </Stack>
          <Stack sx={{ mt: 2 }} gap={2}>
            <Typography sx={{ mt: 1 }} color="error" variant="caption">
              {errors?.productList?.message ?? errors?.productList?.root?.message ?? ''}
            </Typography>
            {fields.map((product, index) => {
              return (
                <WholeSaleProductSearch
                  isEdit
                  setError={setError}
                  clearError={clearErrors}
                  productId={product.id}
                  selectedProductList={productList}
                  index={index}
                  control={control}
                  error={errors.productList?.[index]}
                  key={`${product.productCode}_${index}_'autocomplete`}
                  remove={remove}
                  replace={handleReplace}
                />
              );
            })}
          </Stack>
        </FormGroup>
        <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button
            disabled={Object.keys(errors).length > 0}
            type="submit"
            endIcon={loading ? <CommonLoading /> : ''}
            variant="contained"
          >
            편집
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default EditWholeSaleModal;
