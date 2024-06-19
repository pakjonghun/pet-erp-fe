import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Autocomplete, Box, IconButton, Paper, Stack, TextField, styled } from '@mui/material';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import NumberInput from '@/components/ui/input/NumberInput';
import { CreateProductForm, CreateProductStockForm } from '../_validations/createProductStockList';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';
import { Storage } from '@/http/graphql/codegen/graphql';
import { useSubsidiaryCountStocks } from '@/http/graphql/hooks/stock/useSubsidiaryCountStocks';
import { useProductCountStocks } from '@/http/graphql/hooks/stock/useProductCountStocks';
import { removeTrailNumber } from '@/utils/common';

interface Props {
  clearErrors: UseFormClearErrors<CreateProductStockForm>;
  setError: UseFormSetError<CreateProductStockForm>;
  currentProductList: CreateProductForm[];
  isSubsidiary: boolean;
  index: number;
  control: Control<any>;
  remove: (index: number) => void;
  error?: FieldErrors<CreateProductForm>;
  isProductFreeze?: boolean;
}

const OutStockProduct: FC<Props> = ({
  currentProductList,
  isSubsidiary,
  index,
  control,
  remove,
  error,
  clearErrors,
  setError,
  isProductFreeze = false,
}) => {
  const currentProduct = currentProductList[index];

  const [productKeyword, setProductKeyword] = useState('');
  const delayedProductKeyword = useTextDebounce(productKeyword ?? '');

  const {
    data: subsidiaryData,
    networkStatus: subsidiaryNetwork,
    fetchMore: fetchMoreSubsidiary,
  } = useSubsidiaryCountStocks(
    {
      keyword: delayedProductKeyword,
      skip: 0,
      limit: LIMIT,
      storageName: currentProduct.storageName,
    },
    !isSubsidiary
  );

  const originSubsidiaryList = subsidiaryData?.subsidiaryCountStocks?.data ?? [];
  const originSubsidiary = originSubsidiaryList.find(
    (item) => item.name === currentProduct.productName
  );
  const subsidiaryRows = originSubsidiaryList.map((item) => `${item.name}(${item.code})`) ?? [];

  const isLoadingSubsidiary =
    subsidiaryNetwork == 3 || subsidiaryNetwork == 1 || subsidiaryNetwork == 2;

  const subsidiaryCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoadingSubsidiary) return;

      const totalCount = subsidiaryData?.subsidiaryCountStocks?.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMoreSubsidiary({
          variables: {
            productCountStocksInput: {
              keyword: delayedProductKeyword,
              skip: subsidiaryRows.length,
              limit: LIMIT,
              storageName: currentProduct.storageName,
            },
          },
        });
      }
    }
  };
  const subsidiaryScrollRef = useInfinityScroll({
    callback: subsidiaryCallback,
  });

  const { data, networkStatus, fetchMore } = useProductCountStocks(
    {
      keyword: delayedProductKeyword,
      limit: LIMIT,
      skip: 0,
      storageName: currentProduct.storageName,
    },
    isSubsidiary
  );

  const originProductList = data?.productCountStocks?.data ?? [];
  const rows = originProductList.map((item) => `${item.name}(${item.code})`) ?? [];
  const originProduct = originProductList.find(
    (product) => product.name === currentProduct.productName
  );
  const isLoading = networkStatus == 1 || networkStatus == 2 || networkStatus == 3;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.productCountStocks?.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            productCountStocksInput: {
              keyword: delayedProductKeyword,
              limit: LIMIT,
              skip: rows.length,
              storageName: currentProduct.storageName,
            },
          },
        });
      }
    }
  };

  const productScrollRef = useInfinityScroll({ callback });

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

  const storageRows = ((storageData?.storages.data as Storage[]) ?? []).map((item) => item.name);
  const isStorageLoading = storageStatus == 1 || storageStatus == 2 || storageStatus == 3;

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
  const scrollRef = isSubsidiary ? subsidiaryScrollRef : productScrollRef;
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
                minWidth: 300,
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
              renderInput={(params) => <TextField {...params} label="창고" required />}
              renderOption={(props, item, state) => {
                const { key, ...rest } = props as any;
                const isLast = state.index === storageRows.length - 1;
                return (
                  <Box component="li" ref={isLast ? storageScrollRef : null} key={item} {...rest}>
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
              disabled={isProductFreeze || !currentProduct.storageName}
              value={field.value}
              fullWidth
              sx={{ minWidth: 300 }}
              filterSelectedOptions
              size="small"
              options={isSubsidiary ? subsidiaryRows : rows}
              isOptionEqualToValue={(item1, item2) => item1 === item2}
              inputValue={productKeyword}
              onInputChange={(_, value) => setProductKeyword(value)}
              loading={isLoading}
              loadingText="로딩중"
              noOptionsText="검색 결과가 없습니다."
              onChange={(_, value) => {
                field.onChange(removeTrailNumber(value));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={isSubsidiary ? '부자재 이름(코드)' : '제품 이름(코드)'}
                  error={!!error?.productName?.message}
                  helperText={error?.productName?.message ?? ''}
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
              onChange={(value) => {
                type OriginTarget = { name: string; count: number } | undefined;
                let originTarget: OriginTarget = originProduct;
                if (isSubsidiary) {
                  originTarget = originSubsidiary;
                }

                if (!originTarget) return;

                if (value != null && value > originTarget.count) {
                  setError(`stocks.${index}.count`, {
                    message: `재고가 ${originTarget.count}EA 남아 있습니다.`,
                  });
                } else {
                  clearErrors(`stocks.${index}.count`);
                }
                field.onChange(value);
              }}
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

export default OutStockProduct;
