'use client';

import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  FormControl,
  FormGroup,
  TextField,
  InputAdornment,
  Button,
  Stack,
} from '@mui/material';
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import useTextDebounce from '@/hooks/useTextDebounce';
import TablePage from '@/components/table/TablePage';
import ProductSaleModal from './_components/ProductSaleModal';
import ProductSaleTable from './_components/ProductSaleTable';
import ProductSaleCards from './_components/ProductSaleCards';
import { useReactiveVar } from '@apollo/client';
import { useProductSales } from '@/http/graphql/hooks/product/useProductSaleList';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { saleRange, saleTotal } from '@/store/saleStore';
import { OrderValue } from '@/types';
import HeaderSortButton from '@/components/ui/button/HeaderSortButton';

const ProductSales = () => {
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState<OrderValue>(1);
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);
  const [selectedProductSale, setSelectedProductSale] =
    useState<null | ProductSaleData>(null);
  const { from, to } = useReactiveVar(saleRange);
  const { data, networkStatus, fetchMore } = useProductSales({
    keyword: delayedKeyword,
    limit: LIMIT,
    skip: 0,
    from: from.toISOString(),
    to: to.toISOString(),
    sort,
    order,
  });

  const handleSort = (sortValue: string, orderValue: OrderValue) => {
    setOrder(orderValue);
    setSort(sortValue);
  };

  const rows = (data?.productSales?.data as ProductSaleData[]) ?? [];
  const isLoading =
    networkStatus == 1 || networkStatus == 2 || networkStatus == 3;
  const isEmpty = !isLoading && rows.length === 0;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.productSales?.totalCount ?? 0;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            productSalesInput: {
              keyword: delayedKeyword,
              limit: LIMIT,
              skip: rows.length,
              from: from.toISOString(),
              to: to.toISOString(),
              sort,
              order,
            },
          },
        });
      }
    }
  };
  const scrollRef = useInfinityScroll({ callback });

  const sortController = {
    order,
    sort,
    handleSort,
  };

  useEffect(() => {
    const totalData = rows.reduce(
      (acc, cur) => {
        return {
          totalCount: acc.totalCount + (cur?.sales?.accCount ?? 0),
          totalPayCost: 0 + (cur?.sales?.accPayCost ?? 0),
          totalProfit: 0 + (cur?.sales?.accProfit ?? 0),
        };
      },
      { totalCount: 0, totalPayCost: 0, totalProfit: 0 }
    );

    saleTotal(totalData);
  }, [data?.productSales?.data]);

  return (
    <TablePage sx={{ flex: 1 }}>
      {!!selectedProductSale && (
        <ProductSaleModal
          selectedProductSale={selectedProductSale}
          open={selectedProductSale != null}
          onClose={() => setSelectedProductSale(null)}
        />
      )}
      <Stack direction="row" alignItems="center">
        <TableTitle sx={{ ml: 2 }} title="판매 매출현황" />
        <HeaderSortButton
          sx={{ mt: 1 }}
          text="자산순"
          textValue="totalAssetCost"
          sortController={sortController}
        />
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
      <ProductSaleCards
        sx={{
          display: {
            md: 'none',
          },
        }}
        data={rows}
        isEmpty={isEmpty}
        isLoading={isLoading}
        scrollRef={scrollRef}
      />
      <ProductSaleTable
        setSelectedProductSale={setSelectedProductSale}
        data={rows}
        isEmpty={isEmpty}
        isLoading={isLoading}
        scrollRef={scrollRef}
      />
    </TablePage>
  );
};

export default ProductSales;
