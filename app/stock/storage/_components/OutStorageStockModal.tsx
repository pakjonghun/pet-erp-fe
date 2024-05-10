import { FC } from 'react';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import BaseModal from '@/components/ui/modal/BaseModal';
import { Button, FormGroup, FormLabel, Stack, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { useCreateClient } from '@/http/graphql/hooks/client/useCreateClient';
import { filterEmptyValues } from '@/utils/common';
import { initStock } from '../constants';
import {
  CreateProductForm,
  CreateProductStockForm,
  createProductStockSchema,
} from '../_validations/createProductStockList';
import StockProduct from './StockProduct';
import { StockStorageOutput } from '@/http/graphql/codegen/graphql';

interface Props {
  open: boolean;
  onClose: () => void;
  storageStock: null | StockStorageOutput;
}

const OutStorageStockModal: FC<Props> = ({ open, onClose, storageStock }) => {
  const [createClient, { loading }] = useCreateClient();

  const {
    watch,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductStockForm>({
    resolver: zodResolver(createProductStockSchema),
    defaultValues: {
      productList: [],
    },
  });

  const onSubmit = (values: CreateProductStockForm) => {
    const newValues = filterEmptyValues(values) as CreateProductStockForm;
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const { append, remove, replace, fields } = useFieldArray({
    control,
    name: 'productList',
  });

  const handleAppendProduct = () => {
    const newStock = storageStock
      ? { ...initStock, storage: storageStock.name ?? '' }
      : initStock;
    append(newStock);
  };

  const currentProductList = watch('productList');

  const handleReplaceProduct = (
    index: number,
    newProduct: CreateProductForm
  ) => {
    const clonedFields = [...currentProductList];
    clonedFields[index] = newProduct;
    replace(clonedFields);
  };

  const totalCount = currentProductList.reduce(
    (acc, cur) => acc + cur.count,
    0
  );

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        출고 재고 입력
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{ mt: 4 }}>
          <Stack direction="row" alignItems="center" gap={3}>
            <FormLabel>출고 재고 목록</FormLabel>
            <Button
              onClick={handleAppendProduct}
              variant="outlined"
              endIcon={<PlusOneIcon />}
            >
              추가
            </Button>
            <Typography>{`총수량 : ${totalCount}EA`}</Typography>
          </Stack>
          <Stack sx={{ mt: 2 }} gap={2}>
            {fields.map((product, index) => {
              return (
                <StockProduct
                  isStorageFreeze={!!product.storage}
                  index={index}
                  control={control}
                  error={errors.productList?.[index]}
                  key={`${product.id}_${index}_'autocomplete`}
                  remove={remove}
                  replace={handleReplaceProduct}
                />
              );
            })}
          </Stack>
        </FormGroup>

        <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button
            type="submit"
            endIcon={loading ? <CommonLoading /> : ''}
            variant="contained"
          >
            출고
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default OutStorageStockModal;
