import { FC, useEffect, useMemo, useState } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
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
import { modalSizeProps } from '@/components/commonStyles';
import NumberInput from '@/components/ui/input/NumberInput';
import { CreateOptionForm, createOptionSchema } from '../_validations/createSubsidiaryValidation';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { OutputOption } from '@/http/graphql/codegen/graphql';
import { useUpdateOption } from '@/http/graphql/hooks/option/useUpdateOption';

interface Props {
  selectedSubsidiary: OutputOption;
  open: boolean;
  onClose: () => void;
  setSelectedSubsidiary: (item: null | OutputOption) => void;
}

const AddSubsidiaryModal: FC<Props> = ({
  open,
  selectedSubsidiary,
  onClose,
  setSelectedSubsidiary,
}) => {
  const [updateSubsidiary, { loading }] = useUpdateOption();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOptionForm>({
    resolver: zodResolver(createOptionSchema),
    defaultValues: {
      id: selectedSubsidiary.id,
      name: selectedSubsidiary.name,
      count: selectedSubsidiary.count,
      productCodeList: selectedSubsidiary.productCodeList,
    },
  });

  useEffect(() => {
    reset({
      id: selectedSubsidiary.id,
      name: selectedSubsidiary.name,
      count: selectedSubsidiary.count,
      productCodeList: selectedSubsidiary.productCodeList,
    });
  }, [selectedSubsidiary]);

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
  const cachedProductList = useMemo(
    () => productRows.map((row: any) => ({ code: row.code, name: row.name })) ?? [],
    [products?.products.data]
  );
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

  const onSubmit = ({ productCodeList, ...rest }: CreateOptionForm) => {
    updateSubsidiary({
      variables: {
        updateOptionInput: {
          ...rest,
          id: selectedSubsidiary.id,
          productCodeList: productCodeList.map((item) => item.code),
        },
      },
      onCompleted: (res) => {
        snackMessage({
          message: '옵션 편집이 완료되었습니다.',
          severity: 'success',
        });
        setSelectedSubsidiary(res.updateOption as OutputOption);
        // client.refetchQueries({
        //   updateCache(cache) {
        //     cache.evict({ fieldName: 'options' });
        //   },
        // });
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '옵션 편집이 실패했습니다.',
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
        옵션 업데이트
      </Typography>
      <Typography sx={{ mb: 3 }}>새로운 옵션 을 업데이트합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="id"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  {...field}
                  disabled
                  size="small"
                  required
                  label="옵션 아이디(편집 불가)"
                  error={!!errors.id?.message}
                  helperText={errors.id?.message ?? ''}
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
                  label="옵션 이름"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="count"
            render={({ field }) => (
              <NumberInput
                field={field}
                label="제품 개수"
                error={!!errors.count?.message}
                helperText={errors.count?.message ?? ''}
              />
            )}
          />

          <Controller
            control={control}
            name="productCodeList"
            render={({ field }) => (
              <Autocomplete
                fullWidth
                disableCloseOnSelect
                getOptionLabel={(item) => `${item.name}(${item.code})`}
                isOptionEqualToValue={(item1, item2) => item1.code === item2.code}
                defaultValue={field.value}
                value={field.value}
                inputValue={productKeyword}
                onInputChange={(_, value) => setProductKeyword(value)}
                noOptionsText="검색 결과가 없습니다."
                loadingText="로딩중입니다."
                loading={loading}
                onChange={(_, value) => field.onChange(value)}
                multiple
                options={cachedProductList}
                renderInput={(params: AutocompleteRenderInputParams) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        {...params}
                        name={field.name}
                        label="옵션을 적용할수 있는 제품 선택"
                        error={!!errors.productCodeList?.message}
                        helperText={errors.productCodeList?.message ?? ''}
                        size="small"
                      />
                    </FormControl>
                  );
                }}
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
