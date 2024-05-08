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
import { useState } from 'react';
import CreateClientModal from './_components/AddPClientModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import ClientTableBody from './_components/ClientTableBody';
import { LIMIT } from '@/constants';
import ClientCards from './_components/ClientCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { OrderHeaderList } from './constants';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Client, ProductOrder } from '@/http/graphql/codegen/graphql';

const productOrders = [
  {
    _id: '5f76fddc2fa9b89b77b8d1fe',
    factory: {
      _id: '5f76fddc2fa9b89b77b8d1fa',
      name: 'Global Tech Factory',
    },
    storage: {
      _id: '5f76fddc2fa9b89b77b8d1fb',
      name: 'Central Storage Facility',
    },
    products: [
      {
        count: 100,
        product: {
          _id: '5f76fddc2fa9b89b77b8d1fc',
          name: 'Laptop',
        },
      },
      {
        count: 50,
        product: {
          _id: '5f76fddc2fa9b89b77b8d1fd',
          name: 'Desktop Computer',
        },
      },
    ],
    count: 150,
    payCost: 30000,
    notPayCost: 5000,
    totalPayCost: 35000,
  },
  {
    _id: '5f76fddc2fa9b89b77b8d2fe',
    factory: {
      _id: '5f76fddc2fa9b89b77b8d2fa',
      name: 'HighTech Solutions Inc.',
    },
    storage: {
      _id: '5f76fddc2fa9b89b77b8d2fb',
      name: 'Secondary Storage Unit',
    },
    products: [
      {
        count: 200,
        product: {
          _id: '5f76fddc2fa9b89b77b8d2fc',
          name: 'Smartphone',
        },
      },
      {
        count: 150,
        product: {
          _id: '5f76fddc2fa9b89b77b8d2fd',
          name: 'Tablet',
        },
      },
    ],
    count: 350,
    payCost: 45000,
    notPayCost: 7500,
    totalPayCost: 52500,
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

  const rows = (data?.clients.data as ProductOrder[]) ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.clients.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            clientsInput: {
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
  const isEmpty = !isLoading && rows.length === 0;

  const [openCreateClient, setOpenCreateClient] = useState(false);
  return (
    <TablePage sx={{ flex: 1 }}>
      {openCreateClient && (
        <CreateClientModal
          open={openCreateClient}
          onClose={() => setOpenCreateClient(false)}
        />
      )}
      <Stack
        sx={{ px: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
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
            label="검색할 거래처 이름을 입력하세요."
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
          <ClientTableBody
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
