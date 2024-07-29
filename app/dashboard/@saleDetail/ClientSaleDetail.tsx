import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import TotalSaleCaption from './TotalSaleCaption';
import ClientDetailContent from './ClientDetailContent';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import useTextDebounce from '@/hooks/useTextDebounce';
import SearchField from './_components/SearchField';
import { getToday } from '@/components/calendar/dateFilter/utils';
import { getNumberToString } from '@/utils/sale';

const ClientSaleDetail = () => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);

  const [dateRange, setDateRange] = useState(getToday());
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
            <Typography variant="caption">{`검색된 데이터 수 ${getNumberToString(
              totalDataCount,
              'comma'
            )}`}</Typography>
            <Typography variant="caption">
              <TotalSaleCaption dateRange={dateRange} />
            </Typography>
          </Box>

          <Box sx={{ px: 1, pb: 3, minHeight: '500px' }}>
            <ClientDetailContent
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

export default ClientSaleDetail;
