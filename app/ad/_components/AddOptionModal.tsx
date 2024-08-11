import PlusOneIcon from '@mui/icons-material/PlusOne';
import CloseIcon from '@mui/icons-material/Close';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
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
import { AdType, OptionProductInput, OutClient, Product } from '@/http/graphql/codegen/graphql';
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
import SelectProductList from './SelectProductList';
import { getDateRange } from '@/components/calendar/dateFilter/utils';
import { getNumberToString } from '@/utils/sale';

interface Props {
  q: HandleQuery;
}

const AddOptionModal: FC<Props> = ({ q }) => {
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');
  const [selectedClient, setSelectedClient] = useState<null | OutClient>(null);
  const [selectedProductList, setSelectedProductList] = useState<null | Product[]>([]);

  const isOpen = q.getQuery('createAd') == '1';
  const tabs = Object.keys(AdTypeToHangle) as (keyof typeof AdTypeToHangle)[];
  const tab = q.getQuery('tab');
  const [createAd, { loading }] = useCreateAd();

  const defaultAdItem = {
    type: tab as AdType,
    from: new Date(),
    to: new Date(),
    price: 0,
    productCodeList: [],
  };

  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAdForm>({
    resolver: zodResolver(createAdSchema),
    defaultValues: {
      ads: [],
    },
  });

  const { append, remove, fields } = useFieldArray({ control, name: 'ads' });
  const ads = watch('ads');
  const totalCount = ads.length;
  const totalPrice = ads.reduce((acc, cur) => cur.price + acc, 0);

  const handleAppendAd = () => {
    append(defaultAdItem);
  };

  const handleRemoveAd = (index: number) => {
    remove(index);
  };

  const handleClose = () => {
    q.resetQuery();
  };

  const onSubmit = (createAdInput: CreateAdForm) => {
    console.log('createAdInput : ', createAdInput);
    createAd({
      variables: { createAdInput: { createAdsInput: [] } },
      onCompleted: () => {
        snackMessage({ message: '광고 생성이 성공하였습니다', severity: 'success' });

        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'ads' });
          },
        });
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

  const setDateRange = (range: DateRange, index: number) => {
    setValue(`ads.${index}.from`, range.from.toDate());
    setValue(`ads.${index}.to`, range.to.toDate());
  };

  const dateDateRange = (index: number) => {
    const from = watch(`ads.${index}.from`);
    const to = watch(`ads.${index}.to`);
    return { from: dayjs(from), to: dayjs(to) };
  };

  if (!isOpen) return <></>;

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        bgcolor: (theme) => theme.palette.background.paper,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 2000,
          pb: 0.1,
        }}
      >
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
        <Stack
          sx={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexDirection: 'row',
            m: 2,
            mb: 4,
          }}
        >
          <Stack direction="row" gap={2}>
            <Typography variant="caption">{`총 광고수 : ${getNumberToString(
              totalCount,
              'comma'
            )}`}</Typography>
            <Typography variant="caption">{`비용 합계:${getNumberToString(
              totalPrice,
              'comma'
            )}`}</Typography>
          </Stack>
          <Button sx={{}} onClick={handleAppendAd} variant="outlined" endIcon={<PlusOneIcon />}>
            광고 추가
          </Button>
        </Stack>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="column"
          gap={2}
          sx={{
            m: 2,
            p: 1,
          }}
        >
          {fields.map((item, index) => {
            return (
              <Stack
                key={item.id}
                sx={{
                  gap: {
                    xs: 2,
                    lg: 4,
                  },
                  borderBottom: {
                    lg: 'none',
                    xs: '1px solid lightGrey',
                  },
                  flexDirection: {
                    xs: 'column',
                    lg: 'row',
                  },
                  flexWrap: {
                    lg: "'wrap'",
                    xs: 'nowrap',
                  },
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}
                justifyContent="space-between"
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: {
                      xs: '100%',
                      lg: 'auto',
                    },
                  }}
                >
                  <TextField
                    sx={{ width: '100%' }}
                    size="small"
                    label="광고날짜"
                    value={' '}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <SwitchDate
                    hideSwitch
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%,-50%)',
                      width: '100%',
                      pl: 1,
                    }}
                    dateRange={dateDateRange(index)}
                    searchStandard={searchStandard}
                    setDateRange={(range) => setDateRange(range, index)}
                    setSearchStandard={setSearchStandard}
                  />
                </Box>
                <Controller
                  control={control}
                  name={`ads.${index}.price`}
                  render={({ field }) => (
                    <FormControl
                      sx={{
                        flex: 0.6,
                        width: {
                          xs: '100%',
                          lg: 'auto',
                        },
                      }}
                      required
                    >
                      <NumberInput
                        sx={{ width: '100%' }}
                        field={field}
                        label="광고비용"
                        error={Boolean(errors?.ads?.[index]?.price?.message)}
                        helperText={errors?.ads?.[index]?.price?.message ?? ''}
                      />
                    </FormControl>
                  )}
                />
                <SelectClient
                  sx={{
                    flex: 1,
                    width: {
                      xs: '100%',
                      lg: 'auto',
                    },
                  }}
                  control={control}
                  index={index}
                  errorMessage={errors?.ads?.[index]?.clientCode?.message ?? ''}
                />
                <SelectProductList
                  index={index}
                  sx={{
                    flex: 2,
                    width: {
                      xs: '100%',
                      lg: 'auto',
                    },
                  }}
                  maxLen={1}
                  control={control}
                  selectedProductList={watch(`ads.${index}.productCodeList`)}
                  errorMessage={errors?.ads?.[index]?.productCodeList?.message ?? ''}
                />
                <IconButton sx={{ ml: 'auto' }} onClick={() => handleRemoveAd(index)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            );
          })}
        </Stack>
        <Stack
          direction="row"
          gap={2}
          sx={{
            width: '100%',
            justifyContent: 'flex-end',
            pr: 2,
            py: 2,
          }}
        >
          <Button type="button" variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
            생성
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddOptionModal;
