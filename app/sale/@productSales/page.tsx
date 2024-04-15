'use client';

import { useProductSales } from '@/api/graphql/hooks/product/useProductSaleList';
import Cell from '@/components/table/Cell';
import EmptyRow from '@/components/table/EmptyRow';
import HeadCell from '@/components/table/HeadCell';
import TableTitle from '@/components/ui/typograph/TableTitle';
import { getNumberWithComma, getKCWFormat } from '@/util';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  alpha,
  TableCell,
} from '@mui/material';
import { TOP_LIMIT } from '../@topClients/constants';
import { ProductSaleData } from '@/api/graphql/codegen/graphql';

const ProductSales = () => {
  const { data } = useProductSales({ keywordTarget: 'code', keyword: '', limit: 10, skip: 0 });
  const rows = data?.productSales.data ?? [];
  const isEmpty = rows.length === 0;
  return (
    <Paper sx={{ m: 2 }}>
      <TableTitle title="제품 판매현황" />
      <TableContainer
        sx={{
          width: '100%',
        }}
      >
        <Table>
          <TableHead>
            <TableRow hover>
              <HeadCell tableCellProp={{ align: 'center', colSpan: 6 }} text="수익" />
            </TableRow>
            <TableRow hover>
              <HeadCell sx={{ width: '100%' }} text="이름" />
              <HeadCell text="오늘" />
              <HeadCell text="이번주" />
              <HeadCell text="지난주" />
              <HeadCell text="이번달" />
              <HeadCell text="TOP5 거래처" />
            </TableRow>
          </TableHead>
          <TableBody>
            <EmptyRow colSpan={4} isEmpty={isEmpty} />
            {rows.map((item, index) => {
              const row = item as unknown as ProductSaleData;
              return (
                <TableRow
                  sx={{
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.primary.light, 0.5),
                    },
                  }}
                  key={index}
                >
                  <Cell>{row.name}</Cell>
                  <Cell>{getKCWFormat(row.today?.accPayCost ?? 0)}</Cell>
                  <Cell>{getKCWFormat(row.thisWeek?.accPayCost ?? 0)}</Cell>
                  <Cell>{getKCWFormat(row.lastWeek?.accPayCost ?? 0)}</Cell>
                  <Cell>{getKCWFormat(row.thisMonth?.accPayCost ?? 0)}</Cell>
                  <Cell>{row.clients.slice(0, 5).map((client) => client._id.mallId)}</Cell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductSales;
