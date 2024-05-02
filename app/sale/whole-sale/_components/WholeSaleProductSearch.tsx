import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  CreateWholeSaleProductForm,
  createWholeSaleProductSchema,
} from '../_validations/createWholeSaleValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { Product } from '@/http/graphql/codegen/graphql';

const WholeSaleProductSearch = () => {
  const {
    watch,
    reset,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateWholeSaleProductForm>({
    resolver: zodResolver(createWholeSaleProductSchema),
    defaultValues: {
      count: 0,
      productCode: '',
      productName: '',
    },
  });

  const productKeyword = watch('productName');
  const delayedProductKeyword = useTextDebounce(productKeyword ?? '');

  const { data, networkStatus, fetchMore } = useProducts({
    keyword: delayedProductKeyword,
    limit: LIMIT,
    skip: 0,
  });
  const rows = data?.products.data ?? [];
  const isLoading = networkStatus == 1 || networkStatus == 2 || networkStatus == 3;

  const setCategory = (product?: Product | null) => {
    if (!product) return;
  };

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.categories.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            categoriesInput: {
              keyword: delayedCategoryKeyword,
              limit: LIMIT,
              skip: rows.length,
            },
          },
        });
      }
    }
  };

  const scrollRef = useInfinityScroll({ callback });

  return (
    <Controller
      control={control}
      name="category"
      render={({ field }) => (
        <SearchAutoComplete
          inputValue={field.value ?? ''}
          onInputChange={field.onChange}
          loading={isLoading}
          options={rows.map((row) => row.name!)}
          setValue={setCategory}
          value={field.value ?? ''}
          scrollRef={scrollRef}
          renderSearchInput={(params: AutocompleteRenderInputParams) => {
            return (
              <FormControl fullWidth>
                <TextField
                  {...params}
                  {...field}
                  label="분류"
                  error={!!errors.category?.message}
                  helperText={errors.category?.message ?? ''}
                  size="small"
                />
              </FormControl>
            );
          }}
        />
      )}
    />
  );
};

export default WholeSaleProductSearch;
