import PlusOneIcon from '@mui/icons-material/PlusOne';
import { FC } from 'react';
import { Box, Button, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { client } from '@/http/graphql/client';
import { AdTypeToHangle } from '../constants';
import { AdType } from '@/http/graphql/codegen/graphql';
import { HandleQuery } from '@/hooks/useHandleQuery';
import { ClearIcon } from '@mui/x-date-pickers';
import TableTitle from '@/components/ui/typograph/TableTitle';
import { CreateAdForm, createAdSchema } from '../_validations/createSubsidiaryValidation copy';
import { useCreateAd } from '@/http/graphql/hooks/ad/useCreateAd';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { getNumberToString } from '@/utils/sale';
import AdItem from './AdItem';
import dayjs from 'dayjs';

interface Props {
  q: HandleQuery;
}

const AddAdsModal: FC<Props> = ({ q }) => {
  const isOpen = q.getQuery('createAd') == '1';
  const tabs = Object.keys(AdTypeToHangle).slice(1) as (keyof typeof AdTypeToHangle)[];
  const adType = q.getQuery('tab');

  const [createAd, { loading }] = useCreateAd();

  const defaultAdItem = {
    type: adType as AdType,
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
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CreateAdForm>({
    resolver: zodResolver(createAdSchema),
    defaultValues: {
      ads: [],
    },
  });

  const handleDispose = () => {
    reset();
    handleClose();
  };

  const adsErrorMessage = errors.ads?.message;

  const { append, remove, fields } = useFieldArray({ control, name: 'ads' });
  const ads = watch('ads');
  const totalCount = ads.length;
  const totalPrice = ads.reduce((acc, cur) => cur.price + acc, 0);

  const handleAppendAd = () => {
    clearErrors('ads');
    append(defaultAdItem);
  };

  const handleRemoveAd = (index: number) => {
    remove(index);
  };

  const handleClose = () => {
    q.resetQuery();
  };

  const onSubmit = (createAdInput: CreateAdForm) => {
    const channelNeed =
      adType == AdType.ChannelProductRate ||
      adType == AdType.ChannelAppProduct ||
      adType == AdType.ChannelSpecialProduct;
    const productNeed =
      adType == AdType.ChannelAppProduct || adType == AdType.ChannelSpecialProduct;

    const createAdsInput = createAdInput.ads.map((i) => {
      let clientCode = undefined;
      let productCodeList = undefined;
      if (channelNeed) {
        clientCode = i.clientCode?.code ?? undefined;
      }

      if (productNeed) {
        productCodeList = i.productCodeList?.map((p) => p.code) ?? [];
      }

      return {
        ...i,
        clientCode,
        productCodeList,
      };
    });

    createAd({
      variables: { createAdInput: { createAdsInput } },
      onCompleted: () => {
        snackMessage({ message: '광고 생성이 성공하였습니다', severity: 'success' });

        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'ads' });
          },
        });
        handleDispose();
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

  const getDateRange = (index: number) => {
    const from = watch(`ads.${index}.from`);
    const to = watch(`ads.${index}.to`);
    return { from: dayjs(from), to: dayjs(to) };
  };

  const hasError = Object.keys(errors).length > 0;
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
        <IconButton onClick={handleDispose} sx={{ position: 'absolute', right: 3, top: 3 }}>
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
                onClick={() => {
                  q.appendQuery('tab', tab);
                }}
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
            <Typography variant="caption">{`비용 합계 : ${getNumberToString(
              totalPrice,
              'comma'
            )}`}</Typography>
          </Stack>
          <Button onClick={handleAppendAd} variant="outlined" endIcon={<PlusOneIcon />}>
            광고 추가
          </Button>
        </Stack>
      </Box>
      <Typography sx={{ ml: 2 }} color="red">
        {adsErrorMessage ?? ''}
      </Typography>
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
            const selectedProductList = watch(`ads.${index}.productCodeList`);
            return (
              <AdItem
                q={q}
                removeAd={handleRemoveAd}
                selectedProductList={selectedProductList}
                key={item.id}
                control={control}
                errors={errors}
                item={item}
                index={index}
                getDateRange={getDateRange}
                setDateRange={setDateRange}
              />
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
          <Button type="button" variant="outlined" onClick={handleDispose}>
            취소
          </Button>
          <Button
            disabled={hasError || loading}
            type="submit"
            endIcon={loading ? <CommonLoading /> : ''}
            variant="contained"
          >
            생성
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddAdsModal;
