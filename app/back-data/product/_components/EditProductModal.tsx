import { FC, useEffect } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  AutocompleteRenderInputParams,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Stack,
  Switch,
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
import { useFindManyProductCategory } from '@/http/graphql/hooks/product-category/useFindProductCategories';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT, PRODUCT_PREFIX } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import SearchAutoComplete from '@/components/ui/select/SearchAutoComplete';
import { useUpdateProduct } from '@/http/graphql/hooks/product/useUpdateProduct';
import { Product, Storage } from '@/http/graphql/codegen/graphql';
import { modalSizeProps } from '@/components/commonStyles';
import { emptyValueToNull } from '@/utils/common';
import NumberInput from '@/components/ui/input/NumberInput';
import { client } from '@/http/graphql/client';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';

interface Props {
  selectedProduct: Product;
  setSelectedProduct: (item: Product | null) => void;
  open: boolean;
  onClose: () => void;
}

const EditProductModal: FC<Props> = ({ open, selectedProduct, onClose, setSelectedProduct }) => {
  const [updateProduct, { loading }] = useUpdateProduct();

  const {
    reset,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      barCode: selectedProduct.barCode ?? '',
      category: selectedProduct.category?.name as string,
      code: selectedProduct.code,
      leadTime: selectedProduct.leadTime,
      name: selectedProduct.name,
      salePrice: selectedProduct.salePrice,
      wonPrice: selectedProduct.wonPrice,
      isFreeDeliveryFee: selectedProduct.isFreeDeliveryFee,
    },
  });

  const { data: storageData, networkStatus: storageNetworkStatus } = useStorages({
    keyword: '',
    limit: 100,
    skip: 0,
  });
  const storageList = (storageData?.storages.data as Storage[]) ?? [];
  const storageNameList = storageList.map((item) => item.name);
  const storageById = new Map<string, Storage>(storageList.map((item) => [item._id, item]));

  useEffect(() => {
    if (storageNetworkStatus <= 3) return;

    const storageName = selectedProduct.storageId
      ? storageById.get(selectedProduct.storageId)?.name
      : null;

    reset({
      barCode: selectedProduct.barCode ?? '',
      category: selectedProduct.category?.name as string,
      code: selectedProduct.code,
      leadTime: selectedProduct.leadTime,
      name: selectedProduct.name,
      salePrice: selectedProduct.salePrice,
      wonPrice: selectedProduct.wonPrice,
      storageName,
      isFreeDeliveryFee: selectedProduct.isFreeDeliveryFee,
    });
  }, [selectedProduct, storageNetworkStatus]);

  const categoryKeyword = watch('category');
  const delayedCategoryKeyword = useTextDebounce(categoryKeyword ?? '');

  const { data, networkStatus, refetch, fetchMore } = useFindManyProductCategory({
    keyword: delayedCategoryKeyword,
    limit: LIMIT,
    skip: 0,
  });
  const rows = data?.categories.data ?? [];

  const isLoading = networkStatus == 1 || networkStatus == 2 || networkStatus == 3;

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
        },
      },
      onCompleted: (res) => {
        snackMessage({
          message: '제품편집이 완료되었습니다.',
          severity: 'success',
        });
        setSelectedProduct(res.updateProduct as Product);

        client.refetchQueries({
          updateCache(cache) {
            // cache.evict({ fieldName: 'wholeSales' });
            // cache.evict({ fieldName: 'dashboardClients' });
            cache.evict({ fieldName: 'stocks' });
            cache.evict({ fieldName: 'stocksState' });
            cache.evict({ fieldName: 'productCountStocks' });
            cache.evict({ fieldName: 'productSales' });
            cache.evict({ fieldName: 'productSale' });
            // cache.evict({ fieldName: 'products' });
            // cache.evict({ fieldName: 'topClients' });
          },
        });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '제품편집이 실패했습니다.',
          severity: 'error',
        });
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
            name="isFreeDeliveryFee"
            render={({ field }) => {
              return (
                <FormControlLabel
                  key={Math.random()}
                  sx={{ width: 'fit-content' }}
                  control={<Switch checked={!!field.value} {...field} />}
                  label={field.value ? '무료배송' : '유료배송'}
                />
              );
            }}
          />
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
                options={rows.map((row) => row.name!)}
                setValue={(value) => field.onChange(value)}
                value={field.value ?? ''}
                scrollRef={scrollRef}
                renderSearchInput={(params: AutocompleteRenderInputParams) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        {...field}
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
            name="storageName"
            render={({ field }) => {
              return (
                <SearchAutoComplete
                  inputValue={field.value ?? ''}
                  onInputChange={field.onChange}
                  loading={isLoading}
                  options={storageNameList}
                  setValue={field.onChange}
                  value={field.value ?? ''}
                  scrollRef={scrollRef}
                  renderSearchInput={(params: AutocompleteRenderInputParams) => {
                    return (
                      <FormControl fullWidth>
                        <TextField
                          {...params}
                          {...field}
                          label="출고 창고선택"
                          error={!!errors.storageName?.message}
                          helperText={errors.storageName?.message ?? ''}
                          size="small"
                        />
                      </FormControl>
                    );
                  }}
                />
              );
            }}
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
