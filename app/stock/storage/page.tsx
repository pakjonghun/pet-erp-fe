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
import AddStorageStockModal from './_components/AddStorageStockModal';
import OutStorageStockModal from './_components/OutStorageStockModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import StorageStockTableBody from './_components/StorageStockTableBody';
import { LIMIT } from '@/constants';
import ActionButton from '@/components/ui/button/ActionButton';
import { StockStorageHeaderList } from './constants';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { StockStorageOutput } from '@/http/graphql/codegen/graphql';
import InventoryIcon from '@mui/icons-material/Inventory';

const stockStorages: StockStorageOutput[] = [
  {
    _id: 'abc',
    name: 'Central Warehouse',
    phoneNumber: '010-1234-5678',
    address: '1234 Central St, Busan',
    note: 'Main storage facility in Busan',
    totalStock: 1500,
    totalWonCost: 30000000,
  },
  {
    _id: 'abc21',
    name: 'East Side Storage',
    phoneNumber: '010-8765-4321',
    address: '4321 East Rd, Seoul',
    note: 'Secondary storage location in Seoul',
    totalStock: 800,
    totalWonCost: 12000000,
  },
];

const StorageStockPage = () => {
  const [productName, setProductName] = useState('');
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);
  const [storageStock, setStorageStock] = useState<null | StockStorageOutput>(
    null
  );

  const { data, networkStatus, fetchMore, refetch } = useClients({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
  });

  const rows = stockStorages ?? [];
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
        <AddStorageStockModal
          productName={productName}
          storageStock={storageStock}
          open={openAddStock}
          onClose={() => {
            setOpenAddStock(false);
            setStorageStock(null);
            setProductName('');
          }}
        />
      )}
      {openOutStock && (
        <OutStorageStockModal
          productName={productName}
          storageStock={storageStock}
          open={openOutStock}
          onClose={() => {
            setOpenOutStock(false);
            setStorageStock(null);
            setProductName('');
          }}
        />
      )}
      <Stack
        sx={{ px: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TableTitle title="위치별 재고관리" />
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
      <Typography sx={{ p: 3 }}>
        {isEmpty ? '검색 결과가 없습니다' : `총 ${rows.length}건 검색`}
      </Typography>

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
              {StockStorageHeaderList.map((item, index) => (
                <HeadCell key={`${item}_${index}`} text={item} />
              ))}
            </TableRow>
          </TableHead>
          <StorageStockTableBody
            productName={productName}
            setProductName={setProductName}
            storageStock={storageStock}
            setStorageStock={setStorageStock}
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

export default StorageStockPage;
