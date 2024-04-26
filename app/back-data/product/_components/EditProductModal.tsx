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
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  CreateProductForm,
  createProductSchema,
} from '@/app/back-data/product/_validations/createProductValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { useFindManyProductCategory } from '@/http/graphql/hooks/product-category/useFindProductCategories';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT, PRODUCT_PREFIX } from '@/constants';
import { SelectItem } from '@/components/ui/select/SearchAutoComplete';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import SearchAutoComplete from '@/components/ui/select/SearchAutoComplete';
import { useUpdateProduct } from '@/http/graphql/hooks/product/useUpdateProduct';
import { Product } from '@/http/graphql/codegen/graphql';
import { modalSizeProps } from '@/components/commonStyles';
import { emptyValueToNull } from '@/util';
import NumberInput from '@/components/ui/input/NumberInput';

interface Props {
  selectedProduct: Product;
  open: boolean;
  onClose: () => void;
}

const EditProductModal: FC<Props> = ({ open, selectedProduct, onClose }) => {
  const [updateProduct, { loading }] = useUpdateProduct();

  const {
    reset,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      barCode: selectedProduct.barCode ?? '',
      category: selectedProduct.category?.name as string,
      code: selectedProduct.code,
      leadTime: selectedProduct.leadTime,
      maintainDate: selectedProduct.maintainDate,
      name: selectedProduct.name,
      salePrice: selectedProduct.salePrice,
      wonPrice: selectedProduct.wonPrice,
    },
  });

  const [categoryKeyword, setCategoryKeyword] = useState('');
  const delayedCategoryKeyword = useTextDebounce(categoryKeyword);

  const { data, networkStatus, refetch, fetchMore } = useFindManyProductCategory({
    keyword: delayedCategoryKeyword,
    limit: LIMIT,
    skip: 0,
  });
  const rows = data?.categories.data ?? [];

  const categoryName = watch('category');
  const category = rows.find((item) => item.name === categoryName);
  const categoryOption = category ? { _id: category!._id, label: category!.name } : null;

  const setCategory = (selectedCategory: SelectItem | null) => {
    if (!selectedCategory) return;
    setValue('category', selectedCategory?.label ?? '');
  };

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (networkStatus != 1 && networkStatus != 3) {
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
    }
  };

  const scrollRef = useInfinityScroll({ callback });

  useEffect(() => {
    refetch();
  }, [delayedCategoryKeyword, refetch]);
  const onSubmit = (values: CreateProductForm) => {
    const { code, ...newValues } = emptyValueToNull(values) as CreateProductForm;
    updateProduct({
      variables: {
        updateProductInput: {
          ...newValues,
          _id: selectedProduct._id,
          category: category?._id,
        },
      },
      onCompleted: () => {
        snackMessage({ message: '제품편집이 완료되었습니다.', severity: 'success' });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '제품편집이 실패했습니다.', severity: 'error' });
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
        제품 편집
      </Typography>
      <Typography sx={{ mb: 3 }}>제품을 편집합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <FormControl>
                <TextField
                  {...field}
                  disabled
                  size="small"
                  label="제품코드(수정불가)"
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
                  label="제품이름"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="salePrice"
            render={({ field }) => (
              <NumberInput
                field={field}
                label="판매가"
                error={!!errors.salePrice?.message}
                helperText={errors.salePrice?.message ?? ''}
              />
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
            name="maintainDate"
            render={({ field }) => (
              <NumberInput
                field={field}
                label="최소 유지기간(일)"
                error={!!errors.maintainDate?.message}
                helperText={errors.maintainDate?.message ?? ''}
              />
            )}
          />
          <Controller
            control={control}
            name="barCode"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  label="바코드"
                  error={!!errors.barCode?.message}
                  helperText={errors.barCode?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <SearchAutoComplete
            setValue={setCategory}
            value={categoryOption}
            scrollRef={scrollRef}
            renderSearchInput={(params: AutocompleteRenderInputParams) => {
              return (
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <TextField
                        {...field}
                        {...params}
                        onChange={(event) => {
                          field.onChange(event);
                          setCategoryKeyword(event.target.value);
                        }}
                        label="분류"
                        error={!!errors.category?.message}
                        helperText={errors.category?.message ?? ''}
                        size="small"
                      />
                    </FormControl>
                  )}
                />
              );
            }}
            options={rows.map((row) => ({ _id: row._id, label: row.name }))}
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

export default EditProductModal;
