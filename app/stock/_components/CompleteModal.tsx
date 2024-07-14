import { FC, useEffect, useState } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import { Autocomplete, Box, Button, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { modalSizeProps } from '@/components/commonStyles';
import { ProductOrder } from '@/http/graphql/codegen/graphql';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import { client } from '@/http/graphql/client';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';
import { CompleteOrderForm, completeOrderValidation } from '../_validation/completeOrderValidation';
import { useCompleteProductOrder } from '@/http/graphql/hooks/productOrder/useCompleteProductOrder';

interface Props {
  selectedOrder: ProductOrder;
  open: boolean;
  setSelectedOrder: (item: null | ProductOrder) => void;
  onClose: () => void;
}

const CompleteModal: FC<Props> = ({ open, selectedOrder, onClose, setSelectedOrder }) => {
  const [storageKeyword, setStorageKeyword] = useState('');
  const delayedStorageKeyword = useTextDebounce(storageKeyword ?? '');

  const { data: storageData, networkStatus: storageStatus } = useStorages({
    keyword: delayedStorageKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const storageRows = ((storageData?.storages.data as Storage[]) ?? []).map((item) => item.name);
  const isStorageLoading = storageStatus == 1 || storageStatus == 2 || storageStatus == 3;

  const [completeOrder, { loading }] = useCompleteProductOrder();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteOrderForm>({
    resolver: zodResolver(completeOrderValidation),
    defaultValues: {
      _id: selectedOrder._id,
      storageName: '',
    },
  });

  useEffect(() => {
    reset({
      _id: selectedOrder._id,
      storageName: '',
    });
  }, [selectedOrder, reset]);
  const onSubmit = (values: CompleteOrderForm) => {
    completeOrder({
      variables: {
        completeOrderInput: values,
      },
      onCompleted: (res) => {
        snackMessage({
          message: '발주가 완료 처리 되었습니다.',
          severity: 'success',
        });

        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'subsidiaryStocks' });
            cache.evict({ fieldName: 'subsidiaryStocksState' });
            cache.evict({ fieldName: 'subsidiaryCountStocks' });
            cache.evict({ fieldName: 'stocks' });
            cache.evict({ fieldName: 'productCountStocks' });
            cache.evict({ fieldName: 'stocksState' });
            cache.evict({ fieldName: 'productSales' });
            cache.evict({ fieldName: 'stocksOrder' });
          },
        });

        setSelectedOrder(res.completeOrder as ProductOrder);
        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '완료 처리가 실패했습니다.',
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
        발주 완료
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
          <Stack flexDirection="column">
            <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>경고!!</Typography>
            <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
              완료된 발주는 앞으로 수정이 불가능합니다.
            </Typography>
            <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
              정말로 발주를 완료하겠습니까?
            </Typography>
            <Typography sx={{ mt: 2 }}>발주 제품목록</Typography>
            {selectedOrder.products.map((item) => {
              return (
                <Typography key={item.product.name}>
                  {`${item.product.name} : ${item.count}EA`}
                </Typography>
              );
            })}

            <Typography sx={{ mt: 2, mb: 1 }}>제품이 입고될 창고를 선택해주세요.</Typography>
          </Stack>
        </Stack>

        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name={'storageName'}
            render={({ field }) => {
              return (
                <Autocomplete
                  fullWidth
                  sx={{
                    minWidth: 200,
                  }}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  size="small"
                  options={storageRows}
                  isOptionEqualToValue={(item1, item2) => item1 === item2}
                  defaultValue={null}
                  inputValue={storageKeyword}
                  onInputChange={(_, value) => setStorageKeyword(value)}
                  loading={isStorageLoading}
                  loadingText="로딩중"
                  noOptionsText="검색 결과가 없습니다."
                  renderInput={(params) => <TextField {...params} label="창고" required />}
                  renderOption={(props, item, state, ownerState) => {
                    const { key, ...rest } = props as any;
                    return (
                      <Box component="li" key={item} {...rest}>
                        {item}
                      </Box>
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
            적용
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default CompleteModal;
