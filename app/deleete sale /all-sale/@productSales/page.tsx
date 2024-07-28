'use client';

import TableTitle from '@/components/ui/typograph/TableTitle';
import { FormControl, FormGroup, TextField, InputAdornment, Stack } from '@mui/material';
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
import { ProductSaleMenu } from '@/http/graphql/codegen/graphql';

const ProductSales = () => {
  const [sort, setSort] = useState('accCount');
  const [order, setOrder] = useState<OrderValue>(-1);
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);
  const [selectedProductSale, setSelectedProductSale] = useState<null | ProductSaleMenu>(null);
  const { from, to } = useReactiveVar(saleRange);
  const { data, networkStatus, fetchMore } = useProductSales({
    keyword: delayedKeyword,
    limit: LIMIT,
    skip: 0,
    from: from.toISOString(),
    to: to.toISOString(),
    // sort,
    // order,
  });

  const handleSort = (sortValue: string, orderValue: OrderValue) => {
    setOrder(orderValue);
    setSort(sortValue);
  };

  const rows = (data?.productSales?.data as ProductSaleMenu[]) ?? [];

  const isLoading = networkStatus == 1 || networkStatus == 2 || networkStatus == 3;
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
  const tableScrollRef = useInfinityScroll({ callback });
  const cardScrollRef = useInfinityScroll({ callback });

  const sortController = {
    order,
    sort,
    handleSort,
  };

  useEffect(() => {
    const totalData = rows.reduce(
      (acc, cur) => {
        const totalProfit =
          (cur.accPayCost ?? 0) - (cur.accWonCost ?? 0) - (cur.accDeliveryCost ?? 0);

        return {
          totalPayCost: acc.totalPayCost + (cur?.accPayCost ?? 0),
          totalCount: acc.totalCount + (cur?.accCount ?? 0),
          totalPayment: acc.totalPayment + (cur?.accTotalPayment ?? 0),
          totalProfit: acc.totalProfit + totalProfit,
        };
      },
      { totalCount: 0, totalPayCost: 0, totalProfit: 0, totalPayment: 0 }
    );
    saleTotal(totalData);
  }, [data?.productSales]);

  return (
    <TablePage sx={{ minHeight: 700 }}>
      {!!selectedProductSale && (
        <ProductSaleModal
          selectedProductSale={selectedProductSale}
          open={selectedProductSale != null}
          onClose={() => setSelectedProductSale(null)}
        />
      )}
      <Stack direction="column">
        <TableTitle sx={{ ml: 2 }} title="판매 매출현황" />
        <Stack sx={{ px: 2, mt: 1 }} direction="row" flexWrap="wrap">
          <HeaderSortButton
            text="자산순"
            textValue="totalAssetCost"
            sortController={sortController}
          />
          <HeaderSortButton
            text="판매수량순"
            textValue="accCount"
            sortController={sortController}
          />
          <HeaderSortButton
            text="매출순"
            textValue="accTotalPayment"
            sortController={sortController}
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
            sx={{
              width: 300,
              my: 2,
            }}
            label="제품 이름이나 코드를 입력하세요."
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
        scrollRef={cardScrollRef}
        setSelectedProductSale={setSelectedProductSale}
      />
      <ProductSaleTable
        setSelectedProductSale={setSelectedProductSale}
        data={rows}
        isEmpty={isEmpty}
        isLoading={isLoading}
        scrollRef={tableScrollRef}
      />
    </TablePage>
  );
};

export default ProductSales;
