import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import TotalSaleCaption from './TotalSaleCaption';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import useTextDebounce from '@/hooks/useTextDebounce';
import SearchField from './_components/SearchField';
import { getNumberToString } from '@/utils/sale';
import ProductDetailContent from './ProductDetailContent';
import { ProductSaleRange } from '@/store/saleStore';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { useReactiveVar } from '@apollo/client';

const ProductSaleDetail = () => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);

  const setDateRange = (value: DateRange) => ProductSaleRange(value);
  const dateRange = useReactiveVar(ProductSaleRange);
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  const [totalDataCount, setTotalDataCount] = useState(0);
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
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductSaleDetail;
