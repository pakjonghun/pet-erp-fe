import * as React from 'react';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

interface Props {
  inputValue: string;
  onInputChange: (e: any, newValue: string) => void;
  value: string | null;
  setValue: (item: string | null) => void;
  options: string[];
  scrollRef: (elem: HTMLElement) => void;
  renderSearchInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
  loading?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const SearchAutoComplete: React.FC<Props> = ({
  inputValue,
  onInputChange,
  value,
  options,
  setValue,
  renderSearchInput,
  scrollRef,
  loading = false,
}) => {
  console.log('value : ', value);
  return (
    <Autocomplete
      defaultValue={value}
      inputValue={inputValue}
      onInputChange={onInputChange}
      loading={loading}
      loadingText="로딩중"
      value={value}
      noOptionsText="검색 결과가 없습니다."
      onChange={(_, value) => setValue(value)}
      disablePortal
      options={options}
      renderInput={renderSearchInput}
      renderOption={(props, item, state) => {
        const { key, ...rest } = props as any;
        const isLast = state.index === options.length - 1;
        return (
          <Box component="li" ref={isLast ? scrollRef : null} key={item} {...rest}>
            {item}
          </Box>
        );
      }}
    />
  );
};

export default SearchAutoComplete;
