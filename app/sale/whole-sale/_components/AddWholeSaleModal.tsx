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
import { filterEmptyValues } from '@/utils/common';
import {
  CreateWholeSaleForm,
  createWholeSaleSchema,
} from '../_validations/createWholeSaleValidation';
import dayjs from 'dayjs';
import { Client, ClientType } from '@/http/graphql/codegen/graphql';
import { PlusOne } from '@mui/icons-material';
import WholeSaleProductSearch from './WholeSaleProductSearch';
import LabelText from '@/components/ui/typograph/LabelText';
import { EMPTY } from '@/constants';
import { FormControl } from '@mui/base';
import { getProfitRate } from '@/utils/sale';

export const initProductItem = { name: '', code: '', count: 0, salePrice: 0, storage: '' };

export const clients: Client[] = [
  {
    _id: '123123',
    code: 'CL001',
    name: '동부 도매',
    clientType: ClientType.WholeSale,
    feeRate: 2.5,
    businessName: '동부 도매 주식회사',
    businessNumber: '123-45-67890',
    payDate: 15,
    manager: '홍길동',
    managerTel: '010-1234-5678',
    inActive: true,
  },
  {
    _id: '1231234',
    code: 'CL002',
    name: '서부 도매',
    clientType: ClientType.WholeSale,
    feeRate: 3.0,
    businessName: '서부 도매 기술',
    businessNumber: '987-65-43210',
    payDate: 20,
    manager: '김서방',
    managerTel: '010-9876-5432',
    inActive: true,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddWholeSaleModal: FC<Props> = ({ open, onClose }) => {
  const [isManualChangePrice, setIsManualChangePrice] = useState(false);
  const [createProduct, { loading }] = useCreateProduct();

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateWholeSaleForm>({
    resolver: zodResolver(createWholeSaleSchema),
    defaultValues: {
      mallId: '',
      saleAt: dayjs().toDate(),
      productList: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'productList',
  });

  const onSubmit = (createProductInput: CreateWholeSaleForm) => {
    const newValues = filterEmptyValues(createProductInput) as CreateProductForm;
    createProduct({
      variables: {
        createProductInput: newValues,
      },
      onCompleted: () => {
        snackMessage({ message: '도매 판매등록이 완료되었습니다.', severity: 'success' });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '도매 판매등록이 실패했습니다.', severity: 'error' });
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const [mallIdKeyword, setMallIdKeyword] = useState('');
  const delayedMallIdKeyword = useTextDebounce(mallIdKeyword);
  const isLoading = false;

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

  const { payCost, wonCost } = productList.reduce(
    (acc, cur) => {
      const newPayCost = (cur?.count ?? 0) * (cur?.salePrice ?? 0) + acc.payCost;
      const newWonCost = (cur?.count ?? 0) * (cur?.wonPrice ?? 0) + acc.wonCost;
      return { payCost: newPayCost, wonCost: newWonCost };
    },
    { payCost: 0, wonCost: 0 }
  );

  const totalWonCost = wonCost;
  const totalPayCost = isManualChangePrice ? watch('payCost') ?? 0 : payCost;

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
                    value={
                      clients.find((item) => item.name === field.value) ?? {
                        _id: '',
                        name: '',
                        code: '',
                        clientType: ClientType.WholeSale,
                      }
                    }
                    onChange={(_, value) => {
                      field.onChange(value?.name);
                      setValue('telephoneNumber1', value?.managerTel);
                    }}
                    getOptionLabel={(item) => item.name}
                    size="small"
                    options={clients}
                    isOptionEqualToValue={(item1, item2) => item1.name == item2.name}
                    defaultValue={null}
                    inputValue={mallIdKeyword}
                    onInputChange={(_, value) => setMallIdKeyword(value)}
                    loading={isLoading}
                    loadingText="로딩중"
                    noOptionsText="검색 결과가 없습니다."
                    disablePortal
                    renderInput={(params) => (
                      <TextField {...params} sx={{ minWidth: 400 }} label="도매 거래처" required />
                    )}
                    renderOption={(props, item, state) => {
                      const { key, ...rest } = props as any;
                      const isLast = state.index === clients.length - 1;
                      return (
                        <Box component="li" ref={null} key={item.name} {...rest}>
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
            <Controller
              control={control}
              name="payCost"
              render={({ field }) => {
                return (
                  <FormControl>
                    <TextField
                      label="판매가 합계"
                      {...field}
                      value={totalPayCost}
                      size="small"
                      disabled={!isManualChangePrice}
                    />
                  </FormControl>
                );
              }}
            />

            <FormControlLabel
              label={isManualChangePrice ? '수동 입력' : '자동 계산'}
              control={
                <Switch
                  checked={isManualChangePrice}
                  onChange={(_, checked) => setIsManualChangePrice(checked)}
                />
              }
            />
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
                  selectedProductList={productList}
                  index={index}
                  control={control}
                  error={errors.productList?.[index]}
                  key={`${product.code}_${index}_'autocomplete`}
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

export default AddWholeSaleModal;
