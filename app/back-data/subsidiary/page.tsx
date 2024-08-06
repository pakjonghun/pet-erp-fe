'use client';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
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
import { ChangeEvent, useState } from 'react';
import CreateSubsidiaryModal from './_components/AddSubsidiarytModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import { useUploadExcelFile } from '@/http/rest/hooks/file/useUploadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import UploadButton from '@/components/ui/button/UploadButtont';
import { EMPTY, LIMIT } from '@/constants';
import ActionButton from '@/components/ui/button/ActionButton';
import { useDownloadExcelFile } from '@/http/rest/hooks/file/useDownloadExcelFile';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { SubsidiaryHeaderList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useSubsidiaries } from '@/http/graphql/hooks/subsidiary/useSubsidiaries';
import SubsidiaryCards from './_components/SubsidiaryCards';
import SubsidiaryTableBody from './_components/SubsidiaryTableBody';
import { client } from '@/http/graphql/client';
import { CommonHeaderRow, CommonTable } from '@/components/commonStyles';
import { SelectOption } from '../types';
import { Order, Subsidiary, UserRole } from '@/http/graphql/codegen/graphql';
import RemoveSubsidiaryModal from './_components/RemoveSubsidiaryModal';
import EditSubsidiaryModal from './_components/EditSubsidiaryModal';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import { getKCWFormat } from '@/utils/common';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';
import ResizableContainer from '@/components/resize/ResizableContainer';

