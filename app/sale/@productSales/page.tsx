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
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import useTextDebounce from '@/hooks/useTextDebounce';
import TablePage from '@/components/table/TablePage';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import ProductSaleModal from './_components/ProductSaleModal';
import TableBodySection from './_components/TableBodySection';
import { useReactiveVar } from '@apollo/client';
import { saleTotal } from '@/store/saleStore';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';

const ProductSales = () => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);
  const [selectedProductSale, setSelectedProductSale] = useState<null | ProductSaleData>(null);
  const { totalCount, totalProfit, totalPayCost } = useReactiveVar(saleTotal);

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
              <HeadCell
                text={
                  <>
                    판매수량
                    <br />({getNumberWithComma(totalCount)})
                  </>
                }
              />
              <HeadCell
                text={
                  <>
                    매출
                    <br />({getKCWFormat(totalPayCost)})
                  </>
                }
              />

              <HeadCell
                text={
                  <>
                    수익
                    <br />({getKCWFormat(totalProfit)})
                  </>
                }
              />
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
