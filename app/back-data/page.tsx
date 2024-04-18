'use client';

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
  Table,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { PlusOneOutlined, Search } from '@mui/icons-material';
import { ChangeEvent, useRef, useState } from 'react';
import CreateProductModal from './_components/AddProductModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import ProductionTableBody from './_components/ProductionTableBody';
import { useUploadExcelFile } from '@/api/rest/hooks/upload/useUploadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import UploadButton from '@/components/ui/button/UploadButtont';
import { useProducts } from '@/api/graphql/hooks/product/useProducts';
import { LIMIT } from '@/constants';

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
      { service: 'product', formBody },
      {
        onSuccess: () => {
          snackMessage({ message: '제품 업로드가 완료되었습니다.', severity: 'success' });
          if (uploadRef.current) uploadRef.current.value = '';
          refetch();
        },
        onError: (error) => {
          const message = error.response?.data.message;
          snackMessage({ message: message ?? '제품 업로드가 실패하였습니다.', severity: 'error' });
          if (uploadRef.current) uploadRef.current.value = '';
        },
      }
    );
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
            inputRef={uploadRef}
            loading={isPending}
            onChange={handleUploadExcelFile}
            text="제품 업로드"
          />
          <Button
            onClick={() => setOpenCreateProduct((prev) => !prev)}
            variant="contained"
            startIcon={<PlusOneOutlined />}
          >
            제품 입력
          </Button>
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
      <ScrollTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <HeadCell text="코드" />
              <HeadCell text="분류" />
              <HeadCell text="바코드" />
              <HeadCell text="이름" />
              <HeadCell text="원가" />
              <HeadCell text="판매가" />
              <HeadCell text="리드타임" />
              <HeadCell text="" />
            </TableRow>
          </TableHead>
          <ProductionTableBody keyword={delayKeyword} />
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default BackDataPage;
