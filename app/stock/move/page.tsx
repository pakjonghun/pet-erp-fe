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
import AddMoveModal from '../_components/AddMoveModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import MoveTableBody from './_components/MoveTableBody';
import { LIMIT } from '@/constants';
import MoveCards from './_components/MoveCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { OrderHeaderList } from './constants';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Move } from '@/http/graphql/codegen/graphql';

const moves: Move[] = [
  {
    _id: '123',
    fromStorage: {
      _id: '1',
      name: 'Central Storage',
    },
    toStorage: {
      _id: '4',
      name: 'Central Storage',
    },
    toFactory: {
      _id: '1',
      name: 'Central Storage',
    },
    fromFactory: {
      _id: '3',
      name: 'Central Storage',
    },
    endDate: new Date(),
    startDate: new Date(),
    products: [
      {
        count: 500,
        product: {
          _id: '201',
          name: 'LED Display',
          code: 'Components',
        },
      },
      {
        count: 300,
        product: {
          _id: '202',
          name: 'Microchip',
          code: 'Components',
        },
      },
    ],
  },
];

const OrderPage = () => {
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);

  const { data, networkStatus, fetchMore } = useClients({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
  });

  const rows = moves ?? [];
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

  const [openAddMove, setOpenAddModal] = useState(false);
  return (
    <TablePage sx={{ flex: 1 }}>
      {openAddMove && (
        <AddMoveModal
          productName=""
          storageStock={null}
          open={openAddMove}
          onClose={() => setOpenAddModal(false)}
        />
      )}
      <Stack
        sx={{ px: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TableTitle title="이동" />
        <Stack direction="row" alignItems="center" gap={2}>
          <ActionButton
            icon={<PlusOneOutlined />}
            text="이동 등록"
            onClick={() => setOpenAddModal(true)}
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
      <MoveCards
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
              {OrderHeaderList.map((item, index) => (
                <HeadCell key={`${item}_${index}`} text={item} />
              ))}
            </TableRow>
          </TableHead>
          <MoveTableBody
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

export default OrderPage;
