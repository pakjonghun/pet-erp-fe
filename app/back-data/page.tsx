'use client';

import PublishIcon from '@mui/icons-material/Publish';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import { LIMIT } from '@/constants';
import {
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { PlusOneOutlined, Search } from '@mui/icons-material';
import { useState } from 'react';
import CreateProductModal from './_components/AddProductModal';
import { useProducts } from '@/api/graphql/hooks/product/useProducts';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Product } from '@/api/graphql/codegen/graphql';
import { getKCWFormat } from '@/util';
import useTextDebounce from '@/hooks/useTextDebounce';

const BackData = () => {
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);
  console.log(delayKeyword);
  const { data, networkStatus, fetchMore } = useProducts({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
  });
  const rows = data?.products.data ?? [];

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (networkStatus != 3 && networkStatus != 1) {
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
    }
  };

  const scrollRef = useInfinityScroll({ callback });

  const isEmpty = rows.length === 0;
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
            </TableRow>
          </TableHead>
          <TableBody>
            <EmptyRow colSpan={6} isEmpty={isEmpty} />
            {rows.map((item, index) => {
              const row = item as unknown as Product;
              const isLast = index === rows.length - 1;
              return (
                <TableRow hover ref={isLast ? scrollRef : null} key={index}>
                  <Cell sx={{ minWidth: 200 }}>{row.code}</Cell>
                  <Cell sx={{ minWidth: 200 }}>{row.barCode ?? ''}</Cell>
                  <Cell sx={{ minWidth: 200 }}>{row.name}</Cell>
                  <Cell sx={{ minWidth: 200 }}>{getKCWFormat(row.wonPrice)}</Cell>
                  <Cell sx={{ minWidth: 200 }}>{getKCWFormat(row.salePrice)}</Cell>
                  <Cell sx={{ minWidth: 200 }}>{row.leadTime ?? ''}</Cell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default BackData;
