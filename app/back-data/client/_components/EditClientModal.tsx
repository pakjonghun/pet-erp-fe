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
import { CreateProductForm, createProductSchema } from '../_validations/createProductValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { useFindManyCategory } from '@/api/graphql/hooks/category/useFindCategories';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import { SelectItem } from '@/components/ui/select/SearchAutoComplete';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import SearchAutoComplete from '@/components/ui/select/SearchAutoComplete';
import { useUpdateProduct } from '@/api/graphql/hooks/product/useUpdateProduct';
import { Product } from '@/api/graphql/codegen/graphql';
import { modalSizeProps } from '@/components/commonStyles';

interface Props {
  selectedClient: Product;
  open: boolean;
  onClose: () => void;
}

const EditClientModal: FC<Props> = ({ open, selectedClient, onClose }) => {
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
      barCode: selectedClient.barCode ?? '',
      category: selectedClient.category?.name as string,
      code: selectedClient.code,
      leadTime: selectedClient.leadTime ?? 0,
      maintainDate: selectedClient.maintainDate ?? 0,
      name: selectedClient.name,
      salePrice: selectedClient.salePrice ?? 0,
      wonPrice: selectedClient.wonPrice ?? 0,
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
    updateProduct({
      variables: {
        updateProductInput: {
          ...values,
          _id: selectedClient._id,
          category: category?._id,
        },
      },
      onCompleted: () => {
        snackMessage({ message: '거래처편집이 완료되었습니다.', severity: 'success' });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '거래처편집이 실패했습니다.', severity: 'error' });
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
        거래처 편집
      </Typography>
      <Typography sx={{ mb: 3 }}>거래처을 편집합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  {...field}
                  size="small"
                  required
                  label="거래처코드"
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
                  label="거래처이름"
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

export default EditClientModal;
