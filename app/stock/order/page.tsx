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
import AddOrderModal from '../_components/AddOrderModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import OrderTableBody from './_components/OrderTableBody';
import { LIMIT } from '@/constants';
import ClientCards from './_components/OrderCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { OrderHeaderList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { ProductOrder } from '@/http/graphql/codegen/graphql';
import { useProductOrders } from '@/http/graphql/hooks/productOrder/useProductOrders';

const OrderPage = () => {
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);

  const { data, networkStatus, fetchMore } = useProductOrders({
    keyword: delayKeyword,
    skip: 0,
    limit: 10,
  });

  const rows = data?.orders.data ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1 || networkStatus == 2;
  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalPage = data?.orders.totalCount;
      if (!totalPage) return;

      if (totalPage <= rows.length) return;

      fetchMore({
        variables: {
          ordersInput: {
            keyword,
            skip: rows.length,
            limit: LIMIT,
          },
        },
      });
    }
  };
  const scrollRef = useInfinityScroll({ callback });
  const isEmpty = !isLoading && rows.length === 0;

  const [openCreateClient, setOpenCreateClient] = useState(false);
  return (
    <TablePage sx={{ flex: 1 }}>
      {openCreateClient && (
        <AddOrderModal open={openCreateClient} onClose={() => setOpenCreateClient(false)} />
      )}
      <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
        <TableTitle title="발주" />
        <Stack direction="row" alignItems="center" gap={2}>
          <ActionButton
            icon={<PlusOneOutlined />}
            text="발주 등록"
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
            label="검색할 공장 이름을 입력하세요."
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
        data={rows as ProductOrder[]}
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
              {OrderHeaderList.map((item, index) => (
                <HeadCell key={`${item}_${index}`} text={item} />
              ))}
            </TableRow>
          </TableHead>
          <OrderTableBody
            data={rows as ProductOrder[]}
            isEmpty={isEmpty}
            isLoading={isLoading}
            scrollRef={scrollRef}
          />
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default OrderPage;
