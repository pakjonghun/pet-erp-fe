import { FC, useEffect, useState } from 'react';
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
import { CreateProductForm, createProductSchema } from '../_validations/createProductValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { useFindManyCategory } from '@/api/graphql/hooks/category/useFindCategories';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import SearchAutoComplete, { SelectItem } from '@/components/ui/select/SearchAutoComplete';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useUpdateProduct } from '@/api/graphql/hooks/product/useUpdateProduct';
import { ProductOutput } from '@/api/graphql/codegen/graphql';

interface Props {
  selectedProduct: ProductOutput;
  open: boolean;
  onClose: () => void;
}

const EditProductModal: FC<Props> = ({ open, selectedProduct, onClose }) => {
  const [editProduct, { loading }] = useUpdateProduct();

  const {
    reset,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      barCode: selectedProduct.barCode ?? '',
      category: selectedProduct.category?.name ?? '',
      code: selectedProduct.code,
      leadTime: selectedProduct.leadTime ?? 0,
      maintainDate: selectedProduct.maintainDate ?? 0,
      name: selectedProduct.name,
      salePrice: selectedProduct.salePrice ?? 0,
      wonPrice: selectedProduct.wonPrice ?? 0,
    },
  });

  const [categoryKeyword, setCategoryKeyword] = useState('');
  const delayedCategoryKeyword = useTextDebounce(categoryKeyword);

  const { data, networkStatus, refetch, fetchMore } = useFindManyCategory({
    keyword: delayedCategoryKeyword,
    limit: LIMIT,
    skip: 0,
  });
  const rows = data?.categories.data ?? [];

  const categoryName = watch('category');
  const category = rows.find((item) => item.name === categoryName);
  const categoryOption = category ? { label: category.name, _id: category._id } : null;

  const setCategory = (selectedCategory: SelectItem | null) => {
    setValue('category', selectedCategory ? selectedCategory.label : '');
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
    editProduct({
      variables: {
        updateProductInput: {
          _id: selectedProduct._id,
          ...values,
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
        제품 입력
      </Typography>
      <Typography sx={{ mb: 3 }}>제품 정보를 편집합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{ gap: 2 }}>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  {...field}
                  sx={{ minWidth: 400 }}
                  size="small"
                  required
                  label="제품코드"
                  error={!!errors.code?.message}
                  helperText={errors.code?.message ?? ''}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">p - </InputAdornment>,
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
              <FormControl required>
                <TextField
                  size="small"
                  {...field}
                  required
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  type="number"
                  label="판매가"
                  error={!!errors.salePrice?.message}
                  helperText={errors.salePrice?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="wonPrice"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  size="small"
                  {...field}
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  type="number"
                  required
                  label="원가"
                  error={!!errors.wonPrice?.message}
                  helperText={errors.wonPrice?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="leadTime"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  type="number"
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  label="리드타임"
                  error={!!errors.leadTime?.message}
                  helperText={errors.leadTime?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="maintainDate"
            render={({ field }) => (
              <FormControl>
                <TextField
                  size="small"
                  {...field}
                  type="number"
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  label="유지기간"
                  error={!!errors.maintainDate?.message}
                  helperText={errors.maintainDate?.message ?? ''}
                />
              </FormControl>
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
                        {...params}
                        size="small"
                        {...field}
                        onChange={(event) => {
                          field.onChange(event);
                          setCategoryKeyword(event.target.value);
                        }}
                        label="분류"
                        error={!!errors.category?.message}
                        helperText={errors.category?.message ?? ''}
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
