import { useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import TotalSaleCaption from './TotalSaleCaption';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import useTextDebounce from '@/hooks/useTextDebounce';
import SearchField from './_components/SearchField';
import { getNumberToString } from '@/utils/sale';
import ProductDetailContent from './ProductDetailContent';
import { saleDateRange } from '@/store/saleStore';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { useReactiveVar } from '@apollo/client';
import { Dayjs } from 'dayjs';

const ProductSaleDetail = () => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);

  const setDateRange = (value: DateRange) => saleDateRange(value);
  const dateRange = useReactiveVar(saleDateRange);
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  const [totalDataCount, setTotalDataCount] = useState(0);
  const [monthTotalDataCount, setMonthTotalDataCount] = useState(0);

  const date = getFormatDate(dateRange.from);
  const month = `${getFormatDate(dateRange.from.startOf('month'))}~${getFormatDate(
    dateRange.from.endOf('month')
  )}`;

  const dayDateRange = { from: dateRange.from, to: dateRange.to.endOf('day') };
  const monthDateRange = { from: dateRange.from.startOf('month'), to: dateRange.to.endOf('month') };
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
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6}>
            <Box sx={{ px: 1, py: 3, border: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Stack direction="column" sx={{ mb: 1, pl: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>{`일단위 거래처 랭킹`}</Typography>
                <Typography variant="caption">{`${date}`}</Typography>
              </Stack>
              <Box sx={{ display: 'flex', flexDirection: 'column', py: 0, pl: 1 }}>
                <Typography variant="caption" color="GrayText">{`검색결과 : ${getNumberToString(
                  totalDataCount,
                  'comma'
                )}건`}</Typography>
                <Typography variant="caption">
                  <TotalSaleCaption dateRange={dayDateRange} />
                </Typography>
              </Box>

              <Box sx={{ px: 1, pb: 3 }}>
                <ProductDetailContent
                  setTotalDataCount={setTotalDataCount}
                  dateRange={dayDateRange}
                  keyword={delayedKeyword}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ px: 1, py: 3, border: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Stack direction="column" sx={{ mb: 1, pl: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>{`월단위 거래처 랭킹`}</Typography>
                <Typography variant="caption">{`${month}`}</Typography>
              </Stack>
              <Box sx={{ display: 'flex', flexDirection: 'column', py: 0, pl: 1 }}>
                <Typography variant="caption" color="GrayText">{`검색결과 : ${getNumberToString(
                  monthTotalDataCount,
                  'comma'
                )}건`}</Typography>
                <Typography variant="caption">
                  <TotalSaleCaption dateRange={monthDateRange} />
                </Typography>
              </Box>

              <Box sx={{ px: 1, pb: 3 }}>
                <ProductDetailContent
                  setTotalDataCount={setMonthTotalDataCount}
                  dateRange={monthDateRange}
                  keyword={delayedKeyword}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductSaleDetail;

function getFormatDate(date: Dayjs) {
  return date.format('YYYY년 MM월 DD일');
}