const BackDataPage = () => {
  const { data: userData } = useGetMyInfo();
  const myRole = userData?.myInfo.role ?? [];
  const canDelete = myRole.includes(UserRole.BackDelete);
  const canEdit = myRole.includes(UserRole.BackEdit);
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [sort, setSort] = useState('createdAt');

  const handleSort = (newSort: string) => {
    if (newSort == sort) {
      setOrder((prev) => (prev == Order.Desc ? Order.Asc : Order.Desc));
    } else {
      setOrder(Order.Asc);
      setSort(newSort);
    }
  };

  const { mutate: uploadProduct, isPending } = useUploadExcelFile();
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);
  const [fileKey, setFileKey] = useState(new Date());
  const { data, networkStatus, fetchMore, refetch } = useSubsidiaries({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
    sort,
    order,
  });
  const rows = data?.subsidiaries.data ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1 || networkStatus == 2;
  const isEmpty = !isLoading && rows.length === 0;
  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.subsidiaries.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            subsidiariesInput: {
              keyword,
              skip: rows.length,
              limit: LIMIT,
              sort,
              order,
            },
          },
        });
      }
    }
  };
  const tableScrollRef = useInfinityScroll({ callback });
  const cardScrollRef = useInfinityScroll({ callback });

  const handleUploadExcelFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);
    uploadProduct(
      { service: 'subsidiary', formBody },
      {
        onSuccess: () => {
          snackMessage({
            message: '부자재 업로드가 완료되었습니다.',
            severity: 'success',
          });
          client.refetchQueries({
            updateCache(cache) {
              cache.evict({ fieldName: 'subsidiaryStocks' });
              cache.evict({ fieldName: 'subsidiaryStocksState' });
              cache.evict({ fieldName: 'subsidiaryCountStocks' });
            },
          });

          refetch();
        },
        onError: (error) => {
          const message = error.response?.data.message;
          snackMessage({
            message: message ?? '부자재 업로드가 실패하였습니다.',
            severity: 'error',
          });
        },
        onSettled: () => {
          setFileKey(new Date());
        },
      }
    );
  };

  const { mutate: download, isPending: isDownloading } = useDownloadExcelFile();

  const handleDownload = () => {
    download('subsidiary', {
      onSuccess: () => {
        snackMessage({
          message: '부자재 다운로드가 완료되었습니다.',
          severity: 'success',
        });
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '부자재 다운로드가 실패하였습니다.',
          severity: 'error',
        });
      },
    });
  };

  const [openCreateProduct, setOpenCreateProduct] = useState(false);

  const [selectedSubsidiary, setSelectedSubsidiary] = useState<null | Subsidiary>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);
  const handleClickEdit = () => {
    setOptionType('edit');
  };

  const handleClickDelete = () => {
    setOptionType('delete');
  };

  const createRow = (subsidiary: Subsidiary) => {
    return [
      subsidiary.name,
      subsidiary.category?.name ?? EMPTY,
      subsidiary.code,
      subsidiary.wonPrice == null ? EMPTY : getKCWFormat(subsidiary.wonPrice),
      subsidiary.leadTime ? `${subsidiary.leadTime}일` : EMPTY,
      <Stack key={Math.random()} direction="row" gap={0.4}>
        {(subsidiary.productList ?? []).map((subsidiary) => {
          return <Chip key={subsidiary._id} label={subsidiary.name} />;
        })}
      </Stack>,
    ];
  };

  const parsedRowData = selectedSubsidiary ? createRow(selectedSubsidiary) : [];

  return (
    <>
      <ResizableContainer>
        <TablePage sx={{ flex: 1, height: '100%' }}>
          {openCreateProduct && (
            <CreateSubsidiaryModal
              open={openCreateProduct}
              onClose={() => setOpenCreateProduct(false)}
            />
          )}
          <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
            <TableTitle title="부자재 백데이터" />
            <Stack direction="row" alignItems="center" gap={2}>
              <UploadButton
                fileKey={fileKey}
                loading={isPending}
                onChange={handleUploadExcelFile}
                text="부자재 업로드"
              />
              <ActionButton
                icon={isDownloading ? <CommonLoading /> : <FileDownloadIcon />}
                text="부자재 다운로드"
                onClick={handleDownload}
              />

              <ActionButton
                icon={<PlusOneOutlined />}
                text="부자재 입력"
                onClick={() => setOpenCreateProduct(true)}
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
                sx={{
                  width: {
                    xs: '100%',
                    sm: 270,
                  },
                  pr: 3,
                  my: 2,
                }}
                label="이름이나 코드 입력"
                size="small"
              />
            </FormControl>
          </FormGroup>
          <Typography sx={{ p: 3 }}>
            {isEmpty ? '검색 결과가 없습니다' : `총 ${rows.length}건 검색`}
          </Typography>
          <SubsidiaryCards
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
              height: 'calc(100% - 216px)',
            }}
          >
            <CommonTable stickyHeader>
              <TableHead>
                <CommonHeaderRow>
                  {SubsidiaryHeaderList.map(({ label, id, sortable }, index) => (
                    <HeadCell
                      order={sort == id ? order : undefined}
                      sortable={sortable}
                      onSort={() => handleSort(id)}
                      key={`${index}_${label}`}
                      text={label}
                    />
                  ))}
                </CommonHeaderRow>
              </TableHead>
              <SubsidiaryTableBody
                selectedSubsidiary={selectedSubsidiary}
                setSelectedSubsidiary={setSelectedSubsidiary}
                isLoading={isLoading}
                data={rows}
                isEmpty={isEmpty}
                scrollRef={tableScrollRef}
              />
            </CommonTable>
          </ScrollTableContainer>
        </TablePage>
      </ResizableContainer>
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
        <TableTitle title="선택된 부자재 데이터" />
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
                {SubsidiaryHeaderList.map(({ label }, index) => (
                  <HeadCell key={`${index}_${label}`} text={label} />
                ))}
              </CommonHeaderRow>
            </TableHead>
            {!!selectedSubsidiary ? (
              <TableRow hover ref={null}>
                {parsedRowData.map((item, index) => (
                  <Cell key={`${selectedSubsidiary._id}_${index}`} sx={{ minWidth: 200 }}>
                    {item}
                  </Cell>
                ))}
              </TableRow>
            ) : (
              <EmptyRow
                colSpan={7}
                isEmpty={!selectedSubsidiary}
                message="선택된 데이터가 없습니다."
              />
            )}
          </CommonTable>
        </TableContainer>
        {!!selectedSubsidiary && (
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

        {selectedSubsidiary && (
          <RemoveSubsidiaryModal
            open={optionType === 'delete'}
            onClose={() => {
              setOptionType(null);
              setSelectedSubsidiary(null);
            }}
            selectedSubsidiary={selectedSubsidiary}
          />
        )}

        {selectedSubsidiary && (
          <EditSubsidiaryModal
            setSelectedSubsidiary={setSelectedSubsidiary}
            open={optionType === 'edit'}
            onClose={() => setOptionType(null)}
            selectedSubsidiary={selectedSubsidiary}
          />
        )}
      </TablePage>
    </>
  );
};

export default BackDataPage;
