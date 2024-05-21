import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  CreateWholeSaleForm,
  CreateWholeSaleProductForm,
} from '../_validations/createWholeSaleValidation';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Autocomplete, Box, IconButton, Stack, TextField } from '@mui/material';
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import NumberInput from '@/components/ui/input/NumberInput';
import { initProductItem } from './AddWholeSaleModal';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';
import { Storage } from '@/http/graphql/codegen/graphql';
import { useProductCountStocks } from '@/http/graphql/hooks/stock/useProductCountStocks';

interface Props {
  clearError: UseFormClearErrors<CreateWholeSaleForm>;
  setError: UseFormSetError<CreateWholeSaleForm>;
  productId: string;
  index: number;
  control: Control<any>;
  remove: (index: number) => void;
  replace: (
    index: number,
    newItem: FieldArrayWithId<CreateWholeSaleForm, 'productList', 'id'>
  ) => void;
  selectedProductList: CreateWholeSaleProductForm[];
  error?: FieldErrors<CreateWholeSaleProductForm>;
}

const WholeSaleProductSearch: FC<Props> = ({
  productId,
  selectedProductList,
  index,
  control,
  remove,
  replace,
  error,
  clearError,
  setError,
}) => {
  const currentProduct = selectedProductList[index];
  const [productKeyword, setProductKeyword] = useState('');
  const delayedProductKeyword = useTextDebounce(productKeyword ?? '');
  const { data, networkStatus, fetchMore } = useProductCountStocks({
    storageName: currentProduct.storageName,
    keyword: delayedProductKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const rows = data?.productCountStocks?.data ?? [];
  const currentOriginProduct = rows.find(
    (item) => item.code === currentProduct.productCode
  );

  const isLoading =
    networkStatus == 1 || networkStatus == 2 || networkStatus == 3;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.productCountStocks?.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            categoriesInput: {
              keyword: delayedProductKeyword,
              limit: LIMIT,
              skip: rows.length,
            },
          },
        });
      }
    }
  };

  const scrollRef = useInfinityScroll({ callback });

  const [storageKeyword, setStorageKeyword] = useState('');
  const debouncedStorageKeyword = useTextDebounce(storageKeyword);
  const { data: storageData, networkStatus: storageNetwork } = useStorages({
    keyword: debouncedStorageKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const storageRows = (storageData?.storages.data as Storage[]) ?? [];
  const isStorageLoading =
    storageNetwork == 1 || storageNetwork == 2 || storageNetwork == 3;

  const handleReplaceItem = (
    newItem: FieldArrayWithId<CreateWholeSaleForm, 'productList', 'id'>
  ) => {
    replace(index, newItem);
  };

  return (
    <Stack
      sx={{
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        alignItems: {
          xs: 'flex-start',
          md: 'center',
        },
      }}
      justifyContent="space-between"
      gap={2}
    >
      <Controller
        control={control}
        name={`productList.${index}.storageName`}
        render={({ field }) => {
          return (
            <Autocomplete
              fullWidth
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
              sx={{ minWidth: 180 }}
              size="small"
              options={storageRows.map((storage) => storage.name)}
              isOptionEqualToValue={(item1, item2) => item1 === item2}
              defaultValue={null}
              inputValue={storageKeyword}
              onInputChange={(_, value) => setStorageKeyword(value)}
              loading={isStorageLoading}
              loadingText="로딩중"
              noOptionsText="검색 결과가 없습니다."
              disablePortal
              renderInput={(params) => (
                <TextField {...params} label="창고" required />
              )}
              renderOption={(props, item) => {
                const { key, ...rest } = props as any;
                return (
                  <Box component="li" key={item} {...rest}>
                    {item}
                  </Box>
                );
              }}
            />
          );
        }}
      />
      <Controller
        control={control}
        name={`productList.${index}.productName`}
        render={({ field }) => {
          return (
            <Autocomplete
              sx={{ minWidth: 180 }}
              disabled={!currentProduct.storageName}
              value={field.value}
              getOptionDisabled={(option) => {
                return selectedProductList.some(
                  (item) => item.productName === option
                );
              }}
              fullWidth
              filterSelectedOptions
              size="small"
              options={rows.map((item) => item.name)}
              isOptionEqualToValue={(item1, item2) => item1 === item2}
              inputValue={productKeyword}
              onInputChange={(_, value) => setProductKeyword(value)}
              loading={isLoading}
              loadingText="로딩중"
              noOptionsText="검색 결과가 없습니다."
              onChange={(_, value) => {
                field.onChange(value);
                if (!currentProduct) return;

                let newField: FieldArrayWithId<
                  CreateWholeSaleForm,
                  'productList',
                  'id'
                > = {
                  ...initProductItem,
                  id: productId,
                  storageName: currentProduct.storageName,
                };

                if (value != null) {
                  const selectedProduct = rows.find(
                    (item) => item.name === value
                  );

                  if (!selectedProduct) return;

                  newField = {
                    ...currentProduct,
                    id: productId,
                    productName: selectedProduct.name,
                    productCode: selectedProduct.code,
                    payCost: selectedProduct.salePrice ?? 0,
                    wonCost: selectedProduct.wonPrice,
                  };
                }

                handleReplaceItem(newField);
              }}
              disablePortal
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="제품 이름"
                  error={!!error?.productName?.message}
                  helperText={error?.productName?.message ?? ''}
                />
              )}
              renderOption={(props, item, state) => {
                const { key, ...rest } = props as any;
                const isLast = state.index === rows.length - 1;
                return (
                  <Box
                    component="li"
                    ref={isLast ? scrollRef : null}
                    key={item}
                    {...rest}
                  >
                    {item}
                  </Box>
                );
              }}
            />
          );
        }}
      />
      <Controller
        control={control}
        name={`productList.${index}.count`}
        render={({ field }) => {
          return (
            <NumberInput
              sx={{ minWidth: 70, width: '100%' }}
              field={field}
              onChange={(value) => {
                if (!currentOriginProduct) return;

                if (value != null && value > currentOriginProduct.count) {
                  setError(`productList.${index}.count`, {
                    message: `제품 재고가 ${currentOriginProduct.count}EA 남아 있습니다.`,
                  });
                } else {
                  clearError(`productList.${index}.count`);
                }
                field.onChange(value);
              }}
              label="판매수량"
              error={!!error?.count?.message}
              helperText={error?.count?.message ?? ''}
            />
          );
        }}
      />
      <Controller
        control={control}
        name={`productList.${index}.payCost`}
        render={({ field }) => {
          return (
            <NumberInput
              sx={{ minWidth: 70, width: '100%' }}
              helperText={error?.payCost?.message ?? ''}
              error={!!error?.payCost?.message}
              label="판매가"
              field={field}
            />
          );
        }}
      />
      <IconButton sx={{ height: 40, width: 40 }} onClick={() => remove(index)}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};

export default WholeSaleProductSearch;
