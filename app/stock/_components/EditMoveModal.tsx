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
import { FC, useState } from 'react';
import { Controller, FieldArrayWithId, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { modalSizeProps } from '@/components/commonStyles';
import { useCreateClient } from '@/http/graphql/hooks/client/useCreateClient';
import { ClientType, Move } from '@/http/graphql/codegen/graphql';
import { filterEmptyValues } from '@/utils/common';
import NumberInput from '@/components/ui/input/NumberInput';
import { CLIENT_PREFIX } from '@/constants';
import useTextDebounce from '@/hooks/useTextDebounce';
import MoveProduct from './MoveProduct';
import { PlusOne } from '@mui/icons-material';
import { CreateMoveForm, createMoveSchema } from '../_validation/createMoveValidation';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

const places = [
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
  open: boolean;
  onClose: () => void;
  selectedMove: Move;
}

const EditMoveModal: FC<Props> = ({ open, selectedMove, onClose }) => {
  const [createClient, { loading }] = useCreateClient();

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMoveForm>({
    resolver: zodResolver(createMoveSchema),
    defaultValues: {
      fromPlace: selectedMove.fromStorage?.name ?? '',
      toPlace: selectedMove.toStorage?.name ?? '',
      endDate: selectedMove.startDate,
      startDate: selectedMove.endDate,
      products: selectedMove.products.map((item) => ({
        count: item.count,
        product: item.product.name,
      })),
    },
  });

  const { replace, append, remove, fields } = useFieldArray({
    control,
    name: 'products',
  });

  const onSubmit = (values: CreateMoveForm) => {
    const newValues = filterEmptyValues(values) as CreateMoveForm;
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

  const [fromPlaceKeyword, setFromPlaceKeyword] = useState('');
  const [toPlaceKeyword, setToPlaceKeyword] = useState('');

  const handleReplace = (
    index: number,
    newItem: FieldArrayWithId<CreateMoveForm, 'products', 'id'>
  ) => {
    //
  };

  const currentProducts = watch('products');
  const totalCount = currentProducts.reduce((acc, cur) => cur.count + acc, 0);

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        이동 편집
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>이동을 편집 합니다.</Typography>

        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="fromPlace"
            render={({ field }) => {
              return (
                <Autocomplete
                  groupBy={(item) => item[0]}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  sx={{ mt: 3 }}
                  size="small"
                  options={places.map((item) => item.name)}
                  isOptionEqualToValue={(item1, item2) => item1 === item2}
                  defaultValue={null}
                  inputValue={fromPlaceKeyword}
                  onInputChange={(_, value) => setFromPlaceKeyword(value)}
                  loading={false}
                  loadingText="로딩중"
                  noOptionsText="검색 결과가 없습니다."
                  disablePortal
                  renderInput={(params) => <TextField {...params} label="출발장소" required />}
                  renderOption={(props, item, state) => {
                    const { key, ...rest } = props as any;
                    const isLast = state.index === places.length - 1;
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
            name="toPlace"
            render={({ field }) => {
              return (
                <Autocomplete
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  size="small"
                  options={places.map((item) => item.name)}
                  isOptionEqualToValue={(item1, item2) => item1 === item2}
                  defaultValue={null}
                  inputValue={toPlaceKeyword}
                  onInputChange={(_, value) => setToPlaceKeyword(value)}
                  loading={false}
                  loadingText="로딩중"
                  noOptionsText="검색 결과가 없습니다."
                  disablePortal
                  renderInput={(params) => <TextField {...params} label="도착장소" required />}
                  renderOption={(props, item, state) => {
                    const { key, ...rest } = props as any;
                    const isLast = state.index === places.length - 1;
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
            name="endDate"
            render={({ field }) => {
              return (
                <DatePicker
                  label="출발날짜"
                  value={dayjs(field.value)}
                  onChange={(value) => field.onChange(value?.toDate())}
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
              <MoveProduct
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

export default EditMoveModal;
