import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { AdsInput } from '@/http/graphql/codegen/graphql';
import { FC, useState } from 'react';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';

interface Props {
  searchQuery: AdsInput;
  setSearchQuery: (adInput: AdsInput) => void;
}

const SearchSection: FC<Props> = ({ searchQuery, setSearchQuery }) => {
  const { from, keyword, to, type } = searchQuery;

  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');
  const [isDateChecked, setIsDateChecked] = useState(true);

  const setDateRange = ({ from, to }: DateRange) => {
    setSearchQuery({ ...searchQuery, from, to });
  };

  const setKeyword = (text: string) => {
    setSearchQuery({ ...searchQuery, keyword: text });
  };

  return (
    <FormGroup sx={{ ml: 2, width: 'fit-content' }}>
      <FormControlLabel
        label={
          <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
            광고날짜 범위
          </Typography>
        }
        control={
          <Checkbox
            checked={isDateChecked}
            onChange={(_, checked) => setIsDateChecked(checked)}
            sx={{ py: 0 }}
          />
        }
      />
      <SwitchDate
        sx={{
          pointerEvents: isDateChecked ? 'auto' : 'none',
          opacity: isDateChecked ? 1 : 0.4,
        }}
        dateRange={{ from, to }}
        searchStandard={searchStandard}
        setDateRange={setDateRange}
        setSearchStandard={setSearchStandard}
      />
      <FormControl sx={{ mt: 4, width: '100%' }}>
        <TextField
          onChange={(event) => setKeyword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          label="제품이나 채널입력"
          size="small"
        />
      </FormControl>
    </FormGroup>
  );
};

export default SearchSection;
