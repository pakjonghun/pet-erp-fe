import { FC, useState } from 'react';
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
import { CreateProductForm } from '@/app/back-data/product/_validations/createProductValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { useCreateProduct } from '@/http/graphql/hooks/product/useCreateProduct';
import useTextDebounce from '@/hooks/useTextDebounce';
import { modalSizeProps } from '@/components/commonStyles';
import { filterEmptyValues, getKCWFormat } from '@/utils/common';
import {
  CreateWholeSaleForm,
  CreateWholeSaleProductForm,
  createWholeSaleSchema,
} from '../_validations/createWholeSaleValidation';
import dayjs from 'dayjs';
import { Client, ClientType, WholeSaleItem, WholeSaleOutput } from '@/http/graphql/codegen/graphql';
import { PlusOne } from '@mui/icons-material';
import WholeSaleProductSearch from './WholeSaleProductSearch';
import LabelText from '@/components/ui/typograph/LabelText';
import { EMPTY, LIMIT } from '@/constants';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { getProfitRate } from '@/utils/sale';

export const initProductItem: CreateWholeSaleProductForm = {
  productName: '',
  productCode: '',
  count: 0,
  payCost: 0,
  storageName: '',
};

interface Props {
  open: boolean;
  onClose: () => void;
  wholeSale: WholeSaleItem | null;
}

const EditWholeSaleModal: FC<Props> = ({ wholeSale, open, onClose }) => {
  const [isManualChangePrice, setIsManualChangePrice] = useState(false);
  const [createProduct, { loading }] = useCreateProduct();

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
    clientType: [ClientType.WholeSale, ClientType.Offline],
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
      mallId: wholeSale?.mallId ?? '',
      productList: wholeSale?.productList ?? [],
      saleAt: wholeSale?.saleAt ?? new Date(),
      telephoneNumber1: wholeSale?.telephoneNumber1 ?? '',
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'productList',
  });

  const onSubmit = (createProductInput: CreateWholeSaleForm) => {
    console.log('createProductInput : ', createProductInput);
    const newValues = filterEmptyValues(createProductInput) as CreateProductForm;
    createProduct({
      variables: {
        createProductInput: newValues,
      },
      onCompleted: () => {
        snackMessage({
          message: '도매 판매등록이 완료되었습니다.',
          severity: 'success',
        });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '도매 판매등록이 실패했습니다.',
          severity: 'error',
        });
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAddProduct = () => {
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
  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        도매 판매 등록
      </Typography>
      <Typography sx={{ mb: 3 }}>새로운 도매 판매를 등록합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{ ...modalSizeProps, width: 800 }}>
          <FormLabel>도매 거래처 정보 입력</FormLabel>
          <Controller
            name="mallId"
            control={control}
            render={({ field }) => {
              return (
                <Stack direction="row" alignItems="center" gap={5} flexWrap="wrap">
                  <Autocomplete
                    value={clientRows.find((client) => client.name === field.value)}
                    onChange={(_, value) => {
                      field.onChange(value?.name ?? '');
                      setValue('telephoneNumber1', value?.managerTel ?? EMPTY);
                    }}
                    getOptionLabel={(item) => item.name}
                    size="small"
                    options={clientRows as Client[]}
                    isOptionEqualToValue={(item1, item2) => item1.name == item2.name}
                    defaultValue={{
                      _id: '',
                      name: '',
                      code: '',
                      clientType: ClientType.WholeSale,
                      managerTel: EMPTY,
                    }}
                    inputValue={clientKeyword}
                    onInputChange={(_, value) => setClientKeyword(value)}
                    loading={isClientLoading}
                    loadingText="로딩중"
                    noOptionsText="검색 결과가 없습니다."
                    disablePortal
                    renderInput={(params) => (
                      <TextField {...params} sx={{ minWidth: 400 }} label="도매 거래처" required />
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
                  {!!field.value && (
                    <LabelText label="연락처 : " text={watch('telephoneNumber1') ?? EMPTY} />
                  )}
                </Stack>
              );
            }}
          />
        </FormGroup>
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
            {fields.map((product, index) => {
              return (
                <WholeSaleProductSearch
                  clearError={clearErrors}
                  setError={setError}
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
          <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
            등록
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default EditWholeSaleModal;
