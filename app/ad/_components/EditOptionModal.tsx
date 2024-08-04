import PlusOneIcon from '@mui/icons-material/PlusOne';
import { FC, useEffect, useState } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import useTextDebounce from '@/hooks/useTextDebounce';
import { PRODUCT_PREFIX } from '@/constants';
import { modalSizeProps } from '@/components/commonStyles';
import { CreateOptionForm, createOptionSchema } from '../_validations/adsInput';
import { OutputOption } from '@/http/graphql/codegen/graphql';
import { useUpdateOption } from '@/http/graphql/hooks/option/useUpdateOption';
import { initProductOption } from '../constants';
import ProductOption from './ProductOption';

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
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<CreateOptionForm>({
    resolver: zodResolver(createOptionSchema),
    defaultValues: {
      id: selectedSubsidiary.id,
      name: selectedSubsidiary.name,
      productOptionList: selectedSubsidiary.productOptionList,
    },
  });

  useEffect(() => {
    reset({
      id: selectedSubsidiary.id,
      name: selectedSubsidiary.name,
      productOptionList: selectedSubsidiary.productOptionList,
    });
  }, [selectedSubsidiary]);

  const [productKeyword, setProductKeyword] = useState('');
  const delayedProductKeyword = useTextDebounce(productKeyword);

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'productOptionList',
  });

  const handleAppendOption = () => {
    clearErrors('productOptionList');
    append(initProductOption);
  };

  const onSubmit = ({ productOptionList, ...rest }: CreateOptionForm) => {
    updateSubsidiary({
      variables: {
        updateOptionInput: {
          ...rest,
          id: selectedSubsidiary.id,
          productOptionList: productOptionList.map((item) => {
            const result = {
              count: item.count,
              productCode: item.productCode.code,
            };
            return result;
          }),
        },
      },
      onCompleted: (res) => {
        snackMessage({
          message: '옵션 편집이 완료되었습니다.',
          severity: 'success',
        });
        setSelectedSubsidiary(res.updateOption as OutputOption);
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

  const productOptionListErrorMessage = errors.productOptionList?.message;
  const selectedOptions = watch('productOptionList');

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
          <Button onClick={handleAppendOption} variant="outlined" endIcon={<PlusOneIcon />}>
            옵션을 적용할 제품 추가
          </Button>
          {!!productOptionListErrorMessage ? (
            <Typography variant="body1" color="error">
              {productOptionListErrorMessage}
            </Typography>
          ) : (
            <></>
          )}
          {fields.map((field, index) => {
            return (
              <ProductOption
                selectedOptions={selectedOptions}
                key={`${index}_${Math.random()}`}
                control={control}
                index={index}
                error={errors}
                remove={remove}
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

export default AddSubsidiaryModal;
