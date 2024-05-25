import { FC } from 'react';
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
import {
  CreateProductForm,
  createProductSchema,
} from '@/app/back-data/product/_validations/createProductValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { useCreateProduct } from '@/http/graphql/hooks/product/useCreateProduct';
import { useFindManyProductCategory } from '@/http/graphql/hooks/product-category/useFindProductCategories';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT, PRODUCT_PREFIX } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import SearchAutoComplete from '@/components/ui/select/SearchAutoComplete';
import { modalSizeProps } from '@/components/commonStyles';
import { filterEmptyValues } from '@/utils/common';
import NumberInput from '@/components/ui/input/NumberInput';
import { client } from '@/http/graphql/client';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateProductModal: FC<Props> = ({ open, onClose }) => {
  const [createProduct, { loading }] = useCreateProduct();

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      code: '',
      name: '',
      barCode: '',
    },
  });

  const categoryKeyword = watch('category');
  const delayedCategoryKeyword = useTextDebounce(categoryKeyword ?? '');

  const { data, networkStatus, fetchMore } = useFindManyProductCategory({
    keyword: delayedCategoryKeyword,
    limit: LIMIT,
    skip: 0,
  });
  const rows = data?.categories.data ?? [];
  const isLoading = networkStatus == 1 || networkStatus == 2 || networkStatus == 3;

  const setCategory = (selectedCategory: string | null) => {
    if (!selectedCategory) return;
    setValue('category', selectedCategory ?? '');
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
  console.log(errors);
  const onSubmit = (createProductInput: CreateProductForm) => {
    console.log('createProductInput : ', createProductInput.name);
    const newValues = filterEmptyValues(createProductInput) as CreateProductForm;
    createProduct({
      variables: {
        createProductInput: newValues,
      },
      onCompleted: () => {
        snackMessage({ message: '제품등록이 완료되었습니다.', severity: 'success' });
        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'productSales' });
            cache.evict({ fieldName: 'stocks' });
          },
        });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '제품등록이 실패했습니다.', severity: 'error' });
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
        제품 등록
      </Typography>
      <Typography sx={{ mb: 3 }}>새로운 제품을 등록합니다.</Typography>
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
                  label="제품코드"
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
        </FormGroup>
        <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
            등록
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default CreateProductModal;
