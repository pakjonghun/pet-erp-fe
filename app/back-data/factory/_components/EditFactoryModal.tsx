import { FC, useEffect, useMemo, useState } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  AutocompleteRenderInputParams,
  Button,
  FormControl,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { CreateStorageForm, createStorageSchema } from '../_validations/createStorageValidation';
import { modalSizeProps } from '@/components/commonStyles';
import { Factory } from '@/http/graphql/codegen/graphql';
import { useEditFactory } from '@/http/graphql/hooks/factory/useEditFactory';
import { client } from '@/http/graphql/client';
import useTextDebounce from '@/hooks/useTextDebounce';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { LIMIT } from '@/constants';
import MultiAutoComplete from '@/components/ui/select/MultiAutoComplete';
import useInfinityScroll from '@/hooks/useInfinityScroll';

interface Props {
  open: boolean;
  factory: Factory;
  onClose: () => void;
}

const EditFactoryModal: FC<Props> = ({ open, factory, onClose }) => {
  const [editFactory, { loading }] = useEditFactory();

  const {
    reset,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateStorageForm>({
    resolver: zodResolver(createStorageSchema),
    defaultValues: {
      name: factory.name,
      phoneNumber: factory.phoneNumber,
      address: factory.address,
      note: factory.note,
      productList: factory.productList ?? [],
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    reset({
      name: factory.name,
      phoneNumber: factory.phoneNumber,
      address: factory.address,
      note: factory.note,
      productList: factory.productList ?? [],
    });
  }, [factory, reset]);

  const onSubmit = (values: CreateStorageForm) => {
    editFactory({
      variables: {
        updateFactoryInput: {
          _id: factory._id,
          name: values.name,
          phoneNumber: values.phoneNumber,
          address: values.address,
          note: values.note,
          productList: values.productList,
        },
      },
      onCompleted: () => {
        snackMessage({
          message: '공장 등록이 완료되었습니다.',
          severity: 'success',
        });

        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'orders' });
          },
        });

        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '공장 등록이 실패했습니다.',
          severity: 'error',
        });
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

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
  const cachedOptions = useMemo(
    () => productRows.map((row) => row.name) ?? [],
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

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        공장 수정
      </Typography>
      <Typography sx={{ mb: 3 }}>공장 데이터를 편집합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                required
                size="small"
                label="공장 이름"
                error={!!errors.name?.message}
                helperText={errors.name?.message ?? ''}
              />
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="연락처"
                error={!!errors.name?.message}
                helperText={errors.name?.message ?? ''}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="주소"
                error={!!errors.name?.message}
                helperText={errors.name?.message ?? ''}
              />
            )}
          />
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="비고"
                error={!!errors.name?.message}
                helperText={errors.name?.message ?? ''}
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
                options={cachedOptions}
                renderSearchInput={(params: AutocompleteRenderInputParams) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        {...params}
                        name={field.name}
                        label="생산 제품목록 선택"
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
          <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
            <Button type="button" variant="outlined" onClick={handleClose}>
              취소
            </Button>
            <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
              수정
            </Button>
          </Stack>
        </FormGroup>
      </form>
    </BaseModal>
  );
};

export default EditFactoryModal;
