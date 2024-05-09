import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Autocomplete, Box, IconButton, Stack, TextField } from '@mui/material';
import { Control, Controller, FieldArrayWithId, FieldErrors } from 'react-hook-form';
import NumberInput from '@/components/ui/input/NumberInput';
import { CreateProductForm, CreateProductStockForm } from '../_validations/createProductStockList';

interface Props {
  index: number;
  control: Control<any>;
  remove: (index: number) => void;
  replace: (
    index: number,
    newItem: FieldArrayWithId<CreateProductStockForm, 'productList', 'id'>
  ) => void;
  error?: FieldErrors<CreateProductForm>;
  isProductFreeze?: boolean;
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

const StockProduct: FC<Props> = ({
  index,
  control,
  remove,
  replace,
  error,
  isProductFreeze = false,
}) => {
  const [productKeyword, setProductKeyword] = useState('');
  const delayedProductKeyword = useTextDebounce(productKeyword ?? '');

  const { data, networkStatus, fetchMore } = useProducts({
    keyword: delayedProductKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const rows = data?.products.data.map((item) => item.name) ?? [];
  const isLoading = networkStatus == 1 || networkStatus == 2 || networkStatus == 3;

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
    newItem: FieldArrayWithId<CreateProductStockForm, 'productList', 'id'>
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
              renderInput={(params) => <TextField {...params} label="창고" required />}
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
        name={`productList.${index}.product`}
        render={({ field }) => {
          return (
            <Autocomplete
              disabled={isProductFreeze}
              value={field.value}
              fullWidth
              filterSelectedOptions
              size="small"
              options={rows}
              // getOptionLabel={(option) => option ?? ''}
              isOptionEqualToValue={(item1, item2) => item1 === item2}
              inputValue={productKeyword}
              onInputChange={(_, value) => setProductKeyword(value)}
              loading={isLoading}
              loadingText="로딩중"
              noOptionsText="검색 결과가 없습니다."
              onChange={(_, value) => {
                field.onChange(value);
              }}
              disablePortal
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="제품 이름"
                  error={!!error?.product?.message}
                  helperText={error?.product?.message ?? ''}
                />
              )}
              renderOption={(props, item, state) => {
                const { key, ...rest } = props as any;
                const isLast = state.index === rows.length - 1;
                return (
                  <Box component="li" ref={isLast ? scrollRef : null} key={item} {...rest}>
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
              field={field}
              label="입고 재고 수량"
              error={!!error?.count?.message}
              helperText={error?.count?.message ?? ''}
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

export default StockProduct;
