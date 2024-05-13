import { FC, useState } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Autocomplete,
  Box,
  Button,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, FieldArrayWithId, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { modalSizeProps } from '@/components/commonStyles';
import { useCreateClient } from '@/http/graphql/hooks/client/useCreateClient';
import { ClientType, ProductOrder } from '@/http/graphql/codegen/graphql';
import { filterEmptyValues } from '@/utils/common';
import NumberInput from '@/components/ui/input/NumberInput';
import { CreateOrderForm, createOrderSchema } from '../_validation/createOrderValidation';
import useTextDebounce from '@/hooks/useTextDebounce';
import OrderProduct from './OrderProduct';
import { PlusOne } from '@mui/icons-material';

const factories = [
  {
    _id: '123',
    name: 'Central Warehouse',
    phoneNumber: '123-456-7890',
    address: '123 Central Ave, Big City',
    note: 'Main distribution center',
  },
  {
    _id: '1234',
    name: 'East Side Storage',
    phoneNumber: '987-654-3210',
    address: '456 East St, Capital City',
    note: 'Handles east region deliveries',
  },
];

interface Props {
  selectedOrder: ProductOrder;
  open: boolean;
  onClose: () => void;
}

const EditOrderModal: FC<Props> = ({ open, selectedOrder, onClose }) => {
  const [createClient, { loading }] = useCreateClient();
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrderForm>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      factory: selectedOrder?.factory?.name ?? '',
      notPayCost: selectedOrder.notPayCost,
      payCost: selectedOrder.payCost,
      products: selectedOrder.products.map((item) => ({
        product: item.product.name,
        count: item.count,
      })),
      totalPayCost: selectedOrder.totalPayCost,
    },
  });

  const { replace, append, remove, fields } = useFieldArray({
    control,
    name: 'products',
  });

  const onSubmit = (values: CreateOrderForm) => {
    const newValues = filterEmptyValues(values) as CreateOrderForm;
    // createClient({
    //   variables: {
    //     createClientInput: {
    //       ...newValues,
    //       feeRate: values.feeRate == null ? null : values.feeRate / 100,
    //     },
    //   },
    //   onCompleted: () => {
    //     snackMessage({
    //       message: '거래처등록이 완료되었습니다.',
    //       severity: 'success',
    //     });
    //     handleClose();
    //   },
    //   onError: (err) => {
    //     const message = err.message;
    //     snackMessage({
    //       message: message ?? '거래처등록이 실패했습니다.',
    //       severity: 'error',
    //     });
    //   },
    // });
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

  const handleReplace = (
    index: number,
    newItem: FieldArrayWithId<CreateOrderForm, 'products', 'id'>
  ) => {
    //
  };

  const currentProducts = watch('products');
  const totalCount = currentProducts.reduce((acc, cur) => cur.count + acc, 0);

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        발주 편집
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>새로운 발주를 등록합니다.</Typography>

        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="factory"
            render={({ field }) => {
              return (
                <Autocomplete
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  sx={{ mt: 3 }}
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
                      <Box component="li" ref={null} key={item} {...rest}>
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
                <TextField
                  {...field}
                  label="계약금"
                  size="small"
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
                <TextField
                  {...field}
                  label="잔금"
                  size="small"
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
                <TextField
                  {...field}
                  label="총 금액"
                  size="small"
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
                key={`${index}_${field.id}`}
                control={control}
                index={index}
                remove={remove}
                replace={handleReplace}
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
