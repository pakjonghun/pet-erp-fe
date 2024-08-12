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
import { AdsInput, AdType } from '@/http/graphql/codegen/graphql';
import { FC, useState } from 'react';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import BaseSelect from '@/components/ui/select/BaseSelect';
import { AdTypeToEng, AdTypeToHangle } from './constants';

interface Props {
  isDateChecked: boolean;
  setIsDateChecked: (value: boolean) => void;
  searchQuery: AdsInput;
  setSearchQuery: (adInput: AdsInput) => void;
}

const SearchSection: FC<Props> = ({
  isDateChecked,
  setIsDateChecked,
  searchQuery,
  setSearchQuery,
}) => {
  const { from, keyword, to, type } = searchQuery;

  const handleAdTypes = Object.values(AdTypeToHangle);
  AdTypeToEng;
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  const setDateRange = ({ from, to }: DateRange) => {
    setSearchQuery({ ...searchQuery, from, to });
  };

  const setKeyword = (text: string) => {
    setSearchQuery({ ...searchQuery, keyword: text });
  };

  const setType = (type: AdType | '모든타입') => {
    setSearchQuery({ ...searchQuery, type: type == '모든타입' ? undefined : type });
  };

  return (
    <FormControl
      sx={{
        mx: 2,
        gap: 4,
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <FormGroup sx={{ flex: 1 }}>
        <FormControlLabel
          sx={{ width: 'fit-content' }}
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
      </FormGroup>
      <FormGroup
        sx={{
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: 2,
        }}
      >
        <TextField
          sx={{ flex: 1, minWidth: 300 }}
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
        <FormControl sx={{ minWidth: 200 }}>
          <BaseSelect
            defaultValue={handleAdTypes[0]}
            label="광고 타입선택"
            onChangeValue={(event) => {
              const hangleType = event.target.value;
              setType(AdTypeToEng[hangleType]);
            }}
            optionItems={handleAdTypes}
            value={AdTypeToHangle[type!]}
          />
        </FormControl>
      </FormGroup>
    </FormControl>
  );
};

export default SearchSection;
