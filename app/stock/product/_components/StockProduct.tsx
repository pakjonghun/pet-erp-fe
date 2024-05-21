import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import {
  Autocomplete,
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  styled,
} from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import NumberInput from '@/components/ui/input/NumberInput';
import { CreateProductForm } from '../_validations/createProductStockList';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';
import { Storage } from '@/http/graphql/codegen/graphql';
import { useSubsidiaries } from '@/http/graphql/hooks/subsidiary/useSubsidiaries';

interface Props {
  index: number;
  control: Control<any>;
  remove: (index: number) => void;
  error?: FieldErrors<CreateProductForm>;
  isProductFreeze?: boolean;
}

const StockProduct: FC<Props> = ({
  index,
  control,
  remove,
  error,
  isProductFreeze = false,
}) => {
  const [productKeyword, setProductKeyword] = useState('');
  const delayedProductKeyword = useTextDebounce(productKeyword ?? '');

  const {
    data: subsidiaryData,
    networkStatus: subsidiaryNetwork,
    fetchMore: fetchMoreSubsidiary,
  } = useSubsidiaries({
    keyword: delayedProductKeyword,
    skip: 0,
    limit: LIMIT,
  });
  const subsidiaryRows = subsidiaryData?.subsidiaries.data ?? [];
  const isLoadingSubsidiary =
    subsidiaryNetwork == 3 || subsidiaryNetwork == 1 || subsidiaryNetwork == 2;

  const subsidiaryCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoadingSubsidiary) return;

      const totalCount = subsidiaryData?.subsidiaries.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            subsidiariesInput: {
              keyword: delayedProductKeyword,
              skip: subsidiaryRows.length,
              limit: LIMIT,
            },
          },
        });
      }
    }
  };
  const subsidiaryScrollRef = useInfinityScroll({
    callback: subsidiaryCallback,
  });

  const { data, networkStatus, fetchMore } = useProducts({
    keyword: delayedProductKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const rows = data?.products.data.map((item) => item.name) ?? [];
  const isLoading =
    networkStatus == 1 || networkStatus == 2 || networkStatus == 3;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.products.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            productsInput: {
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
  const delayedStorageKeyword = useTextDebounce(storageKeyword ?? '');

  const {
    data: storageData,
    networkStatus: storageStatus,
    fetchMore: fetchMoreStorage,
  } = useStorages({
    keyword: delayedStorageKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const storageRows = ((storageData?.storages.data as Storage[]) ?? []).map(
    (item) => item.name
  );
  const isStorageLoading =
    storageStatus == 1 || storageStatus == 2 || storageStatus == 3;

  const getStorageCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = storageData?.storages.totalCount;
      if (totalCount != null && totalCount > storageRows.length) {
        fetchMoreStorage({
          variables: {
            storagesInput: {
              keyword: delayedProductKeyword,
              limit: LIMIT,
              skip: rows.length,
            },
          },
        });
      }
    }
  };
  const storageScrollRef = useInfinityScroll({ callback: getStorageCallback });

  return (
    <Stack
      sx={{
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
      }}
      justifyContent="space-between"
      gap={2}
    >
      <Controller
        control={control}
        name={`stocks.${index}.storageName`}
        render={({ field }) => {
          return (
            <Autocomplete
              fullWidth
              sx={{
                minWidth: 200,
              }}
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
              size="small"
              options={storageRows}
              isOptionEqualToValue={(item1, item2) => item1 === item2}
              defaultValue={null}
              inputValue={storageKeyword}
              onInputChange={(_, value) => setStorageKeyword(value)}
              loading={isStorageLoading}
              loadingText="로딩중"
              noOptionsText="검색 결과가 없습니다."
              renderInput={(params) => (
                <TextField {...params} label="창고" required />
              )}
              renderOption={(props, item, state) => {
                const { key, ...rest } = props as any;
                const isLast = state.index === storageRows.length - 1;
                return (
                  <Box
                    component="li"
                    ref={isLast ? storageScrollRef : null}
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
        name={`stocks.${index}.productName`}
        render={({ field }) => {
          return (
            <Autocomplete
              disabled={isProductFreeze}
              value={field.value}
              fullWidth
              sx={{ minWidth: 200 }}
              filterSelectedOptions
              size="small"
              options={rows}
              isOptionEqualToValue={(item1, item2) => item1 === item2}
              inputValue={productKeyword}
              onInputChange={(_, value) => setProductKeyword(value)}
              loading={isLoading}
              loadingText="로딩중"
              noOptionsText="검색 결과가 없습니다."
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="제품 이름"
                  error={!!error?.storageName?.message}
                  helperText={error?.storageName?.message ?? ''}
                />
              )}
              renderOption={(props, item, state) => {
                const { key, ...rest } = props as any;
                const isLast = state.index === rows.length - 1;
                return (
                  <Box
                    sx={{ zIndex: 100000 }}
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
        name={`stocks.${index}.count`}
        render={({ field }) => {
          return (
            <NumberInput
              sx={{ minWidth: 80 }}
              field={field}
              label="수량"
              error={!!error?.count?.message}
              helperText={error?.count?.message ?? ''}
            />
          );
        }}
      />

      <IconButton sx={{ width: 40, height: 40 }} onClick={() => remove(index)}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};

export default StockProduct;

const StyledPaper = styled(Paper)(({ theme }) => ({
  zIndex: 9999, // 원하는 z-index 값
}));
