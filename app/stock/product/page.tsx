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
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import AddProductStockModal from './_components/AddProductStockModal';
import OutProductStockModal from './_components/OutProductStockModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import ProductStockTableBody from './_components/ProductStockTableBody';
import { LIMIT } from '@/constants';
import ProductStockCards from './_components/ProductStockCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { ProductStockHeaderList } from './constants';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { TotalProductStockOutput } from '@/http/graphql/codegen/graphql';
import InventoryIcon from '@mui/icons-material/Inventory';

const totalProductStockOutputs: TotalProductStockOutput[] = [
  {
    _id: '123',
    product: {
      _id: 'prod1',
      code: '123',
      name: 'LED TV',
    },
    storage: {
      _id: 'storage1',
      name: 'Main Warehouse',
    },
    storageCount: 150,
    orderCount: 25,
    recentSaleCount: 30,
  },
  {
    _id: '1234',
    product: {
      code: '1234',
      _id: 'prod2',
      name: 'Smartphone',
    },
    storage: null, // 예를 들어 이 제품은 현재 재고 위치가 없을 수 있습니다.
    storageCount: null,
    orderCount: 50,
    recentSaleCount: 45,
  },
];

const ProductStockPage = () => {
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);
  const [productStock, setProductStock] =
    useState<null | TotalProductStockOutput>(null);

  const { data, networkStatus, fetchMore, refetch } = useClients({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
  });

  const rows = totalProductStockOutputs ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.clients.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        // fetchMore({
        //   variables: {
        //     clientsInput: {
        //       keyword,
        //       skip: rows.length,
        //       limit: LIMIT,
        //     },
        //   },
        // });
      }
    }
  };
  const scrollRef = useInfinityScroll({ callback });
  const isEmpty = !isLoading && rows.length === 0;

  const [openAddStock, setOpenAddStock] = useState(false);
  const [openOutStock, setOpenOutStock] = useState(false);
  return (
    <TablePage sx={{ flex: 1 }}>
      {openAddStock && (
        <AddProductStockModal
          productStock={productStock}
          open={openAddStock}
          onClose={() => {
            setOpenAddStock(false);
            setProductStock(null);
          }}
        />
      )}
      {openOutStock && (
        <OutProductStockModal
          productStock={productStock}
          open={openOutStock}
          onClose={() => {
            setOpenOutStock(false);
            setProductStock(null);
          }}
        />
      )}
      <Stack
        sx={{ px: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TableTitle title="제품별 재고관리" />
        <Stack direction="row" alignItems="center" gap={2}>
          <ActionButton
            icon={<InventoryIcon />}
            text="입고"
            onClick={() => setOpenAddStock(true)}
          />
          <ActionButton
            icon={<InventoryIcon />}
            text="출고"
            onClick={() => setOpenOutStock(true)}
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
            sx={{ width: 300, my: 2 }}
            label="검색할 제품 이름을 입력하세요."
            size="small"
          />
        </FormControl>
      </FormGroup>
      <Typography sx={{ p: 3 }}>
        {isEmpty ? '검색 결과가 없습니다' : `총 ${rows.length}건 검색`}
      </Typography>
      <ProductStockCards
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
              {ProductStockHeaderList.map((item, index) => (
                <HeadCell key={`${item}_${index}`} text={item} />
              ))}
            </TableRow>
          </TableHead>
          <ProductStockTableBody
            productStock={productStock}
            setProductStock={setProductStock}
            openAddStock={() => setOpenAddStock(true)}
            openOutStock={() => setOpenOutStock(true)}
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

export default ProductStockPage;
