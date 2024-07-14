'use client';

import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  Button,
  Chip,
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
import { useState } from 'react';
import AddOrderModal from '../_components/AddOrderModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import OrderTableBody from './_components/OrderTableBody';
import { EMPTY, LIMIT } from '@/constants';
import ClientCards from './_components/OrderCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { OrderHeaderList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { ProductOrder, UserRole } from '@/http/graphql/codegen/graphql';
import { useProductOrders } from '@/http/graphql/hooks/productOrder/useProductOrders';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';
import { CommonHeaderRow, CommonTable } from '@/components/commonStyles';
import EditOrderModal from '../_components/EditOrderModal';
import RemoveOrderModal from '../_components/RemoveOrderModal';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import dayjs from 'dayjs';
import CompleteModal from '../_components/CompleteModal';

const OrderPage = () => {
  const { role } = useReactiveVar(authState);
  const canCreate = role?.includes(UserRole.OrderCreate);
  const canEdit = role?.includes(UserRole.OrderEdit);
  const canDelete = role?.includes(UserRole.OrderDelete);

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
      if (totalPage == null) return;

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
  const tableScrollRef = useInfinityScroll({ callback });
  const cardScrollRef = useInfinityScroll({ callback });
  const isEmpty = !isLoading && rows.length === 0;

  const [openCreateClient, setOpenCreateClient] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | ProductOrder>(null);
  const [optionType, setOptionType] = useState<null | any>(null);

  const createRow = (order: ProductOrder) => {
    const allHasNoLeadTime = order.products.every((item) => item.product.leadTime == null);

    const biggestLeadTime = allHasNoLeadTime
      ? -1
      : order.products.reduce(
          (acc, cur) => ((cur.product.leadTime ?? 0) > acc ? cur.product.leadTime ?? 0 : acc),
          -Infinity
        );

    const leadTime = biggestLeadTime < 0 ? null : biggestLeadTime;

    return [
      order?.orderDate ? dayjs(order?.orderDate).format('YYYY-MM-DD') : EMPTY,
      order?.factory?.name ?? '',
      order.payCost,
      order.notPayCost,
      order.totalPayCost,
      order.isDone ? '지불 완료' : '미지불',
      order?.orderDate
        ? leadTime == null
          ? '제품 리드타임 미입력'
          : dayjs(order?.orderDate)
              .add(leadTime * 24, 'hour')
              .format('YYYY-MM-DD')
        : EMPTY,
      order.products.reduce((acc, cur) => acc + cur.count, 0),
      <Stack key={Math.random()} direction="column" gap={1}>
        {order.products.map((item, index) => {
          return (
            <Chip
              key={`${item.__typename}_${index}`}
              label={`${item.product.name}(${item.count}EA)`}
            />
          );
        })}
      </Stack>,
    ];
  };

  const parsedOrder = selectedOrder ? createRow(selectedOrder) : [];

  return (
    <>
      {selectedOrder && (
        <EditOrderModal
          setSelectedOrder={setSelectedOrder}
          open={optionType === 'edit'}
          onClose={() => setOptionType(null)}
          selectedOrder={selectedOrder}
        />
      )}

      {selectedOrder && (
        <RemoveOrderModal
          open={optionType === 'delete'}
          onClose={() => setOptionType(null)}
          selectedOrder={selectedOrder}
        />
      )}

      {selectedOrder && (
        <EditOrderModal
          setSelectedOrder={setSelectedOrder}
          open={optionType === 'edit'}
          onClose={() => setOptionType(null)}
          selectedOrder={selectedOrder}
        />
      )}

      {selectedOrder && (
        <CompleteModal
          open={optionType === 'complete'}
          onClose={() => {
            setOptionType(null);
            setSelectedOrder(null);
          }}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      )}

      <TablePage sx={{ flex: 1 }}>
        {openCreateClient && (
          <AddOrderModal open={openCreateClient} onClose={() => setOpenCreateClient(false)} />
        )}
        <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
          <TableTitle title="발주" />
          {canCreate && (
            <Stack direction="row" alignItems="center" gap={2}>
              <ActionButton
                icon={<PlusOneOutlined />}
                text="발주 등록"
                onClick={() => setOpenCreateClient(true)}
              />
            </Stack>
          )}
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
          scrollRef={cardScrollRef}
        />
        <ScrollTableContainer
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            height: '30vh',
          }}
        >
          <CommonTable stickyHeader>
            <TableHead>
              <CommonHeaderRow>
                {OrderHeaderList.map((item, index) => (
                  <HeadCell key={`${item}_${index}`} text={item} />
                ))}
              </CommonHeaderRow>
            </TableHead>
            <OrderTableBody
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              data={rows as ProductOrder[]}
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
          px: 2,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <TableTitle title="선택된 발주 데이터" />
        </Stack>
        <TableContainer
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          <CommonTable stickyHeader>
            <TableHead>
              <CommonHeaderRow>
                {OrderHeaderList.map((item, index) => (
                  <HeadCell key={`${item}_${index}`} text={item} />
                ))}
              </CommonHeaderRow>
            </TableHead>
            {!!selectedOrder ? (
              <TableRow hover ref={null}>
                {parsedOrder.map((item, index) => (
                  <Cell key={`${selectedOrder._id}_${index}`} sx={{ minWidth: 200 }}>
                    {item}
                  </Cell>
                ))}
              </TableRow>
            ) : (
              <EmptyRow colSpan={9} isEmpty={!selectedOrder} message="선택된 데이터가 없습니다." />
            )}
          </CommonTable>
        </TableContainer>
        {!!selectedOrder && !selectedOrder.isDone && (
          <Stack direction="row" gap={1} sx={{ mt: 2 }} justifyContent="flex-end">
            {canDelete && (
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  setOptionType('delete');
                }}
              >
                삭제
              </Button>
            )}
            {canEdit && (
              <Button
                variant="contained"
                onClick={() => {
                  setOptionType('edit');
                }}
              >
                편집
              </Button>
            )}
            {canEdit && (
              <Button
                variant="contained"
                onClick={() => {
                  setOptionType('complete');
                }}
              >
                발주완료
              </Button>
            )}
          </Stack>
        )}
      </TablePage>
    </>
  );
};

export default OrderPage;
