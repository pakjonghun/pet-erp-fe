import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { CreateWholeSaleProductForm } from '../_validations/createWholeSaleValidation';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { Product } from '@/http/graphql/codegen/graphql';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Autocomplete, Box, IconButton, Stack, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import NumberInput from '@/components/ui/input/NumberInput';

interface Props {
  handleChangeCount: (index: number, count: number | null) => void;
  productError: boolean;
  productErrorMessage: string;
  index: number;
  selectedProductList: CreateWholeSaleProductForm[];
  countError: boolean;
  countErrorMessage: string;
  removeProductList: (index: number) => void;
  addProduct: (product: Product | null, index: number) => void;
  control?: Control<any>;
  selectedProduct: CreateWholeSaleProductForm;
}

const WholeSaleProductSearch: FC<Props> = ({
  handleChangeCount,
  productError,
  productErrorMessage,
  control,
  countError,
  countErrorMessage,
  addProduct,
  removeProductList,
  selectedProductList,
  selectedProduct,
  index,
}) => {
  const [productKeyword, setProductKeyword] = useState('');
  const delayedProductKeyword = useTextDebounce(productKeyword ?? '');

  const { data, networkStatus, fetchMore } = useProducts({
    keyword: delayedProductKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const rows = data?.products.data ?? [];
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

  const handleChangeValue = (_: any, product: Product | null) => {
    addProduct(product, index);
  };

  return (
    <Stack direction="row" justifyContent="space-between" gap={2}>
      <Autocomplete
        getOptionDisabled={(option) => {
          return selectedProductList.some((item) => item.code === option.code);
        }}
        value={selectedProduct as unknown as Product}
        fullWidth
        filterSelectedOptions
        size="small"
        options={rows}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(item1, item2) => item1._id === item2._id}
        defaultValue={null}
        inputValue={productKeyword}
        onInputChange={(_, value) => setProductKeyword(value)}
        loading={isLoading}
        loadingText="로딩중"
        noOptionsText="검색 결과가 없습니다."
        onChange={handleChangeValue}
        disablePortal
        renderInput={(params) => (
          <TextField
            {...params}
            label="제품 이름"
            error={productError}
            helperText={productErrorMessage}
          />
        )}
        renderOption={(props, item, state) => {
          const { key, ...rest } = props as any;
          const isLast = state.index === rows.length - 1;
          return (
            <Box component="li" ref={isLast ? scrollRef : null} key={item} {...rest}>
              {item.name}
            </Box>
          );
        }}
      />
      <Controller
        control={control}
        name={`productList.${index}.count`}
        render={({ field }) => (
          <NumberInput
            onChange={(count: number | null) => {
              handleChangeCount(index, count);
            }}
            helperText={countErrorMessage}
            error={countError}
            label="수량"
            field={field}
          />
        )}
      />
      <IconButton onClick={() => removeProductList(index)}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};

export default WholeSaleProductSearch;
