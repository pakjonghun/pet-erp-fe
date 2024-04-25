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
import CreateProductModal from './_components/AddProductModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import ProductionTableBody from './_components/ProductionTableBody';
import { useUploadExcelFile } from '@/http/rest/hooks/file/useUploadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import UploadButton from '@/components/ui/button/UploadButtont';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { LIMIT } from '@/constants';
import ProductionCards from './_components/ProductionCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { useDownloadExcelFile } from '@/http/rest/hooks/file/useDownloadExcelFile';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { ProductHeaderList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Product } from '@/http/graphql/codegen/graphql';

const ProductPage = () => {
  const { mutate: uploadProduct, isPending } = useUploadExcelFile();
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);
  const [fileKey, setFileKey] = useState(new Date());

  const { data, networkStatus, fetchMore, refetch } = useProducts({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
  });
  const rows = (data?.products.data as Product[]) ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1;
  const isEmpty = !isLoading && rows.length === 0;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.products.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            productsInput: {
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

  const handleUploadExcelFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);
    uploadProduct(
      { service: 'product', formBody },
      {
        onSuccess: () => {
          snackMessage({ message: '제품 업로드가 완료되었습니다.', severity: 'success' });
          refetch();
        },
        onError: (error) => {
          const message = error.response?.data.message;
          snackMessage({ message: message ?? '제품 업로드가 실패하였습니다.', severity: 'error' });
        },
        onSettled: () => {
          setFileKey(new Date());
        },
      }
    );
  };

  const { mutate: download, isPending: isDownloading } = useDownloadExcelFile();

  const handleDownload = () => {
    download('product', {
      onSuccess: () => {
        snackMessage({ message: '제품 다운로드가 완료되었습니다.', severity: 'success' });
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '제품 다운로드가 실패하였습니다.', severity: 'error' });
      },
    });
  };

  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  return (
    <TablePage sx={{ flex: 1 }}>
      {openCreateProduct && (
        <CreateProductModal open={openCreateProduct} onClose={() => setOpenCreateProduct(false)} />
      )}
      <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
        <TableTitle title="제품 백데이터" />
        <Stack direction="row" alignItems="center" gap={2}>
          <UploadButton
            fileKey={fileKey}
            loading={isPending}
            onChange={handleUploadExcelFile}
            text="제품 업로드"
          />
          <ActionButton
            icon={isDownloading ? <CommonLoading /> : <FileDownloadIcon />}
            text="제품 다운로드"
            onClick={handleDownload}
          />

          <ActionButton
            icon={<PlusOneOutlined />}
            text="제품 입력"
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
            sx={{ width: 270, my: 2 }}
            label="검색할 제품 이름을 입력하세요."
            size="small"
          />
        </FormControl>
      </FormGroup>
      <Typography sx={{ p: 3 }}>
        {isEmpty ? '검색 결과가 없습니다' : `총 ${rows.length}건 검색`}
      </Typography>
      <ProductionCards
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
        isLoading={isLoading}
        data={rows}
        isEmpty={isEmpty}
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
              {ProductHeaderList.map((item, index) => (
                <HeadCell key={`${index}_${item}`} text={item} />
              ))}
            </TableRow>
          </TableHead>
          <ProductionTableBody
            isLoading={isLoading}
            data={rows}
            isEmpty={isEmpty}
            scrollRef={scrollRef}
          />
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default ProductPage;
