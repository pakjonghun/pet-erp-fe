'use client';

import HeadCell from '@/components/table/HeadCell';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  Table,
  TableHead,
  TableRow,
  FormControl,
  FormGroup,
  TextField,
  InputAdornment,
} from '@mui/material';
import { ProductSaleData } from '@/api/graphql/codegen/graphql';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import useTextDebounce from '@/hooks/useTextDebounce';
import TablePage from '@/components/table/TablePage';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import ProductSaleModal from './_components/ProductSaleModal';
import TableBodySection from './_components/TableBodySection';

const ProductSales = () => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);
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
          <TableBodySection
            keyword={delayedKeyword}
            setSelectedProductSale={setSelectedProductSale}
          />
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default ProductSales;
