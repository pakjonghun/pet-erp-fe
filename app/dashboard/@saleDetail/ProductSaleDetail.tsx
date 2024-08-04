import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import TotalSaleCaption from './TotalSaleCaption';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import useTextDebounce from '@/hooks/useTextDebounce';
import SearchField from './_components/SearchField';
import { getNumberToString } from '@/utils/sale';
import ProductDetailContent from './ProductDetailContent';
import { saleDetailRange } from '@/store/saleStore';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { useReactiveVar } from '@apollo/client';
import { Button, Stack } from '@mui/material';
import { SaleProductSortList } from '../@saleDetail/constants';
import { getSortIcon } from '../@saleDetail/SaleOrders';

const ProductSaleDetail = () => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);

  const setDateRange = (value: DateRange) => saleDetailRange(value);
  const dateRange = useReactiveVar(saleDetailRange);
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  const [totalDataCount, setTotalDataCount] = useState(0);

  const [sort, setSort] = useState('accCount');
  const [order, setOrder] = useState(-1);

  const onClickSort = (sortTarget: string) => {
    if (sort == sortTarget) {
      setOrder((prev) => (prev == 1 ? -1 : 1));
    } else {
      setSort(sortTarget);
      setOrder(1);
    }
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Box sx={{ p: 2, pb: 0, border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <SearchField
            keywordInput={{
              keyword,
              setKeyword,
            }}
            dateInput={{
              dateRange,
              setDateRange,
              searchStandard,
              setSearchStandard,
            }}
          />
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              gap: 1,
              justifyContent: {
                xs: 'space-between',
                sm: 'flex-start',
              },
              flexWrap: 'wrap',
            }}
          >
            {SaleProductSortList.map(({ name, value }) => {
              const isSorting = sort == value;
              let nextOrder = 0;
              if (isSorting) {
                nextOrder = order == 1 ? -1 : 1;
              }

              return (
                <Button
                  onClick={() => onClickSort(value)}
                  sx={{
                    px: {
                      xs: 0.2,
                      md: 1,
                    },
                    height: 'fit-content',
                  }}
                  endIcon={getSortIcon(nextOrder)}
                  size="small"
                  variant="outlined"
                  key={value}
                >
                  {name}
                </Button>
              );
            })}
          </Stack>
        </Box>
      </Box>
      <Box sx={{ px: 2, mt: 1 }}>
        <Box sx={{ px: 1, py: 3, border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', py: 0, pl: 1 }}>
            <Typography variant="caption" color="GrayText">{`검색결과 : ${getNumberToString(
              totalDataCount,
              'comma'
            )}건`}</Typography>
            <Typography variant="caption">
              <TotalSaleCaption dateRange={dateRange} />
            </Typography>
          </Box>

          <Box sx={{ px: 1, pb: 3 }}>
            <ProductDetailContent
              setTotalDataCount={setTotalDataCount}
              dateRange={dateRange}
              keyword={delayedKeyword}
              sort={sort}
              order={order}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductSaleDetail;
