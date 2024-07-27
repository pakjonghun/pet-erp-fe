import { useState } from 'react';
import { CardContent, Typography } from '@mui/material';
import TotalSaleCaption from './TotalSaleCaption';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import ProductDetailContent from './ProductDetailContent';
import useTextDebounce from '@/hooks/useTextDebounce';
import SearchField from './_components/SearchField';
import { getToday } from '@/components/calendar/dateFilter/utils';

const ProductSaleDetail = () => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);

  const [dateRange, setDateRange] = useState(getToday());
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  return (
    <>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
      </CardContent>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="caption">검색된 데이터 수 100개</Typography>
        <Typography variant="caption">
          <TotalSaleCaption dateRange={dateRange} />
        </Typography>
      </CardContent>
      <CardContent>
        <ProductDetailContent dateRange={dateRange} keyword={delayedKeyword} />
      </CardContent>
    </>
  );
};

export default ProductSaleDetail;
