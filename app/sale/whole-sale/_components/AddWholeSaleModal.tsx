import { FC, useState } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { CreateProductForm } from '@/app/back-data/product/_validations/createProductValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { useCreateProduct } from '@/http/graphql/hooks/product/useCreateProduct';
import useTextDebounce from '@/hooks/useTextDebounce';
import { modalSizeProps } from '@/components/commonStyles';
import { filterEmptyValues } from '@/utils/common';
import NumberInput from '@/components/ui/input/NumberInput';
import {
  CreateWholeSaleForm,
  CreateWholeSaleProductForm,
  createWholeSaleSchema,
} from '../_validations/createWholeSaleValidation';
import dayjs from 'dayjs';
import { Product, WholesaleSupplier } from '@/http/graphql/codegen/graphql';
import { PlusOne } from '@mui/icons-material';
import WholeSaleProductSearch from './WholeSaleProductSearch';

const options: WholesaleSupplier[] = [
  {
    _id: '123123',
    name: 'Green Distributors Ltd.',
    address1: '123 Elm Street, Springfield',
    telephoneNumber1: '555-1234',
    feeRate: 5,
  },
  {
    _id: '1231234',
    name: 'Blue Wholesale Co.',
    address1: '456 Oak Avenue, Riverdale',
    telephoneNumber1: '555-5678',
    feeRate: 6,
  },
  {
    _id: '1231235',
    name: 'Red Supply Partners',
    address1: '789 Pine Road, Greendale',
    telephoneNumber1: '555-9012',
    feeRate: 7,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddWholeSaleModal: FC<Props> = ({ open, onClose }) => {
  const [createProduct, { loading }] = useCreateProduct();

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<CreateWholeSaleForm>({
    resolver: zodResolver(createWholeSaleSchema),
    defaultValues: {
      mallId: '',
      saleAt: dayjs().toDate(),
      productList: [],
    },
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
  const handleChangeValue = (_: any, value: WholesaleSupplier | null) => {
    setValue('mallId', value?.name ?? '', { shouldValidate: true });
  };

  const handleAddProduct = () => {
    const productList = getValues('productList');
    const newProductList = productList.concat({ name: '', code: '', count: 0 });
    setValue('productList', newProductList);
  };

  const addProduct = (product: Product | null, index: number) => {
    const prevProductCount = getValues(`productList.${index}.count`);

    if (!product) return;

    const newProduct: CreateWholeSaleProductForm = {
      name: product.name,
      code: product.code,
      count: prevProductCount == null ? 0 : prevProductCount,
      wonCost: product.wonPrice,
      payCost: product.salePrice,
    };

    const productList = getValues('productList');
    const preProductList = productList.slice(0, index);
    const suffixProductList = productList.slice(index + 1);
    const newProductList = [...preProductList, newProduct, ...suffixProductList];
    setValue('productList', newProductList);
    calculatePrice();
  };

  const removeProductList = (index: number) => {
    const productList = getValues('productList');
    const preProductList = productList.slice(0, index);
    const suffixProductList = productList.slice(index + 1);
    const newProductList = [...preProductList, ...suffixProductList];
    setValue('productList', newProductList);
    calculatePrice();
  };

  const calculatePrice = () => {
    calculateWonPrice();
    if (!isManualCalculate) {
      calculatePayCost();
    }
  };

  const currentProductList = watch('productList');

  const [isManualCalculate, setIsManualCalculate] = useState(false);

  const calculatePayCost = () => {
    const productList = getValues('productList');
    const payCost = productList.reduce((acc, cur) => {
      const newPayCost = (acc ?? 0) + (cur?.payCost ?? 0) * (cur?.count ?? 0);
      return newPayCost;
    }, 0);
    setValue('payCost', payCost);
  };

  const calculateWonPrice = () => {
    const productList = getValues('productList');
    const wonCost = productList.reduce((acc, cur) => {
      const newWonCost = (acc ?? 0) + (cur?.wonCost ?? 0) * (cur?.count ?? 0);
      return newWonCost;
    }, 0);
    setValue('wonCost', wonCost);
  };

  const handleChangeCount = (index: number, count: number | null) => {
    setValue(`productList.${index}.count`, count);
    calculatePrice();
  };

  const handleCheckIsManualCalculate = (value: boolean) => {
    setIsManualCalculate(value);

    if (value) {
      setValue('payCost', 0);
    } else {
      calculatePayCost();
    }
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        도매 판매 등록
      </Typography>
      <Typography sx={{ mb: 3 }}>새로운 도매 판매를 등록합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={modalSizeProps}>
          <FormLabel>도매 거래처 정보 입력</FormLabel>
          <Autocomplete
            clearIcon="nono"
            size="small"
            options={options}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(item1, item2) => item1._id === item2._id}
            defaultValue={null}
            inputValue={mallIdKeyword}
            onInputChange={(_, value) => setMallIdKeyword(value)}
            loading={isLoading}
            loadingText="로딩중"
            noOptionsText="검색 결과가 없습니다."
            onChange={handleChangeValue}
            disablePortal
            renderInput={(params) => <TextField {...params} label="도매 거래처" required />}
            renderOption={(props, item, state) => {
              const { key, ...rest } = props as any;
              const isLast = state.index === options.length - 1;
              return (
                <Box component="li" ref={null} key={item} {...rest}>
                  {item.name}
                </Box>
              );
            }}
          />
          <Stack direction="row" gap={2} alignItems="center" justifyContent="space-between">
            <Controller
              control={control}
              name="payCost"
              render={({ field }) => (
                <NumberInput
                  textFieldProps={{
                    disabled: !isManualCalculate,
                  }}
                  endAdornment={<InputAdornment position="start">₩</InputAdornment>}
                  field={field}
                  label="판매가"
                  error={!!errors.payCost?.message}
                  helperText={errors.payCost?.message ?? ''}
                />
              )}
            />
            <FormControlLabel
              sx={{ whiteSpace: 'nowrap' }}
              label="수동 입력"
              control={
                <Checkbox
                  onChange={(_, checked) => handleCheckIsManualCalculate(checked)}
                  checked={isManualCalculate}
                />
              }
            />
          </Stack>
          <Controller
            control={control}
            name="wonCost"
            render={({ field }) => (
              <NumberInput
                textFieldProps={{
                  disabled: true,
                }}
                endAdornment={<InputAdornment position="start">₩</InputAdornment>}
                field={field}
                label="원가"
                error={!!errors.wonCost?.message}
                helperText={errors.wonCost?.message ?? ''}
              />
            )}
          />
        </FormGroup>
        <FormGroup sx={{ mt: 4 }}>
          <Stack direction="row" alignItems="center" gap={3}>
            <FormLabel>판매 제품 목록</FormLabel>
            <Button onClick={handleAddProduct} variant="outlined" endIcon={<PlusOne />}>
              추가
            </Button>
          </Stack>
          <Stack sx={{ mt: 2 }} gap={2}>
            {currentProductList.map((product, index) => {
              return (
                <WholeSaleProductSearch
                  handleChangeCount={handleChangeCount}
                  productError={!!errors.productList?.[index]?.name?.message}
                  productErrorMessage={errors.productList?.[index]?.name?.message ?? ''}
                  selectedProduct={product}
                  control={control}
                  countError={!!errors.productList?.[index]?.count?.message}
                  countErrorMessage={errors.productList?.[index]?.count?.message ?? ''}
                  selectedProductList={currentProductList}
                  key={`${product.code}_${index}`}
                  index={index}
                  addProduct={addProduct}
                  removeProductList={removeProductList}
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
