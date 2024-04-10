import { FindLogsDto } from '@/api/graphql/codegen/graphql';

import BaseSelect from '@/components/ui/select/BaseSelect';
import { SearchOutlined } from '@mui/icons-material';
import {
  FormControl,
  FormGroup,
  InputAdornment,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import useTextDebounce from '@/hooks/useTextDebounce';

interface Props {
  findLogsQuery: FindLogsDto;
  setFindLogsQuery: (query: Partial<FindLogsDto>) => void;
  toggleFilter: (element: HTMLElement) => void;
}

const hangleMapper = {
  로그기록: 'description',
  로그타입: 'logType',
  대상유저: 'userId',
};
const valueMapper = {
  description: '로그기록',
  logType: '로그타입',
  userId: '대상유저',
};

const Search: FC<Props> = ({ findLogsQuery, setFindLogsQuery, toggleFilter }) => {
  const [keyword, setKeyword] = useState('');
  const delayText = useTextDebounce(keyword);

  useEffect(() => {
    if (!delayText) return;

    setFindLogsQuery({
      keyword: delayText,
    });
  }, [delayText]);

  const optionItems: (keyof typeof hangleMapper)[] = ['로그기록', '로그타입', '대상유저'];

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setFindLogsQuery({
      keywordTarget: hangleMapper[selectedValue as keyof typeof hangleMapper],
    });
  };

  return (
    <FormGroup row sx={{ gap: 1 }}>
      <FormControl sx={{ flexGrow: 1 }} required>
        <TextField
          size="small"
          fullWidth
          label="검색 키워드"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <FormControl>
        <BaseSelect
          label="검색대상"
          defaultValue={optionItems[0]}
          optionItems={optionItems}
          value={valueMapper[findLogsQuery.keywordTarget as keyof typeof valueMapper]}
          onChangeValue={handleChangeSelect}
        />
      </FormControl>
    </FormGroup>
  );
};

export default Search;
