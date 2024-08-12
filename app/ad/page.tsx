'use client';

import CreateOptionModal from './_components/AddAdsModal';
import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  Button,
  Chip,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import { AdTypeToHangle, headerList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import OptionCards from './_components/OptionCards';
import SubsidiaryTableBody from './_components/SubsidiaryTableBody';
import { CommonHeaderRow, CommonTable } from '@/components/commonStyles';
import { SelectOption } from './types';
import { AdsInput, AdsOutPutItem, AdType, UserRole } from '@/http/graphql/codegen/graphql';
import RemoveSubsidiaryModal from './_components/RemoveSubsidiaryModal';
import EditSubsidiaryModal from './_components/EditOptionModal';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';
import dayjs from 'dayjs';
import ActionSection from './ActionSection';
import SearchSection from './SearchSection';
import useHandleQuery from '@/hooks/useHandleQuery';
import { useAds } from '@/http/graphql/hooks/ad/useAds';
import { getNumberToString } from '@/utils/sale';

const BackDataPage = () => {
  const [from, setFrom] = useState(() => dayjs());
  const [to, setTo] = useState(() => dayjs());
  const [type, setType] = useState<null | AdType>(null);
  const [sort, setSort] = useState('updatedAt');
  const [order, setOrder] = useState(-1);
  const [keyword, setKeyword] = useState('');
  const [isDateChecked, setIsDateChecked] = useState(false);
  const delayKeyword = useTextDebounce(keyword);
  const q = useHandleQuery();

  const searchQuery: AdsInput = {
    from,
    keyword,
    limit: LIMIT,
    skip: 0,
    to,
    type,
  };

  const setSearchQuery = ({ from, keyword, to, type }: AdsInput) => {
    setFrom(from);
    setTo(to);
    setKeyword(keyword);
    setType(type ?? null);
  };

  const { data: userData } = useGetMyInfo();
  const myRole = userData?.myInfo.role ?? [];
  const canDelete = myRole.includes(UserRole.BackDelete);
  const canEdit = myRole.includes(UserRole.BackEdit);

  const { data, networkStatus, fetchMore } = useAds({
    ...searchQuery,
    keyword: delayKeyword,
    from: isDateChecked ? from : undefined,
    to: isDateChecked ? to : undefined,
    skip: 0,
  });
  const rows = (data?.ads.data as AdsOutPutItem[]) ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1 || networkStatus == 2;
  const isEmpty = !isLoading && rows.length === 0;
  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.ads.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            adsInput: {
              ...searchQuery,
              keyword: delayKeyword,
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

  const [selectedOption, setSelectedOption] = useState<null | AdsOutPutItem>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);
  const handleClickEdit = () => {
    setOptionType('edit');
  };

  const handleClickDelete = () => {
    setOptionType('delete');
  };

  const createRow = (ad: AdsOutPutItem) => {
    return [
      dayjs(ad.from).format('YYYY-MM-DD'),
      dayjs(ad.to).format('YYYY-MM-DD'),
      AdTypeToHangle[ad.type],
      getNumberToString(ad.price, 'comma'),
      ad.clientCode?.name ?? '',
      <Stack key={ad._id} direction="row" flexWrap="wrap" gap={1}>
        {(ad.productCodeList ?? []).map((p) => {
          return <Chip key={`${p.name}_${p.code}`} label={`${p.name}(${p.code})`} />;
        })}
      </Stack>,
    ];
  };

  const parsedRowData = selectedOption ? createRow(selectedOption) : [];

  return (
    <>
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
          {isEmpty ? '검색 결과가 없습니다' : `총 ${rows.length}건 검색`}
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
                  {headerList.map((item, index) => (
                    <HeadCell key={`${index}_${item}`} text={item} />
                  ))}
                </CommonHeaderRow>
              </TableHead>
              {!!selectedOption ? (
                <TableRow hover ref={null}>
                  {parsedRowData.map((item, index) => (
                    <Cell key={`${selectedOption._id}_${index}`} sx={{ minWidth: 200 }}>
                      {item}
                    </Cell>
                  ))}
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
                <Button variant="contained" onClick={handleClickEdit}>
                  편집
                </Button>
              )}
            </Stack>
          )}

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

          {selectedOption && (
            <EditSubsidiaryModal
              setSelectedSubsidiary={setSelectedOption}
              open={optionType === 'edit'}
              onClose={() => setOptionType(null)}
              selectedSubsidiary={selectedOption}
            />
          )}
        </TablePage>
      )}
    </>
  );
};

export default BackDataPage;
