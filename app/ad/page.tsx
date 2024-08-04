'use client';

import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  Button,
  Chip,
  FormControl,
  FormGroup,
  InputAdornment,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { PlusOneOutlined, Search } from '@mui/icons-material';
import { useState } from 'react';
import CreateOptionModal from './_components/AddOptionModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import { LIMIT } from '@/constants';
import ActionButton from '@/components/ui/button/ActionButton';
import { OptionHeaderList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import OptionCards from './_components/OptionCards';
import SubsidiaryTableBody from './_components/SubsidiaryTableBody';
import { CommonHeaderRow, CommonTable } from '@/components/commonStyles';
import { SelectOption } from './types';
import { OutputOption, UserRole } from '@/http/graphql/codegen/graphql';
import RemoveSubsidiaryModal from './_components/RemoveSubsidiaryModal';
import EditSubsidiaryModal from './_components/EditOptionModal';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';
import { useOptions } from '@/http/graphql/hooks/option/useOptions';

const BackDataPage = () => {
  const { data: userData } = useGetMyInfo();
  const myRole = userData?.myInfo.role ?? [];
  const canDelete = myRole.includes(UserRole.BackDelete);
  const canEdit = myRole.includes(UserRole.BackEdit);

  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);

  const { data, networkStatus, fetchMore } = useOptions({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
  });
  const rows = (data?.options.data as OutputOption[]) ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1 || networkStatus == 2;
  const isEmpty = !isLoading && rows.length === 0;
  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.options.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            optionsInput: {
              keyword,
              skip: rows.length,
              limit: LIMIT,
            },
          },
        });
      }
    }
  };
  const tableScrollRef = useInfinityScroll({ callback });
  const cardScrollRef = useInfinityScroll({ callback });

  const [openCreateOption, setOpenCreateOption] = useState(false);

  const [selectedOption, setSelectedOption] = useState<null | OutputOption>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);
  const handleClickEdit = () => {
    setOptionType('edit');
  };

  const handleClickDelete = () => {
    setOptionType('delete');
  };

  const createRow = (option: OutputOption) => {
    return [
      option.id,
      option.name,
      <Stack key={Math.random()} direction="row" flexWrap="wrap" gap={1}>
        {(option.productOptionList ?? []).map((option) => {
          return (
            <Chip
              key={`${option.productCode.name}_${option.productCode.code}`}
              label={`${option.productCode.name}(${option.count}EA)`}
            />
          );
        })}
      </Stack>,
    ];
  };

  const parsedRowData = selectedOption ? createRow(selectedOption) : [];

  return (
    <>
      <TablePage sx={{ flex: 1 }}>
        {openCreateOption && (
          <CreateOptionModal open={openCreateOption} onClose={() => setOpenCreateOption(false)} />
        )}
        <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
          <TableTitle title="광고 리스트" />
          <Stack direction="row" alignItems="center" gap={2}>
            <ActionButton
              icon={<PlusOneOutlined />}
              text="광고 입력"
              onClick={() => setOpenCreateOption(true)}
            />
          </Stack>
        </Stack>
        <FormGroup sx={{ ml: 2 }}>
          <FormControl>
            <TextField
              onChange={(event) => setKeyword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: 340, my: 2 }}
              label="검색할 제품이나 채널을 입력하세요."
              size="small"
            />
          </FormControl>
        </FormGroup>
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
                {OptionHeaderList.map((item, index) => (
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
                {OptionHeaderList.map((item, index) => (
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
              <EmptyRow colSpan={7} isEmpty={!selectedOption} message="선택된 데이터가 없습니다." />
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
    </>
  );
};

export default BackDataPage;
