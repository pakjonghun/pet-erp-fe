import PlusOneIcon from '@mui/icons-material/PlusOne';
import { FC, useState } from 'react';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { PRODUCT_PREFIX } from '@/constants';
import { modalSizeProps } from '@/components/commonStyles';
import { client } from '@/http/graphql/client';
import { useCreateOption } from '@/http/graphql/hooks/option/useCreateOption';
import { AdTypeToHangle, initProductOption } from '../constants';
import ProductOption from './ProductOption';
import { AdType, OptionProductInput, OutClient } from '@/http/graphql/codegen/graphql';
import { useSearchParams } from 'next/navigation';
import { HandleQuery } from '@/hooks/useHandleQuery';
import { ClearIcon } from '@mui/x-date-pickers';
import TableTitle from '@/components/ui/typograph/TableTitle';
import { CreateAdForm, createAdSchema } from '../_validations/createSubsidiaryValidation copy';
import { useCreateAd } from '@/http/graphql/hooks/ad/useCreateAd';
import NumberInput from '@/components/ui/input/NumberInput';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import { DateRange } from '@/components/calendar/dateFilter/type';
import dayjs from 'dayjs';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import SelectClient from './SelectClient';

interface Props {
  q: HandleQuery;
}

const AddOptionModal: FC<Props> = ({ q }) => {
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');
  const [selectedClient, setSelectedClient] = useState<null | OutClient>(null);

  const isOpen = q.getQuery('createAd') == '1';
  const tabs = Object.keys(AdTypeToHangle) as (keyof typeof AdTypeToHangle)[];
  const tab = q.getQuery('tab');
  const [createAd, { loading }] = useCreateAd();

  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAdForm>({
    resolver: zodResolver(createAdSchema),
    defaultValues: {
      type: tab as AdType,
      from: new Date(),
      to: new Date(),
      price: 0,
      productCodeList: [],
    },
  });

  const handleClose = () => {
    q.resetQuery();
  };

  const onSubmit = (createAdInput: CreateAdForm) => {
    createAd({
      variables: { createAdInput },
      onCompleted: () => {
        snackMessage({ message: '광고 생성이 성공하였습니다', severity: 'success' });
        handleClose();
      },
      onError: (err) => {
        snackMessage({
          message: err.message ?? '광고 생성이 실패하였습니다.',
          severity: 'error',
        });
      },
    });
  };

  const setDateRange = (range: DateRange) => {
    setValue('from', range.from.toDate());
    setValue('to', range.to.toDate());
  };

  if (!isOpen) return <></>;

  return (
    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'white', zIndex: 1000 }}>
      <TableTitle sx={{ ml: 2 }} title="광고 등록" />
      <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 3, top: 3 }}>
        <ClearIcon />
      </IconButton>
      <Tabs
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}` }}
        variant="scrollable"
        value={q.getQuery('tab')}
        indicatorColor="primary"
      >
        {tabs.map((tab) => {
          const tabItem = AdTypeToHangle[tab];
          return (
            <Tab
              sx={{
                transition: 'all .3s',
                fontSize: 16,
                '&:hover': {
                  bgcolor: (theme) => theme.palette.action.selected,
                },
                '&.Mui-selected': {
                  fontWeight: 800,
                },
              }}
              onClick={() => q.appendQuery('tab', tab)}
              label={tabItem}
              key={tab}
              value={tab}
            />
          );
        })}
      </Tabs>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          gap={2}
          sx={{
            mt: 3,
            mx: 2,
            flexDirection: {
              xs: 'column',
            },
          }}
          justifyContent="flex-end"
        >
          <SwitchDate
            dateRange={{ from: dayjs(watch('from')), to: dayjs(watch('to')) }}
            searchStandard={searchStandard}
            setDateRange={setDateRange}
            setSearchStandard={setSearchStandard}
          />

          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <FormControl required>
                <NumberInput
                  sx={{ width: '100%' }}
                  field={field}
                  label="광고비용"
                  error={!!errors.price?.message}
                  helperText={errors.price?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <SelectClient
            control={control}
            onSelectedClient={setSelectedClient}
            selectedClient={selectedClient}
            errorMessage={errors.clientCode?.message}
          />
          <Stack
            sx={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <Button type="button" variant="outlined" onClick={handleClose}>
              취소
            </Button>
            <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
              생성
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );

  // const productOptionListErrorMessage = errors.productOptionList?.message;

  // const onSubmit = ({ productOptionList, ...rest }: CreateOptionForm) => {
  //   createOption({
  //     variables: {
  //       createOptionInput: {
  //         ...rest,
  //         productOptionList: productOptionList.map((o) => {
  //           const result: OptionProductInput = {
  //             productCode: o.productCode.code,
  //             count: o.count,
  //           };
  //           return result;
  //         }),
  //       },
  //     },
  //     onCompleted: () => {
  //       snackMessage({ message: '옵션 등록이 완료되었습니다.', severity: 'success' });
  //       client.refetchQueries({
  //         updateCache(cache) {
  //           cache.evict({ fieldName: 'options' });
  //         },
  //       });

  //       handleClose();
  //     },
  //     onError: (err) => {
  //       const message = err.message;
  //       snackMessage({ message: message ?? '옵션 등록이 실패했습니다.', severity: 'error' });
  //     },
  //   });
  // };

  // const handleClose = () => {
  //   reset();
  //   onClose();
  // };

  // const { append, remove, fields } = useFieldArray({
  //   control,
  //   name: 'productOptionList',
  // });

  // const handleAppendOption = () => {
  //   clearErrors('productOptionList');
  //   append(initProductOption);
  // };

  // const selectedOptions = watch('productOptionList');

  // return (
  //   <BaseModal open={open} onClose={handleClose}>
  //     <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
  //       옵션 등록
  //     </Typography>
  //     <Typography sx={{ mb: 3 }}>새로운 옵션 을 등록합니다.</Typography>
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <FormGroup sx={modalSizeProps}>
  //         <Controller
  //           control={control}
  //           name="id"
  //           render={({ field }) => (
  //             <FormControl required>
  //               <TextField
  //                 {...field}
  //                 size="small"
  //                 required
  //                 label="옵션 아이디"
  //                 error={!!errors.id?.message}
  //                 helperText={errors.id?.message ?? ''}
  //               />
  //             </FormControl>
  //           )}
  //         />
  //         <Controller
  //           control={control}
  //           name="name"
  //           render={({ field }) => (
  //             <FormControl required>
  //               <TextField
  //                 size="small"
  //                 {...field}
  //                 required
  //                 label="옵션 이름"
  //                 error={!!errors.name?.message}
  //                 helperText={errors.name?.message ?? ''}
  //               />
  //             </FormControl>
  //           )}
  //         />
  //         <Button onClick={handleAppendOption} variant="outlined" endIcon={<PlusOneIcon />}>
  //           옵션을 적용할 제품 추가
  //         </Button>
  //         {!!productOptionListErrorMessage ? (
  //           <Typography variant="body1" color="error">
  //             {productOptionListErrorMessage}
  //           </Typography>
  //         ) : (
  //           <></>
  //         )}
  //         {fields.map((field, index) => {
  //           return (
  //             <ProductOption
  //               selectedOptions={selectedOptions}
  //               key={`${index}_${Math.random()}`}
  //               control={control}
  //               index={index}
  //               error={errors}
  //               remove={remove}
  //             />
  //           );
  //         })}
  //       </FormGroup>
  //       <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
  //         <Button type="button" variant="outlined" onClick={handleClose}>
  //           취소
  //         </Button>
  //         <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
  //           생성
  //         </Button>
  //       </Stack>
  //     </form>
  //   </BaseModal>
  return <></>;
};

export default AddOptionModal;
