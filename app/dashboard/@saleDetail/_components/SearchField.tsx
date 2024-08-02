import { FC } from 'react';
import { DateRange } from '@/components/calendar/dateFilter/type';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

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
  return (
    <>
      <SwitchDate {...dateInput} />
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
    </>
  );
};

export default SearchField;
