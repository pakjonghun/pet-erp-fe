'use client';

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
import { useState } from 'react';
import AddWholeSaleModal from './_components/AddWholeSaleModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import WholeSaleTableBody from './_components/WholeSaleTableBody';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { LIMIT } from '@/constants';
import WholeSaleCards from './_components/WholeSaleCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { WholeSaleHeaderList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { WholeSaleOutput } from '@/http/graphql/codegen/graphql';

const rows: WholeSaleOutput[] = [
  {
    _id: '12334',
    count: 12,
    address1: '456 Elm St, Greendale',
    telephoneNumber1: '555-6789',
    saleAt: new Date('2023-01-20'),
    payCost: 49.99,
    mallId: 'MALL1002',
    wonCost: 20.0,
    deliveryCost: 3.5,
    productList: [
      {
        code: '123_123_!233',
        productName: 'Wirel3ess M2ouse',
        productCode: 'PRD441001',
        count: 1,
      },
      {
        code: '123_123_!4323',
        productName: 'Wi223reless M4ouse',
        productCode: 'PRD130302',
        count: 11,
      },
    ],
  },
  {
    _id: '1234',
    count: 2,
    address1: '456 Elm St, Greendale',
    telephoneNumber1: '555-6789',
    saleAt: new Date('2023-01-20'),
    payCost: 49.99,
    mallId: 'MALL1002',
    wonCost: 20.0,
    deliveryCost: 3.5,
    productList: [
      {
        code: '123_123_!23',
        productName: 'Wireless M2ouse',
        productCode: 'PRD41001',
        count: 1,
      },
      {
        code: '123_123_!423',
        productName: 'Wi22reless M4ouse',
        productCode: 'PRD10302',
        count: 1,
      },
    ],
  },
];

const ProductPage = () => {
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);

  const { data, networkStatus, fetchMore, refetch } = useProducts({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
  });
  // const rows = (data?.products.data as Product[]) ?? [];
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

  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  return (
    <TablePage sx={{ flex: 1 }}>
      {openCreateProduct && (
        <AddWholeSaleModal
          open={openCreateProduct}
          onClose={() => setOpenCreateProduct(false)}
        />
      )}
      <Stack
        sx={{ px: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TableTitle title="도매 판매" />
        <Stack direction="row" alignItems="center" gap={2}>
          <ActionButton
            icon={<PlusOneOutlined />}
            text="도매 판매 등록"
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
      <WholeSaleCards
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
              {WholeSaleHeaderList.map((item, index) => (
                <HeadCell key={`${index}_${item}`} text={item} />
              ))}
            </TableRow>
          </TableHead>
          <WholeSaleTableBody
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
