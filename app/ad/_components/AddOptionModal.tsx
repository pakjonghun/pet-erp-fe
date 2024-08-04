import PlusOneIcon from '@mui/icons-material/PlusOne';
import { FC } from 'react';
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
import { PRODUCT_PREFIX } from '@/constants';
import { modalSizeProps } from '@/components/commonStyles';
import { CreateOptionForm, createOptionSchema } from '../_validations/adsInput';
import { client } from '@/http/graphql/client';
import { useCreateOption } from '@/http/graphql/hooks/option/useCreateOption';
import { initProductOption } from '../constants';
import ProductOption from './ProductOption';
import { OptionProductInput } from '@/http/graphql/codegen/graphql';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddOptionModal: FC<Props> = ({ open, onClose }) => {
  const [createOption, { loading }] = useCreateOption();

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
      id: '',
      name: '',
      productOptionList: [],
    },
  });

  const productOptionListErrorMessage = errors.productOptionList?.message;

  const onSubmit = ({ productOptionList, ...rest }: CreateOptionForm) => {
    createOption({
      variables: {
        createOptionInput: {
          ...rest,
          productOptionList: productOptionList.map((o) => {
            const result: OptionProductInput = {
              productCode: o.productCode.code,
              count: o.count,
            };
            return result;
          }),
        },
      },
      onCompleted: () => {
        snackMessage({ message: '옵션 등록이 완료되었습니다.', severity: 'success' });
        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'options' });
          },
        });

        handleClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '옵션 등록이 실패했습니다.', severity: 'error' });
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'productOptionList',
  });

  const handleAppendOption = () => {
    clearErrors('productOptionList');
    append(initProductOption);
  };

  const selectedOptions = watch('productOptionList');

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        옵션 등록
      </Typography>
      <Typography sx={{ mb: 3 }}>새로운 옵션 을 등록합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="id"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  {...field}
                  size="small"
                  required
                  label="옵션 아이디"
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
            생성
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default AddOptionModal;
