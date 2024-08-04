import { FC, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Autocomplete, Box, IconButton, Paper, Stack, TextField, styled } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import NumberInput from '@/components/ui/input/NumberInput';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { OutOptionProduct } from '@/http/graphql/codegen/graphql';

interface Props {
  selectedOptions: OutOptionProduct[];
  index: number;
  control: Control<any>;
  remove: (index: number) => void;
  // error?: FieldErrors<CreateOptionForm>;
}

const ProductOption: FC<Props> = ({ selectedOptions, index, control, remove }) => {
  const [productKeyword, setProductKeyword] = useState('');
  const delayedProductKeyword = useTextDebounce(productKeyword);

  const {
    data: products,
    networkStatus: productNetwork,
    fetchMore: productFetchMore,
  } = useProducts({
    keyword: delayedProductKeyword,
    limit: LIMIT,
    skip: 0,
  });
  const productRows = products?.products.data ?? [];
  const isProductLoading = productNetwork == 1 || productNetwork == 2 || productNetwork == 3;
  const cachedProductList = useMemo(
    () => productRows.map((row: any) => ({ code: row.code, name: row.name })) ?? [],
    [isProductLoading]
  );

  const productCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isProductLoading) return;

      const totalCount = products?.products.totalCount;
      if (totalCount != null && totalCount > productRows.length) {
        productFetchMore({
          variables: {
            productsInput: {
              keyword: delayedProductKeyword,
              limit: LIMIT,
              skip: productRows.length,
            },
          },
        });
      }
    }
  };
  const productScrollRef = useInfinityScroll({ callback: productCallback });

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
        name={`productOptionList.${index}.productCode`}
        render={({ field }) => {
          return (
            <Autocomplete
              getOptionDisabled={(item) => {
                return selectedOptions.some(
                  (selectedItem) => selectedItem.productCode.code === item.code
                );
              }}
              fullWidth
              sx={{
                minWidth: 200,
              }}
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
              size="small"
              filterOptions={(options, state) => {
                return options.filter((option) => {
                  const codeMatch = option.code.includes(state.inputValue);
                  const nameMatch = (option.name as string)
                    .toLowerCase()
                    .includes(state.inputValue.toLowerCase());

                  return codeMatch || nameMatch;
                });
              }}
              getOptionLabel={(item) => item.name}
              options={cachedProductList}
              isOptionEqualToValue={(item1, item2) => item1.code === item2.code}
              inputValue={productKeyword}
              onInputChange={(_, value) => setProductKeyword(value)}
              loading={isProductLoading}
              loadingText="로딩중"
              noOptionsText="검색 결과가 없습니다."
              renderInput={(params) => (
                <TextField {...params} label="제품 이름이나 코드 입력" required />
              )}
              renderOption={(props, item, state) => {
                const { key, ...rest } = props as any;
                const isLast = state.index === cachedProductList.length - 1;
                return (
                  <Box component="li" ref={isLast ? productScrollRef : null} key={item} {...rest}>
                    {`${item.name}(${item.code})`}
                  </Box>
                );
              }}
            />
          );
        }}
      />

      <Controller
        control={control}
        name={`productOptionList.${index}.count`}
        render={({ field }) => {
          return <NumberInput field={field} label="제품 개수" error={true} helperText={''} />;
        }}
      />

      <IconButton sx={{ width: 40, height: 40 }} onClick={() => remove(index)}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};

export default ProductOption;
