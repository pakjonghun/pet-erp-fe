import { useState } from 'react';
import { CardContent, Typography } from '@mui/material';
import TotalSaleCaption from './TotalSaleCaption';
import ClientDetailContent from './ClientDetailContent';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import useTextDebounce from '@/hooks/useTextDebounce';
import SearchField from './_components/SearchField';
import { getToday } from '@/components/calendar/dateFilter/utils';

const ClientSaleDetail = () => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);

  const [dateRange, setDateRange] = useState(getToday());
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  const [totalDataCount, setTotalDataCount] = useState(0);
  return (
    <>
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
      <CardContent sx={{ display: 'flex', flexDirection: 'column', py: 0 }}>
        <Typography variant="caption">{`검색된 데이터 수 ${totalDataCount}`}</Typography>
        <Typography variant="caption">
          <TotalSaleCaption dateRange={dateRange} />
        </Typography>
      </CardContent>
      <CardContent>
        <ClientDetailContent
          setTotalDataCount={setTotalDataCount}
          dateRange={dateRange}
          keyword={delayedKeyword}
        />
      </CardContent>
    </>
  );
};

export default ClientSaleDetail;
