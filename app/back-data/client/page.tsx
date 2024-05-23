'use client';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  FormControl,
  FormGroup,
  InputAdornment,
  Stack,
  Table,
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
import { LIMIT } from '@/constants';
import ClientCards from './_components/ClientCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { useDownloadExcelFile } from '@/http/rest/hooks/file/useDownloadExcelFile';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { ClientHeaderList } from './constants';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Client } from '@/http/graphql/codegen/graphql';
import { client } from '@/http/graphql/client';

const BackDataPage = () => {
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
  const scrollRef = useInfinityScroll({ callback });
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
          snackMessage({ message: '거래처 업로드가 완료되었습니다.', severity: 'success' });
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
        snackMessage({ message: '거래처 다운로드가 완료되었습니다.', severity: 'success' });
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

  const [openCreateClient, setOpenCreateClient] = useState(false);
  return (
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
        scrollRef={scrollRef}
      />
      <ScrollTableContainer
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {ClientHeaderList.map((item, index) => (
                <HeadCell key={`${item}_${index}`} text={item} />
              ))}
            </TableRow>
          </TableHead>
          <ClientTableBody
            data={rows}
            isEmpty={isEmpty}
            isLoading={isLoading}
            scrollRef={scrollRef}
          />
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default BackDataPage;
