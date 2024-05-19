import { FC } from 'react';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import BaseModal from '@/components/ui/modal/BaseModal';
import { Button, FormGroup, FormLabel, Stack, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { filterEmptyValues } from '@/utils/common';
import { initStock } from '../constants';
import {
  CreateProductStockForm,
  createProductStockSchema,
} from '../_validations/createProductStockList';
import StockProduct from './StockProduct';
import { StockColumn } from '@/http/graphql/codegen/graphql';
import { useAddStock } from '@/http/graphql/hooks/stock/useAddStocks';
import { snackMessage } from '@/store/snackMessage';
import { client } from '@/http/graphql/client';

interface Props {
  open: boolean;
  onClose: () => void;
  productStock: null | StockColumn;
}

const AddProductStockModal: FC<Props> = ({ open, onClose, productStock }) => {
  const [addStock, { loading }] = useAddStock();

  const {
    watch,
    reset,
    control,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductStockForm>({
    resolver: zodResolver(createProductStockSchema),
    defaultValues: {
      stocks: [],
    },
  });

  const onSubmit = (values: CreateProductStockForm) => {
    const newValues = filterEmptyValues(values) as CreateProductStockForm;
    addStock({
      variables: {
        addStocksInput: newValues,
      },
      onCompleted: () => {
        snackMessage({ message: '재고 입력이 완료되었습니다.', severity: 'success' });
        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'stocks' });
            cache.evict({ fieldName: 'productCountStocks' });
            cache.evict({ fieldName: 'stocksState' });
            cache.evict({ fieldName: 'productSales' });
          },
          optimistic: true,
        });

        onClose();
      },
      onError: (error) => {
        const message = error.message ?? '출고 재고 입력이 실패했습니다.';
        snackMessage({ message, severity: 'error' });
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'stocks',
  });

  const handleAppendProduct = () => {
    clearErrors('stocks');
    const newStock = productStock
      ? {
          ...initStock,
          productName: productStock?.productName ?? '',
          storageName: '',
        }
      : initStock;
    append(newStock);
  };

  const currentProductList = watch('stocks');
  const totalCount = currentProductList.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <BaseModal sx={{ width: 800 }} open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        입고 재고 입력
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{ mt: 4 }}>
          <Stack direction="row" alignItems="center" gap={3}>
            <FormLabel>입고 재고 목록</FormLabel>
            <Button onClick={handleAppendProduct} variant="outlined" endIcon={<PlusOneIcon />}>
              추가
            </Button>
            <Typography>{`총수량 : ${totalCount}EA`}</Typography>
          </Stack>
          <Typography sx={{ mt: 1 }} color="error" variant="caption">
            {errors?.stocks?.message ?? ''}
          </Typography>
          <Stack sx={{ mt: 2 }} gap={2}>
            {fields.map((product, index) => {
              return (
                <StockProduct
                  isProductFreeze={productStock != null}
                  index={index}
                  control={control}
                  error={errors.stocks?.[index]}
                  key={`${product.id}_${index}_'autocomplete`}
                  remove={remove}
                />
              );
            })}
          </Stack>
        </FormGroup>

        <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
            입고
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default AddProductStockModal;
