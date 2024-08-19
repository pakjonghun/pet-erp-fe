import { FC } from 'react';
import { DateRange } from '@/components/calendar/dateFilter/type';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import { Search } from '@mui/icons-material';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { minMarginRate } from '@/store/saleStore';

interface Props {
  dateInput: {
    dateRange: DateRange;
    setDateRange: (value: DateRange) => void;
    searchStandard: SearchStandard;
    setSearchStandard: (value: SearchStandard) => void;
  };
  keywordInput: {
    keyword: string;
    setKeyword: (value: string) => void;
  };
  hint?: string;
}

const SearchField: FC<Props> = ({ dateInput, keywordInput: { keyword, setKeyword }, hint }) => {
  const setMinMargin = (value: number | null) => {
    minMarginRate(value);
  };
  const minMargin = useReactiveVar(minMarginRate);
  console.log(minMargin);
  return (
    <>
      <SwitchDate {...dateInput} />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TextField
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            width: {
              xs: '100%',
              sm: 280,
            },
            my: 2,
          }}
          label={hint ?? '이름이나 코드를 입력하세요.'}
          size="small"
        />
        <TextField
          onChange={(event) => {
            const value = event.target.value;
            const newValue = value == '' ? null : Number(value);
            setMinMargin(newValue);
          }}
          value={minMargin}
          size="small"
          type={minMargin == null ? 'text' : 'number'}
          label="최저 마진%"
          placeholder="최저 마진을 입력해주세요."
        />
      </Stack>
    </>
  );
};

export default SearchField;
