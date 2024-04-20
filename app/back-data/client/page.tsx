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
} from '@mui/material';
import { PlusOneOutlined, Search } from '@mui/icons-material';
import { ChangeEvent, useRef, useState } from 'react';
import CreateClientModal from './_components/AddPClientModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import ClientTableBody from './_components/ClientTableBody';
import { useUploadExcelFile } from '@/api/rest/hooks/file/useUploadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import UploadButton from '@/components/ui/button/UploadButtont';
import { useProducts } from '@/api/graphql/hooks/product/useProducts';
import { LIMIT } from '@/constants';
import ClientCards from './_components/ClientCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { useDownloadExcelFile } from '@/api/rest/hooks/file/useDownloadExcelFile';
import CommonLoading from '@/components/ui/loading/CommonLoading';

const BackDataPage = () => {
  const { mutate: uploadProduct, isPending } = useUploadExcelFile();
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);
  const uploadRef = useRef<null | HTMLInputElement>(null);

  const { refetch } = useProducts({
    keyword,
    skip: 0,
    limit: LIMIT,
  });

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
          if (uploadRef.current) uploadRef.current.value = '';
          refetch();
        },
        onError: (error) => {
          const message = error.response?.data.message;
          snackMessage({
            message: message ?? '거래처 업로드가 실패하였습니다.',
            severity: 'error',
          });
          if (uploadRef.current) uploadRef.current.value = '';
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
            inputRef={uploadRef}
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
      <ClientCards
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
        keyword={delayKeyword}
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
              <HeadCell text="쇼핑몰명" />
              <HeadCell text="상호" />
              <HeadCell text="코드" />
              <HeadCell text="수수료율" />
              <HeadCell text="분류" />
              <HeadCell text="결제일" />
              <HeadCell text="담당자" />
              <HeadCell text="연락처" />
              <HeadCell text="거래여부" />
            </TableRow>
          </TableHead>
          <ClientTableBody keyword={delayKeyword} />
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default BackDataPage;
