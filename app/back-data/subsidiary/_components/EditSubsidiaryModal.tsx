import { FC, useState } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  AutocompleteRenderInputParams,
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT, PRODUCT_PREFIX } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import SearchAutoComplete from '@/components/ui/select/SearchAutoComplete';
import { modalSizeProps } from '@/components/commonStyles';
import { emptyValueToNull } from '@/utils/common';
import NumberInput from '@/components/ui/input/NumberInput';
import {
  CreateSubsidiaryForm,
  createSubsidiarySchema,
} from '../_validations/createSubsidiaryValidation';
import MultiAutoComplete from '@/components/ui/select/MultiAutoComplete';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { useSubsidiaryCategories } from '@/http/graphql/hooks/subsidiary-category/useSubsidiaryCategories';
import { Subsidiary } from '@/http/graphql/codegen/graphql';
import { useUpdateSubsidiary } from '@/http/graphql/hooks/subsidiary/useUpdateSubsidiary';

interface Props {
  selectedSubsidiary: Subsidiary;
  open: boolean;
  onClose: () => void;
}

const AddSubsidiaryModal: FC<Props> = ({ open, selectedSubsidiary, onClose }) => {
  const [updateSubsidiary, { loading }] = useUpdateSubsidiary();
  const isEmptyProductList =
    !selectedSubsidiary.productList ||
    (selectedSubsidiary.productList.length === 1 && selectedSubsidiary.productList[0].name == '');

  const {
    reset,
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSubsidiaryForm>({
    resolver: zodResolver(createSubsidiarySchema),
    defaultValues: {
      code: selectedSubsidiary.code,
      name: selectedSubsidiary.name,
      category: selectedSubsidiary.category?.name,
      leadTime: selectedSubsidiary.leadTime,
      productList: isEmptyProductList
        ? null
        : selectedSubsidiary.productList?.map((item) => item.name),
      wonPrice: selectedSubsidiary.wonPrice,
    },
  });
  const categoryKeyword = watch('category');
  const delayedCategoryKeyword = useTextDebounce(categoryKeyword ?? '');

  const {
    data: categories,
    networkStatus: categoryNetwork,
    fetchMore: categoryFetchMore,
  } = useSubsidiaryCategories({
    keyword: delayedCategoryKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const categoryRows = categories?.subsidiaryCategories.data ?? [];
  const isCategoryLoading = categoryNetwork == 1 || categoryNetwork == 2 || categoryNetwork == 3;
  const categoryCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isCategoryLoading) return;

      const totalCount = categories?.subsidiaryCategories.totalCount;
      if (totalCount != null && totalCount > categoryRows.length) {
        categoryFetchMore({
          variables: {
            categoriesInput: {
              keyword: delayedCategoryKeyword,
              limit: LIMIT,
              skip: categoryRows.length,
            },
          },
        });
      }
    }
  };
  const categoryScrollRef = useInfinityScroll({ callback: categoryCallback });

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

  const onSubmit = (values: CreateSubsidiaryForm) => {
    const productList = getValues('productList');
    const { code, ...newValues } = emptyValueToNull({
      ...values,
      productList,
    }) as CreateSubsidiaryForm;

    updateSubsidiary({
      variables: {
        updateSubsidiaryInput: {
          ...newValues,
          _id: selectedSubsidiary._id,
        },
      },
      onCompleted: () => {
        snackMessage({ message: '부자재편집이 완료되었습니다.', severity: 'success' });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '부자재편집이 실패했습니다.', severity: 'error' });
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        부자재 업데이트
      </Typography>
      <Typography sx={{ mb: 3 }}>새로운 부자재을 업데이트합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  {...field}
                  disabled
                  size="small"
                  required
                  label="부자재코드(편집 불가)"
                  error={!!errors.code?.message}
                  helperText={errors.code?.message ?? ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{`${PRODUCT_PREFIX} - `}</InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  size="small"
                  {...field}
                  required
                  label="부자재이름"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="wonPrice"
            render={({ field }) => (
              <NumberInput
                field={field}
                label="원가"
                error={!!errors.wonPrice?.message}
                helperText={errors.wonPrice?.message ?? ''}
              />
            )}
          />
          <Controller
            control={control}
            name="leadTime"
            render={({ field }) => (
              <NumberInput
                field={field}
                label="리드타임(일)"
                error={!!errors.leadTime?.message}
                helperText={errors.leadTime?.message ?? ''}
              />
            )}
          />
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <SearchAutoComplete
                inputValue={field.value ?? ''}
                onInputChange={(event) => field.onChange(event)}
                loading={isCategoryLoading}
                setValue={(value) => field.onChange(value)}
                value={field.value ?? ''}
                scrollRef={categoryScrollRef}
                options={categoryRows.map((item) => item?.name ?? '') ?? []}
                renderSearchInput={(params: AutocompleteRenderInputParams) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        {...params}
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
          <Controller
            control={control}
            name="productList"
            render={({ field }) => (
              <MultiAutoComplete
                inputValue={productKeyword}
                onInputChange={(_, newValue) => setProductKeyword(newValue)}
                loading={isProductLoading}
                onChange={(value) => field.onChange(value)}
                value={field.value ?? []}
                scrollRef={productScrollRef}
                options={productRows.map((row) => row.name) ?? []}
                renderSearchInput={(params: AutocompleteRenderInputParams) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        {...params}
                        name={field.name}
                        label="부자재를 사용하는 제품 선택"
                        error={!!errors.productList?.message}
                        helperText={errors.productList?.message ?? ''}
                        size="small"
                      />
                    </FormControl>
                  );
                }}
              />
            )}
          />
        </FormGroup>
        <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
            편집
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default AddSubsidiaryModal;
