import { FC, useEffect, useState } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { modalSizeProps } from '@/components/commonStyles';
import { Factory, ProductOrder } from '@/http/graphql/codegen/graphql';
import { filterEmptyValues } from '@/utils/common';
import NumberInput from '@/components/ui/input/NumberInput';
import { CreateOrderForm, createOrderSchema } from '../_validation/createOrderValidation';
import useTextDebounce from '@/hooks/useTextDebounce';
import OrderProduct from './OrderProduct';
import { PlusOne } from '@mui/icons-material';
import { useUpdateProductOrder } from '@/http/graphql/hooks/productOrder/useEditProductOrder';
import { useFactories } from '@/http/graphql/hooks/factory/useFactories';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { client } from '@/http/graphql/client';

interface Props {
  selectedOrder: ProductOrder;
  open: boolean;
  onClose: () => void;
}

const EditOrderModal: FC<Props> = ({ open, selectedOrder, onClose }) => {
  const [updateProductOrder, { loading }] = useUpdateProductOrder();
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrderForm>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      orderDate: new Date(selectedOrder.orderDate),
      factory: selectedOrder?.factory?.name ?? '',
      notPayCost: selectedOrder.notPayCost,
      payCost: selectedOrder.payCost,
      products: selectedOrder.products.map((item) => ({
        product: item.product.name,
        count: item.count,
      })),
      totalPayCost: selectedOrder.totalPayCost,
      isDone: selectedOrder.isDone,
    },
  });

  useEffect(() => {
    reset({
      orderDate: new Date(selectedOrder.orderDate),
      factory: selectedOrder?.factory?.name ?? '',
      notPayCost: selectedOrder.notPayCost,
      payCost: selectedOrder.payCost,
      products: selectedOrder.products.map((item) => ({
        product: item.product.name,
        count: item.count,
      })),
      totalPayCost: selectedOrder.totalPayCost,
      isDone: selectedOrder.isDone,
    });
  }, [selectedOrder, reset]);

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'products',
  });

  const onSubmit = (values: CreateOrderForm) => {
    const newValues = filterEmptyValues(values) as CreateOrderForm;

    updateProductOrder({
      variables: {
        updateOrderInput: {
          _id: selectedOrder._id,
          ...newValues,
        },
      },
      onCompleted: () => {
        snackMessage({
          message: '발주데이터 편집이 완료되었습니다.',
          severity: 'success',
        });

        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'stocks' });
            cache.evict({ fieldName: 'stocksState' });
            cache.evict({ fieldName: 'stocksOrder' });
            cache.evict({ fieldName: 'productSales' });
          },
        });

        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '발주데이터 편집이 실패했습니다.',
          severity: 'error',
        });
      },
    });
  };
  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAddProduct = () => {
    const initProduct = {
      product: '',
      count: 0,
    };

    append(initProduct);
  };

  const [factoryKeyword, setFactoryKeyword] = useState('');
  const delayedFactoryKeyword = useTextDebounce(factoryKeyword);
  const { data, networkStatus, fetchMore } = useFactories({
    keyword: delayedFactoryKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const factories = (data?.factories.data as Factory[]) ?? [];
  const isLoading = networkStatus === 2 || networkStatus === 3 || networkStatus === 1;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data!.factories.totalCount;
      if (totalCount <= factories.length) return;

      fetchMore({
        variables: {
          factoriesInput: {
            keyword: delayedFactoryKeyword,
            limit: LIMIT,
            skip: factories.length,
          },
        },
      });
    }
  };
  const factoryRef = useInfinityScroll({ callback });

  const currentProducts = watch('products');
  const totalCount = currentProducts.reduce((acc, cur) => cur.count + acc, 0);
  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        발주 편집
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
          }}
          gap={3}
        >
          <Typography>발주 데이터를 편집합니다..</Typography>
          <Controller
            control={control}
            name="isDone"
            render={({ field }) => {
              return (
                <FormControlLabel
                  label={field.value ? '잔금 지불완료' : '잔금 미지불'}
                  control={<Switch checked={!!field.value} {...field} />}
                />
              );
            }}
          />
        </Stack>

        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="orderDate"
            render={({ field }) => {
              return (
                <DatePicker
                  sx={{
                    mt: 3,
                    '& .MuiInputBase-input': {
                      py: 1.2,
                      pb: 1.2,
                    },
                  }}
                  label="발주날짜*"
                  value={dayjs(field.value).subtract(9, 'hour')}
                  onChange={(value) => {
                    if (!value) return;
                    const _value = value as any;
                    field.onChange(new Date(_value));
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="factory"
            render={({ field }) => {
              return (
                <Autocomplete
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  size="small"
                  options={factories.map((item) => item.name)}
                  isOptionEqualToValue={(item1, item2) => item1 === item2}
                  defaultValue={null}
                  inputValue={factoryKeyword}
                  onInputChange={(_, value) => setFactoryKeyword(value)}
                  loading={false}
                  loadingText="로딩중"
                  noOptionsText="검색 결과가 없습니다."
                  renderInput={(params) => <TextField {...params} label="공장" required />}
                  renderOption={(props, item, state) => {
                    const { key, ...rest } = props as any;
                    const isLast = state.index === factories.length - 1;
                    return (
                      <Box component="li" ref={isLast ? factoryRef : null} key={item} {...rest}>
                        {item}
                      </Box>
                    );
                  }}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="payCost"
            render={({ field }) => {
              return (
                <NumberInput
                  field={field}
                  label="계약금"
                  error={!!errors.payCost?.message}
                  helperText={errors.payCost?.message ?? ''}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="notPayCost"
            render={({ field }) => {
              return (
                <NumberInput
                  field={field}
                  label="잔금"
                  error={!!errors.notPayCost?.message}
                  helperText={errors.notPayCost?.message ?? ''}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="totalPayCost"
            render={({ field }) => {
              return (
                <NumberInput
                  field={field}
                  label="총 금액"
                  error={!!errors.totalPayCost?.message}
                  helperText={errors.totalPayCost?.message ?? ''}
                />
              );
            }}
          />
          <Stack direction="row" gap={3} alignItems="center" sx={{ mt: 2 }}>
            <FormLabel> {`제품 추가(총 수량 : ${totalCount}EA)`}</FormLabel>
            <Button
              onClick={handleAddProduct}
              size="small"
              variant="outlined"
              endIcon={<PlusOne />}
            >
              제품 추가
            </Button>
          </Stack>

          {fields.map((field, index) => {
            return (
              <OrderProduct
                productList={currentProducts}
                key={`${index}_${field.id}`}
                control={control}
                index={index}
                remove={remove}
                error={errors.products}
              />
            );
          })}
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

export default EditOrderModal;
