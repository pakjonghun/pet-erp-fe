import { FC, useState } from 'react';
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
import { Factory } from '@/http/graphql/codegen/graphql';
import { filterEmptyValues } from '@/utils/common';
import NumberInput from '@/components/ui/input/NumberInput';
import { LIMIT } from '@/constants';
import { CreateOrderForm, createOrderSchema } from '../_validation/createOrderValidation';
import useTextDebounce from '@/hooks/useTextDebounce';
import OrderProduct from './OrderProduct';
import { PlusOne } from '@mui/icons-material';
import { useFactories } from '@/http/graphql/hooks/factory/useFactories';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useCreateProductOrder } from '@/http/graphql/hooks/productOrder/useCreateProductOrder';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { client } from '@/http/graphql/client';

interface Props {
  open: boolean;
  onClose: () => void;
  product?: string;
}

const AddOrderModal: FC<Props> = ({ open, onClose, product }) => {
  const [createProductOrder, { loading }] = useCreateProductOrder();

  const {
    reset,
    watch,
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<CreateOrderForm>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      createdAt: dayjs().startOf('date').toDate(),
      factory: '',
      products: [],
      payCost: 0,
      notPayCost: 0,
      totalPayCost: 0,
      isDone: false,
    },
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'products',
  });

  const onSubmit = (values: CreateOrderForm) => {
    const newValues = filterEmptyValues(values) as CreateOrderForm;
    createProductOrder({
      variables: {
        createOrderInput: newValues,
      },
      onCompleted: () => {
        snackMessage({
          message: '발주등록이 완료되었습니다.',
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
          message: message ?? '발주등록이 실패했습니다.',
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
    clearErrors('products');
    const initProduct = {
      product: product ?? '',
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
    <BaseModal sx={{ width: 700 }} open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        발주 등록
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" alignItems="center" gap={3}>
          <Typography>새로운 발주를 등록합니다.</Typography>
          <Controller
            control={control}
            name="isDone"
            render={({ field }) => {
              return (
                <FormControlLabel
                  label={field.value ? '잔금 지불완료' : '잔금 미지불'}
                  control={<Switch {...field} />}
                />
              );
            }}
          />
        </Stack>

        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="createdAt"
            render={({ field }) => {
              return (
                <DatePicker
                  sx={{
                    mt: 3,
                    '& input': {
                      py: 1.2,
                    },
                  }}
                  label="발주날짜"
                  value={dayjs(field.value)}
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
                  disablePortal
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
          <Typography sx={{ mt: -1 }} color="error" variant="caption">
            {errors?.products?.message ?? ''}
          </Typography>

          {fields.map((field, index) => {
            return (
              <OrderProduct
                productList={currentProducts}
                key={`${index}_${field.id}`}
                control={control}
                index={index}
                remove={remove}
                error={errors.products?.[index]}
              />
            );
          })}
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

export default AddOrderModal;
