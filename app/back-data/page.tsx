'use client';

import PublishIcon from '@mui/icons-material/Publish';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import { TABLE_MAX_HEIGHT } from '@/constants';
import {
  Box,
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
import { PlusOne, PlusOneOutlined, Search } from '@mui/icons-material';
import ProductSaleModal from '../sale/@productSales/_components/ProductSaleModal';
import { useState } from 'react';

const BackData = () => {
  const [keyword, setKeyword] = useState('');

  const isEmpty = true;
  return (
    <TablePage sx={{ flex: 1 }}>
      {/* {!!selectedProductSale && (
        <ProductSaleModal
          selectedProductSale={selectedProductSale}
          open={selectedProductSale != null}
          onClose={() => setSelectedProductSale(null)}
        />
      )} */}
      <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
        <TableTitle title="제품 백데이터" />
        <Stack direction="row" alignItems="center" gap={2}>
          <Button variant="contained" startIcon={<PublishIcon />}>
            제품 업로드
          </Button>
          <Button variant="contained" startIcon={<PlusOneOutlined />}>
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
            {/* {rows.map((item, index) => {
              const row = item as unknown as ProductSaleData;
              const isLast = index === rows.length - 1;
              return (
                <TableRow
                  onClick={() => setSelectedProductSale(row)}
                  hover
                  ref={isLast ? scrollRef : null}
                  key={index}
                >
                  <Cell sx={{ minWidth: 200 }}>{row.name}</Cell>
                  <Cell>{getKCWFormat(row.today?.accPayCost ?? 0)}</Cell>
                  <Cell>{getKCWFormat(row.thisWeek?.accPayCost ?? 0)}</Cell>
                  <Cell>{getKCWFormat(row.lastWeek?.accPayCost ?? 0)}</Cell>
                  <Cell>{getKCWFormat(row.thisMonth?.accPayCost ?? 0)}</Cell>
                  <Cell sx={{ width: '30%' }}>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {row.clients.slice(0, 5).map((client) => (
                        <Chip
                          key={`${client._id.mallId}_${client._id.productCode}`}
                          label={client._id.mallId}
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Cell>
                </TableRow>
              );
            })} */}
          </TableBody>
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default BackData;
