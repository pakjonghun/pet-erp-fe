'use client';

import CreateOptionModal from './_components/AddAdsModal';
import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import { AdTypeToEng, AdTypeToHangle, headerList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import OptionCards from './_components/OptionCards';
import SubsidiaryTableBody from './_components/SubsidiaryTableBody';
import { CommonHeaderRow, CommonTable } from '@/components/commonStyles';
import { SelectOption } from './types';
import {
  AdsInput,
  AdsOutPutItem,
  AdType,
  Order,
  OutClient,
  UserRole,
} from '@/http/graphql/codegen/graphql';
import RemoveSubsidiaryModal from './_components/RemoveSubsidiaryModal';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';
import dayjs from 'dayjs';
import ActionSection from './ActionSection';
import SearchSection from './SearchSection';
import useHandleQuery from '@/hooks/useHandleQuery';
import { useAds } from '@/http/graphql/hooks/ad/useAds';
import ResizableContainer from '@/components/resize/ResizableContainer';
import { Controller, useForm } from 'react-hook-form';
import { AdItemForm, createAdItemSchema } from './_validations/createSubsidiaryValidation copy';
import { zodResolver } from '@hookform/resolvers/zod';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import NumberInput from '@/components/ui/input/NumberInput';
import BaseSelect from '@/components/ui/select/BaseSelect';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { useUpdateAd } from '@/http/graphql/hooks/ad/useUpdateAd';
import { snackMessage } from '@/store/snackMessage';
import { client } from '@/http/graphql/client';
import CommonLoading from '@/components/ui/loading/CommonLoading';

const BackDataPage = () => {
  const [from, setFrom] = useState(() => dayjs());
  const [to, setTo] = useState(() => dayjs());
  const [type, setType] = useState<null | AdType>(null);
  const [sort, setSort] = useState('updatedAt');
  const [order, setOrder] = useState(-1);
  const [keyword, setKeyword] = useState('');
  const [isDateChecked, setIsDateChecked] = useState(false);
  const [isShowAllProduct, setIsShowAllProduct] = useState(false);
  const handleAdTypes = Object.values(AdTypeToHangle).slice(1);
  const q = useHandleQuery();

  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdItemForm>({
    resolver: zodResolver(createAdItemSchema),
  });

  const hasError = Object.keys(errors).length > 0;
  const adType = watch('type');
  const channelNeed =
    adType == AdType.ChannelProductRate ||
    adType == AdType.ChannelAppProduct ||
    adType == AdType.ChannelSpecialProduct;
  const productNeed = adType == AdType.ChannelAppProduct || adType == AdType.ChannelSpecialProduct;

  const getHeaderList = () => {
    if (channelNeed && productNeed) {
      return ['광고날짜'].concat(headerList.slice(2));
    } else if (channelNeed) {
      return ['광고날짜'].concat(headerList.slice(2, -1));
    } else {
      return ['광고날짜'].concat(headerList.slice(2, -2));
    }
  };

  const [selectedOption, setSelectedAd] = useState<null | AdsOutPutItem>(null);

  const setSelectedOption = (item: AdsOutPutItem | null) => {
    setSelectedAd(item);

    setSelectAll(item?.productCodeList?.length == productRows.length);
    if (item !== null) {
      setValue('from', new Date(item.from));
      setValue('to', new Date(item.to));
      setValue('clientCode', item.clientCode);
      setValue('productCodeList', item.productCodeList);
      setValue('price', item.price);
      setValue('type', item.type);
    }
  };

  const searchQuery: AdsInput = {
    from,
    keyword,
    limit: LIMIT,
    skip: 0,
    to,
    type,
  };

  const setSearchQuery = ({ from, to, type, keyword }: AdsInput) => {
    setKeyword(keyword);
    setFrom(from);
    setTo(to);
    setType(type ?? null);
  };

  const { data: userData } = useGetMyInfo();
  const myRole = userData?.myInfo.role ?? [];
  const canDelete = myRole.includes(UserRole.BackDelete);
  const canEdit = myRole.includes(UserRole.BackEdit);

  const { data, networkStatus, fetchMore } = useAds({
    ...searchQuery,
    keyword,
    from: isDateChecked ? from : undefined,
    to: isDateChecked ? to : undefined,
    skip: 0,
  });
  const rows = (data?.ads?.data as AdsOutPutItem[]) ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1 || networkStatus == 2;
  const isEmpty = !isLoading && rows.length === 0;
  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.ads?.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            adsInput: {
              ...searchQuery,
              keyword,
              from: isDateChecked ? from : undefined,
              to: isDateChecked ? to : undefined,
              skip: rows.length,
            },
          },
        });
      }
    }
  };
  const tableScrollRef = useInfinityScroll({ callback });
  const cardScrollRef = useInfinityScroll({ callback });

  const [optionType, setOptionType] = useState<null | SelectOption>(null);
  const handleClickEdit = () => {
    setOptionType('edit');
  };

  const handleClickDelete = () => {
    setOptionType('delete');
  };

  const [clientKeyword, setClientKeyword] = useState('');
  const clientDelayedKeyword = useTextDebounce(clientKeyword);
  const {
    data: clients,
    networkStatus: clientNetworks,
    fetchMore: fetchClient,
  } = useClients({
    keyword: clientDelayedKeyword,
    skip: 0,
    limit: LIMIT,
    sort: 'createdAt',
    order: Order.Desc,
  });

  const isClientLoading = clientNetworks <= 3;

  const clientRows = (clients?.clients.data as OutClient[]) ?? [];

  const clientCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isClientLoading) return;

      const totalCount = clients?.clients.totalCount;
      if (totalCount != null && totalCount > clientRows.length) {
        fetchClient({
          variables: {
            clientsInput: {
              keyword: clientDelayedKeyword,
              skip: clientRows.length,
              limit: LIMIT,
              sort: 'createdAt',
              order: Order.Desc,
            },
          },
        });
      }
    }
  };
  const scrollRef = useInfinityScroll({ callback: clientCallback });

  const [productKeyword, setProductKeyword] = useState('');
  const productDelayedKeyword = useTextDebounce(keyword);
  const [selectAll, setSelectAll] = useState(false);
  const { data: products, networkStatus: productNetworkStatus } = useProducts({
    keyword: productDelayedKeyword,
    limit: 9999999,
    skip: 0,
  });

  const isProductLoading = productNetworkStatus <= 3;
  const productRows = products?.products.data ?? [];
  const selectedProductList = watch('productCodeList');

  useEffect(() => {
    if (!productRows) return;

    const isAllSelected = productRows.length === selectedProductList?.length;
    setSelectAll(isAllSelected);
  }, [productRows, watch, setSelectAll, selectedProductList]);

  const [updateAd, { loading }] = useUpdateAd();

  const onSubmit = (updateAdInput: AdItemForm) => {
    if (!selectedOption?._id) return;

    const adType = updateAdInput.type;
    const channelNeed =
      adType == AdType.ChannelProductRate ||
      adType == AdType.ChannelAppProduct ||
      adType == AdType.ChannelSpecialProduct;
    const productNeed =
      adType == AdType.ChannelAppProduct || adType == AdType.ChannelSpecialProduct;

    let clientCode = undefined;
    let productCodeList = undefined;
    if (channelNeed) {
      clientCode = updateAdInput.clientCode?.code ?? undefined;
    }

    if (productNeed) {
      productCodeList = updateAdInput.productCodeList?.map((p) => p.code) ?? [];
    }

    const newItem = {
      ...updateAdInput,
      clientCode,
      productCodeList,
    };

    updateAd({
      variables: {
        updateAdInput: {
          _id: selectedOption!._id,
          ...newItem,
        },
      },
      onCompleted: () => {
        snackMessage({ message: '광고 업데이트가 성공하였습니다', severity: 'success' });

        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'ads' });
          },
        });
      },
      onError: (err) => {
        snackMessage({
          message: err.message ?? '광고 생성이 실패하였습니다.',
          severity: 'error',
        });
      },
    });
  };
  return (
    <>
      <ResizableContainer>
        <TablePage sx={{ flex: 1, position: 'relative', overflow: 'auto', minHeight: '100%' }}>
          <CreateOptionModal q={q} />
          <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
            <TableTitle title="광고 조회" />
            <ActionSection q={q} />
          </Stack>
          <SearchSection
            isDateChecked={isDateChecked}
            setIsDateChecked={setIsDateChecked}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
          <Typography sx={{ p: 3 }}>
            {isEmpty ? '검색 결과가 없습니다' : `총 ${data?.ads?.totalCount ?? ''}건 검색`}
          </Typography>
          <OptionCards
            sx={{
              display: {
                xs: 'block',
                md: 'none',
              },
            }}
            isLoading={isLoading}
            data={rows}
            isEmpty={isEmpty}
            scrollRef={cardScrollRef}
          />
          <ScrollTableContainer
            sx={{
              display: {
                xs: 'none',
                md: 'block',
              },
              height: '40vh',
            }}
          >
            <CommonTable stickyHeader>
              <TableHead>
                <CommonHeaderRow>
                  {headerList.map((item, index) => (
                    <HeadCell key={`${index}_${item}`} text={item} />
                  ))}
                </CommonHeaderRow>
              </TableHead>
              <SubsidiaryTableBody
                selectedSubsidiary={selectedOption}
                setSelectedSubsidiary={setSelectedOption}
                isLoading={isLoading}
                data={rows}
                isEmpty={isEmpty}
                scrollRef={tableScrollRef}
              />
            </CommonTable>
          </ScrollTableContainer>
        </TablePage>
      </ResizableContainer>
      {q.getQuery('createAd') != '1' && (
        <TablePage
          sx={{
            flex: 1,
            display: {
              xs: 'none',
              md: 'block',
            },
            px: 2,
          }}
        >
          <TableTitle title="선택된 옵션 데이터" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer
              sx={{
                display: {
                  xs: 'none',
                  md: 'block',
                },
              }}
            >
              <CommonTable stickyHeader>
                <TableHead>
                  <CommonHeaderRow>
                    {getHeaderList().map((item, index) => (
                      <HeadCell key={`${index}_${item}`} text={item} />
                    ))}
                  </CommonHeaderRow>
                </TableHead>
                {!!selectedOption ? (
                  <TableRow
                    sx={{
                      td: {
                        p: 0,
                      },
                    }}
                    hover
                    ref={null}
                  >
                    <Cell sx={{ width: 140 }}>
                      <Box
                        sx={{
                          m: 0,
                          position: 'relative',
                          flex: 1,
                          width: '100%',
                          border: 'none',
                        }}
                      >
                        <TextField
                          sx={{
                            width: '100%',
                            minWidth: 160,
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none',
                              },
                            },
                          }}
                          size="small"
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
                            border: 'none',
                          }}
                          dateRange={{
                            from: dayjs(watch('from')),
                            to: dayjs(watch('to')),
                          }}
                          searchStandard={'일'}
                          setDateRange={(range) => {
                            setValue('from', range.from.toDate());
                            setValue('to', range.to.toDate());
                          }}
                          setSearchStandard={() => {}}
                        />
                      </Box>
                    </Cell>
                    <Cell sx={{ width: 130 }}>
                      <Controller
                        name="type"
                        control={control}
                        render={({ field }) => {
                          return (
                            <FormControl sx={{ width: '100%' }}>
                              <BaseSelect
                                sx={{
                                  '&.MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      border: 'none',
                                    },
                                  },
                                }}
                                defaultValue={field.value}
                                label=""
                                onChangeValue={(event) => {
                                  const hangleType = event.target.value;
                                  field.onChange(AdTypeToEng[hangleType]);
                                }}
                                optionItems={handleAdTypes}
                                value={AdTypeToHangle[field.value]}
                              />
                            </FormControl>
                          );
                        }}
                      />
                    </Cell>
                    <Cell sx={{ width: 150 }}>
                      <Controller
                        control={control}
                        name="price"
                        render={({ field }) => (
                          <FormControl
                            sx={{
                              flex: 0.6,
                              width: {
                                xs: '100%',
                              },
                            }}
                            required
                          >
                            <NumberInput
                              sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    border: 'none',
                                  },
                                },
                              }}
                              field={field}
                              label=""
                              error={Boolean(errors.price?.message)}
                              helperText={errors.price?.message ?? ''}
                            />
                          </FormControl>
                        )}
                      />
                    </Cell>
                    {channelNeed && (
                      <Cell sx={{ width: 190 }}>
                        <Controller
                          name="clientCode"
                          control={control}
                          render={({ field }) => {
                            return (
                              <Autocomplete
                                value={field.value}
                                isOptionEqualToValue={(a, b) => a.code == b.code}
                                options={clientRows}
                                loading={isClientLoading}
                                getOptionLabel={(item) => `${item.name}`}
                                defaultValue={null}
                                inputValue={clientKeyword}
                                onInputChange={(_, newValue) => setClientKeyword(newValue)}
                                noOptionsText="검색 결과가 없습니다."
                                loadingText="로딩중입니다."
                                onChange={(_, value) => field.onChange(value)}
                                filterOptions={(options) => {
                                  return options;
                                }}
                                renderOption={(props, item, state) => {
                                  const { key, ...rest } = props as any;
                                  const isLast = state.index === clientRows.length - 1;
                                  return (
                                    <Box
                                      component="li"
                                      ref={isLast ? scrollRef : null}
                                      key={item}
                                      {...rest}
                                    >
                                      {`${item.name}(${item.code})`}
                                    </Box>
                                  );
                                }}
                                renderInput={(params: AutocompleteRenderInputParams) => {
                                  return (
                                    <FormControl fullWidth>
                                      <TextField
                                        {...params}
                                        sx={{
                                          '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                              border: 'none',
                                            },
                                          },
                                        }}
                                        name={field.name}
                                        label=""
                                        error={!!errors.clientCode?.message}
                                        helperText={errors.clientCode?.message ?? ''}
                                        size="small"
                                      />
                                    </FormControl>
                                  );
                                }}
                              />
                            );
                          }}
                        />
                      </Cell>
                    )}
                    {productNeed && (
                      <Cell sx={{ width: 250 }}>
                        <Controller
                          control={control}
                          name="productCodeList"
                          render={({ field }) => {
                            return (
                              <Stack
                                sx={{ pl: 1, width: '100%' }}
                                direction="row"
                                gap={0.2}
                                alignItems="flex-start"
                              >
                                <FormControlLabel
                                  label={<Typography variant="caption">All</Typography>}
                                  control={
                                    <Checkbox
                                      size="small"
                                      checked={selectAll}
                                      onChange={(_, checked) => {
                                        const options = checked ? productRows : [];
                                        field.onChange(options);
                                        setSelectAll(checked);
                                      }}
                                    />
                                  }
                                />
                                <Autocomplete
                                  sx={{ width: '100%' }}
                                  size="small"
                                  multiple
                                  value={field.value ?? undefined}
                                  options={productRows.map((i) => ({ name: i.name, code: i.code }))}
                                  loading={isProductLoading}
                                  getOptionLabel={(item) => `${item.name}(${item.code})`}
                                  disableCloseOnSelect
                                  isOptionEqualToValue={(a, b) => a.code == b.code}
                                  inputValue={productKeyword}
                                  onInputChange={(_, newValue) => setProductKeyword(newValue)}
                                  noOptionsText="검색 결과가 없습니다."
                                  loadingText="로딩중입니다."
                                  limitTags={1}
                                  filterOptions={(o) => o}
                                  onChange={(_, value) => field.onChange(value)}
                                  renderOption={(props, item) => {
                                    const { key, ...rest } = props as any;
                                    return (
                                      <Box component="li" key={item.code} {...rest}>
                                        {`${item.name}(${item.code})`}
                                      </Box>
                                    );
                                  }}
                                  renderInput={(params: AutocompleteRenderInputParams) => {
                                    return (
                                      <FormControl sx={{ width: '100%' }}>
                                        <TextField
                                          {...params}
                                          sx={{
                                            '& .MuiOutlinedInput-root': {
                                              '& fieldset': {
                                                border: 'none',
                                              },
                                            },
                                          }}
                                          name={field.name}
                                          label=""
                                          error={!!errors.productCodeList?.message}
                                          helperText={errors.productCodeList?.message ?? ''}
                                          size="small"
                                        />
                                      </FormControl>
                                    );
                                  }}
                                />
                              </Stack>
                            );
                          }}
                        />
                      </Cell>
                    )}
                  </TableRow>
                ) : (
                  <EmptyRow
                    colSpan={7}
                    isEmpty={!selectedOption}
                    message="선택된 데이터가 없습니다."
                  />
                )}
              </CommonTable>
            </TableContainer>
            {!!selectedOption && (
              <Stack direction="row" gap={1} sx={{ mt: 2 }} justifyContent="flex-end">
                {canDelete && (
                  <Button color="error" variant="outlined" onClick={handleClickDelete}>
                    삭제
                  </Button>
                )}
                {canEdit && (
                  <Button
                    disabled={hasError}
                    endIcon={loading ? <CommonLoading /> : <></>}
                    type="submit"
                    variant="contained"
                    onClick={handleClickEdit}
                  >
                    저장
                  </Button>
                )}
              </Stack>
            )}
          </form>
          {selectedOption && (
            <RemoveSubsidiaryModal
              open={optionType === 'delete'}
              onClose={() => {
                setOptionType(null);
                setSelectedOption(null);
              }}
              selectedOption={selectedOption}
            />
          )}
        </TablePage>
      )}
    </>
  );
};

export default BackDataPage;
