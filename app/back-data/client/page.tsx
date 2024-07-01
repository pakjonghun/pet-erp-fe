'use client';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  Button,
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
import CreateClientModal from './_components/AddPClientModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import ClientTableBody from './_components/ClientTableBody';
import { useUploadExcelFile } from '@/http/rest/hooks/file/useUploadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import UploadButton from '@/components/ui/button/UploadButtont';
import { EMPTY, LIMIT } from '@/constants';
import ClientCards from './_components/ClientCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { useDownloadExcelFile } from '@/http/rest/hooks/file/useDownloadExcelFile';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { ClientHeaderList, ClientTypeToHangle } from './constants';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Client, Storage, UserRole } from '@/http/graphql/codegen/graphql';
import { client } from '@/http/graphql/client';
import { CommonHeaderRow, CommonTable } from '@/components/commonStyles';
import RemoveClientModal from './_components/RemoveClientModal';
import EditPClientModal from './_components/EditPClientModal';
import { SelectOption } from '../types';
import Cell from '@/components/table/Cell';
import { getFixedTwo } from '@/utils/sale';
import EmptyRow from '@/components/table/EmptyRow';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';

const BackDataPage = () => {
  const { data: userData } = useGetMyInfo();
  const myRole = userData?.myInfo.role ?? [];
  const canDelete = myRole.includes(UserRole.BackDelete);
  const canEdit = myRole.includes(UserRole.BackEdit);

  const { mutate: uploadProduct, isPending } = useUploadExcelFile();
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);
  const [fileKey, setFileKey] = useState(new Date());

  const { data, networkStatus, fetchMore, refetch } = useClients({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
  });

  const rows = (data?.clients.data as Client[]) ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.clients.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            clientsInput: {
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
  const isEmpty = !isLoading && rows.length === 0;

  const handleUploadExcelFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);
    uploadProduct(
      { service: 'client', formBody },
      {
        onSuccess: () => {
          snackMessage({
            message: '거래처 업로드가 완료되었습니다.',
            severity: 'success',
          });
          client.refetchQueries({
            updateCache(cache) {
              cache.evict({ fieldName: 'dashboardClients' });
            },
          });
          refetch();
        },
        onError: (error) => {
          const message = error.response?.data.message;
          snackMessage({
            message: message ?? '거래처 업로드가 실패하였습니다.',
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
    download('client', {
      onSuccess: () => {
        snackMessage({
          message: '거래처 다운로드가 완료되었습니다.',
          severity: 'success',
        });
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '거래처 다운로드가 실패하였습니다.',
          severity: 'error',
        });
      },
    });
  };

  const [selectedClient, setSelectedClient] = useState<null | Client>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);
  const [openCreateClient, setOpenCreateClient] = useState(false);

  const handleClickEdit = () => {
    setOptionType('edit');
  };

  const handleClickDelete = () => {
    setOptionType('delete');
  };

  const { data: storages } = useStorages({
    keyword: '',
    limit: 1000,
    skip: 0,
  });

  const targetStorage = ((storages?.storages.data as Storage[]) ?? []).find(
    (item) => item._id === selectedClient?.storageId
  );

  const createRow = (client: Client) => {
    return [
      client.name,
      client.businessName ?? EMPTY,
      client.code,
      client.feeRate == null ? EMPTY : getFixedTwo(client.feeRate * 100) + '%',
      ClientTypeToHangle[client.clientType],
      client.payDate ?? EMPTY,
      client.manager ?? EMPTY,
      client.managerTel ?? EMPTY,
      client.inActive ? '거래중' : '거래종료',
      targetStorage?.name ?? EMPTY,
    ];
  };

  const parsedClient = selectedClient ? createRow(selectedClient) : [];

  return (
    <>
      <TablePage sx={{ flex: 1 }}>
        {openCreateClient && (
          <CreateClientModal open={openCreateClient} onClose={() => setOpenCreateClient(false)} />
        )}
        <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
          <TableTitle title="거래처 백데이터" />
          <Stack direction="row" alignItems="center" gap={2}>
            <UploadButton
              fileKey={fileKey}
              loading={isPending}
              onChange={handleUploadExcelFile}
              text="거래처 업로드"
            />
            <ActionButton
              icon={isDownloading ? <CommonLoading /> : <FileDownloadIcon />}
              text="거래처 다운로드"
              onClick={handleDownload}
            />

            <ActionButton
              icon={<PlusOneOutlined />}
              text="거래처 입력"
              onClick={() => setOpenCreateClient(true)}
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
              sx={{ width: 270, my: 2 }}
              label="검색할 거래처 이름을 입력하세요."
              size="small"
            />
          </FormControl>
        </FormGroup>
        <Typography sx={{ p: 3 }}>
          {isEmpty ? '검색 결과가 없습니다' : `총 ${rows.length}건 검색`}
        </Typography>
        <ClientCards
          sx={{
            display: {
              xs: 'block',
              md: 'none',
            },
          }}
          data={rows}
          isEmpty={isEmpty}
          isLoading={isLoading}
          scrollRef={cardScrollRef}
        />
        <ScrollTableContainer
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            height: '30vh',
            px: 2,
          }}
        >
          <CommonTable stickyHeader>
            <TableHead>
              <CommonHeaderRow>
                {ClientHeaderList.map((item, index) => (
                  <HeadCell key={`${item}_${index}`} text={item} />
                ))}
              </CommonHeaderRow>
            </TableHead>
            <ClientTableBody
              setSelectedClient={setSelectedClient}
              selectedClient={selectedClient}
              data={rows}
              isEmpty={isEmpty}
              isLoading={isLoading}
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
        }}
      >
        <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
          <TableTitle title="선택된 거래처 데이터" />
        </Stack>
        <TableContainer
          sx={{
            px: 2,
          }}
        >
          <CommonTable stickyHeader>
            <TableHead>
              <CommonHeaderRow>
                {ClientHeaderList.map((item, index) => (
                  <HeadCell key={`${item}_${index}`} text={item} />
                ))}
              </CommonHeaderRow>
            </TableHead>
            {selectedClient ? (
              <TableRow hover ref={null}>
                {parsedClient.map((item, index) => (
                  <Cell key={`${Math.random()}_${index}`} sx={{ minWidth: 200 }}>
                    {item}
                  </Cell>
                ))}
              </TableRow>
            ) : (
              <EmptyRow
                colSpan={ClientHeaderList.length}
                isEmpty={!selectedClient}
                message="선택된 데이터가 없습니다."
              />
            )}
          </CommonTable>
        </TableContainer>
        {!!selectedClient && (
          <Stack direction="row" gap={1} sx={{ mt: 2, pr: 2 }} justifyContent="flex-end">
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
      </TablePage>
      {selectedClient && (
        <RemoveClientModal
          open={optionType === 'delete'}
          onClose={() => {
            setOptionType(null);
            setSelectedClient(null);
          }}
          selectedClient={selectedClient}
        />
      )}

      {selectedClient && (
        <EditPClientModal
          open={optionType === 'edit'}
          onClose={() => setOptionType(null)}
          setSelectedClient={setSelectedClient}
          selectedClient={selectedClient}
        />
      )}
    </>
  );
};

export default BackDataPage;
