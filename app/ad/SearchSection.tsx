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
import { FC, useEffect, useState } from 'react';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import BaseSelect from '@/components/ui/select/BaseSelect';
import { AdTypeToEng, AdTypeToHangle } from './constants';
import useTextDebounce from '@/hooks/useTextDebounce';

interface Props {
  isDateChecked: boolean;
  searchQuery: AdsInput;
  setSearchQuery: (adInput: AdsInput) => void;
  setIsDateChecked: (value: boolean) => void;
}

const SearchSection: FC<Props> = ({
  isDateChecked,
  setIsDateChecked,
  searchQuery,
  setSearchQuery,
}) => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);
  const { from, to, type } = searchQuery;

  useEffect(() => {
    console.log(searchQuery.keyword, delayedKeyword);
    if (searchQuery.keyword == delayedKeyword) return;

    setSearchQuery({ ...searchQuery, keyword: delayedKeyword });
    console.log('eset keyword', { ...searchQuery, keyword: delayedKeyword });
  }, [delayedKeyword, searchQuery, setSearchQuery]);

  const handleAdTypes = Object.values(AdTypeToHangle);
  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  const setDateRange = ({ from, to }: DateRange) => {
    setSearchQuery({ ...searchQuery, from, to });
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
          sx={{
            flex: 2,
            minWidth: 300,
            maxWidth: {
              md: 500,
            },
          }}
          value={keyword}
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
        <FormControl
          sx={{
            minWidth: 200,
            flex: 1,
            maxWidth: {
              md: 240,
            },
          }}
        >
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
