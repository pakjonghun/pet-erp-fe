import { FC, useState } from 'react';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import BaseModal from '@/components/ui/modal/BaseModal';
import { Box, Button, FormGroup, FormLabel, Stack, Tab, Tabs, Typography } from '@mui/material';
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
import { CreateStockInput, StockColumn } from '@/http/graphql/codegen/graphql';
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
    setValue,
    formState: { errors },
  } = useForm<CreateProductStockForm>({
    resolver: zodResolver(createProductStockSchema),
    defaultValues: {
      stocks: [],
    },
  });

  const [tabValue, setTabValue] = useState<number>(0);
  const handleClickTab = (value: number) => () => {
    setTabValue(value);
    setValue('stocks', [] as unknown as any);
  };

  const onSubmit = (values: CreateProductStockForm) => {
    const newValues = filterEmptyValues(values) as CreateStockInput;
    const newStocks = newValues.stocks.map((stock) => ({
      ...stock,
      isSubsidiary: !!tabValue,
    }));
    newValues.stocks = newStocks;
    addStock({
      variables: {
        addStocksInput: newValues,
      },
      onCompleted: () => {
        snackMessage({
          message: '재고 입력이 완료되었습니다.',
          severity: 'success',
        });
        client.refetchQueries({
          updateCache(cache) {
            if (tabValue == 1) {
              cache.evict({ fieldName: 'subsidiaryStocks' });
              cache.evict({ fieldName: 'subsidiaryStocksState' });
              cache.evict({ fieldName: 'subsidiaryCountStocks' });
            }
            cache.evict({ fieldName: 'stocks' });
            cache.evict({ fieldName: 'productCountStocks' });
            cache.evict({ fieldName: 'stocksState' });
            cache.evict({ fieldName: 'productSales' });
          },
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
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ fontWeight: 600 }}>
        입고 재고 입력
      </Typography>

      {productStock == null && (
        <Box sx={{ mt: 1, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue}>
            <Tab sx={{ fontSize: 14 }} onClick={handleClickTab(0)} label="제품" />
            <Tab sx={{ fontSize: 14 }} onClick={handleClickTab(1)} label="부자재" />
          </Tabs>
        </Box>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{ mt: 4 }}>
          <Stack
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: {
                xs: 'flex-start',
                md: 'center',
              },
            }}
            gap={3}
          >
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
                  isSubsidiary={!!tabValue}
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
