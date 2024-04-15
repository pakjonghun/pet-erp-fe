'use client';

import { useProductSales } from '@/api/graphql/hooks/product/useProductSaleList';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import HeadCell from '@/components/table/HeadCell';
import TableTitle from '@/components/ui/typograph/TableTitle';
import { getKCWFormat } from '@/util';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  FormControl,
  FormGroup,
  TextField,
  InputAdornment,
  Chip,
  Stack,
} from '@mui/material';
import { ProductSaleData } from '@/api/graphql/codegen/graphql';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import useTextDebounce from '@/hooks/useTextDebounce';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { LIMIT } from '@/constants';
import TablePage from '@/components/table/TablePage';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import ProductSaleModal from './_components/ProductSaleModal';

const ProductSales = () => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);
  const { data, networkStatus, fetchMore } = useProductSales({
    keywordTarget: 'name',
    keyword: delayedKeyword,
    limit: LIMIT,
    skip: 0,
  });
  const rows = data?.productSales.data ?? [];
  const isEmpty = rows.length === 0;
  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (networkStatus != 1 && networkStatus != 3) {
        const totalCount = data?.productSales.totalCount;
        if (totalCount != null && totalCount > rows.length) {
          fetchMore({
            variables: {
              keywordTarget: 'name',
              keyword: delayedKeyword,
              limit: LIMIT,
              skip: rows.length,
            },
          });
        }
      }
    }
  };
  const scrollRef = useInfinityScroll({ callback });
  const [selectedProductSale, setSelectedProductSale] = useState<null | ProductSaleData>(null);

  return (
    <TablePage sx={{ flex: 1 }}>
      {!!selectedProductSale && (
        <ProductSaleModal
          selectedProductSale={selectedProductSale}
          open={selectedProductSale != null}
          onClose={() => setSelectedProductSale(null)}
        />
      )}
      <TableTitle title="판매 매출현황" />
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
              <HeadCell text="이름" />
              <HeadCell text="오늘" />
              <HeadCell text="이번주" />
              <HeadCell text="지난주" />
              <HeadCell text="이번달" />
              <HeadCell text="TOP5 거래처" />
            </TableRow>
          </TableHead>
          <TableBody>
            <EmptyRow colSpan={6} isEmpty={isEmpty} />
            {rows.map((item, index) => {
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
            })}
          </TableBody>
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default ProductSales;
