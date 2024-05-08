import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
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
import {
  CreateOrderForm,
  CreateOrderProductForm,
} from '../_validations/createOrderValidation';

interface Props {
  index: number;
  control: Control<any>;
  remove: (index: number) => void;
  replace: (
    index: number,
    newItem: FieldArrayWithId<CreateOrderForm, 'products', 'id'>
  ) => void;
  error?: FieldErrors<CreateOrderProductForm>;
}

const OrderProduct: FC<Props> = ({
  index,
  control,
  remove,
  replace,
  error,
}) => {
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
    newItem: FieldArrayWithId<CreateOrderForm, 'products', 'id'>
  ) => {
    replace(index, newItem);
  };

  return (
    <Stack direction="row" justifyContent="space-between" gap={2}>
      <Controller
        control={control}
        name={`products.${index}.product`}
        render={({ field }) => {
          return (
            <Autocomplete
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
              sx={{ width: 400 }}
              size="small"
              options={rows.map((item) => item.name)}
              isOptionEqualToValue={(item1, item2) => item1 === item2}
              defaultValue={null}
              inputValue={storageKeyword}
              onInputChange={(_, value) => setStorageKeyword(value)}
              loading={isLoading}
              loadingText="로딩중"
              noOptionsText="검색 결과가 없습니다."
              disablePortal
              renderInput={(params) => (
                <TextField {...params} label="제품" required />
              )}
              renderOption={(props, item, state) => {
                const { key, ...rest } = props as any;
                const isLast = state.index === rows.length - 1;
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
        name={`products.${index}.count`}
        render={({ field }) => {
          return (
            <NumberInput
              helperText={error?.count?.message ?? ''}
              error={!!error?.count?.message}
              label="발주 수량"
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

export default OrderProduct;
