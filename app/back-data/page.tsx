'use client';

import PublishIcon from '@mui/icons-material/Publish';
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
import { useState } from 'react';
import CreateProductModal from './_components/AddProductModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import ProductionTableBody from './_components/ProductionTableBody';

const BackData = () => {
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);

  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  return (
    <TablePage sx={{ flex: 1 }}>
      <CreateProductModal open={openCreateProduct} onClose={() => setOpenCreateProduct(false)} />
      <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
        <TableTitle title="제품 백데이터" />
        <Stack direction="row" alignItems="center" gap={2}>
          <Button variant="contained" startIcon={<PublishIcon />}>
            제품 업로드
          </Button>
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

export default BackData;
