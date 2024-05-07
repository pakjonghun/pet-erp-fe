import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  CreateWholeSaleForm,
  CreateWholeSaleProductForm,
} from '../_validations/createWholeSaleValidation';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Autocomplete, Box, IconButton, Stack, TextField } from '@mui/material';
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
} from 'react-hook-form';
import NumberInput from '@/components/ui/input/NumberInput';
import { initProductItem } from './AddWholeSaleModal';

interface Props {
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

const storages = [
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

const WholeSaleProductSearch: FC<Props> = ({
  selectedProductList,
  index,
  control,
  remove,
  replace,
  error,
}) => {
  const currentProduct = selectedProductList[index];
  const [productKeyword, setProductKeyword] = useState('');
  const delayedProductKeyword = useTextDebounce(productKeyword ?? '');

  const { data, networkStatus, fetchMore } = useProducts({
    keyword: delayedProductKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const rows = data?.products.data ?? [];
  const isLoading =
    networkStatus == 1 || networkStatus == 2 || networkStatus == 3;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.products.totalCount;
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

  const handleReplaceItem = (
    newItem: FieldArrayWithId<CreateWholeSaleForm, 'productList', 'id'>
  ) => {
    replace(index, newItem);
  };

  return (
    <Stack direction="row" justifyContent="space-between" gap={2}>
      <Controller
        control={control}
        name={`productList.${index}.storage`}
        render={({ field }) => {
          return (
            <Autocomplete
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
              sx={{ width: 400 }}
              size="small"
              options={storages.map((storage) => storage.name)}
              isOptionEqualToValue={(item1, item2) => item1 === item2}
              defaultValue={null}
              inputValue={storageKeyword}
              onInputChange={(_, value) => setStorageKeyword(value)}
              loading={isLoading}
              loadingText="로딩중"
              noOptionsText="검색 결과가 없습니다."
              disablePortal
              renderInput={(params) => (
                <TextField {...params} label="창고" required />
              )}
              renderOption={(props, item, state) => {
                const { key, ...rest } = props as any;
                const isLast = state.index === storages.length - 1;
                return (
                  <Box component="li" ref={null} key={item} {...rest}>
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
        name={`productList.${index}`}
        render={({ field }) => {
          return (
            <Autocomplete
              value={field.value}
              getOptionDisabled={(option) => {
                return selectedProductList.some(
                  (item) => item.code === option.code
                );
              }}
              fullWidth
              filterSelectedOptions
              size="small"
              options={rows}
              getOptionLabel={(option) => option.name ?? ''}
              isOptionEqualToValue={(item1, item2) => item1._id === item2._id}
              inputValue={productKeyword}
              onInputChange={(_, value) => setProductKeyword(value)}
              loading={isLoading}
              loadingText="로딩중"
              noOptionsText="검색 결과가 없습니다."
              onChange={(_, value) => {
                const prev = field.value;
                const newField =
                  value == null
                    ? {
                        ...prev,
                        ...initProductItem,
                        storage: currentProduct.storage,
                      }
                    : { ...prev, ...currentProduct, ...value };
                handleReplaceItem(newField);
              }}
              disablePortal
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="제품 이름"
                  error={!!error?.name?.message}
                  helperText={error?.name?.message ?? ''}
                />
              )}
              renderOption={(props, item, state) => {
                const { key, ...rest } = props as any;
                const isLast = state.index === rows.length - 1;
                return (
                  <Box
                    component="li"
                    ref={isLast ? scrollRef : null}
                    key={item._id}
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
        name={`productList.${index}.count`}
        render={({ field }) => {
          return (
            <NumberInput
              field={field}
              label="판매수량"
              error={!!error?.count?.message}
              helperText={error?.count?.message ?? ''}
            />
          );
        }}
      />
      <Controller
        control={control}
        name={`productList.${index}.salePrice`}
        render={({ field }) => {
          return (
            <NumberInput
              helperText={error?.salePrice?.message ?? ''}
              error={!!error?.salePrice?.message}
              label="판매가"
              field={field}
            />
          );
        }}
      />
      <IconButton onClick={() => remove(index)}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};

export default WholeSaleProductSearch;
