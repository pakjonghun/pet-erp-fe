import { FC, ReactNode } from 'react';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

interface Props {
  inputValue: string;
  onInputChange: (e: any, value: string) => void;
  options: string[];
  value: string[];
  loading: boolean;
  onChange: (value: string[]) => void;
  renderSearchInput: (params: AutocompleteRenderInputParams) => ReactNode;
  scrollRef: null | ((htmlElem: HTMLElement) => void);
}

const MultiAutoComplete: FC<Props> = ({
  inputValue,
  onInputChange,
  value,
  options,
  loading,
  scrollRef,
  renderSearchInput,
  onChange,
}) => {
  return (
    <Autocomplete
      fullWidth
      disableCloseOnSelect
      defaultValue={value}
      inputValue={inputValue}
      onInputChange={onInputChange}
      noOptionsText="검색 결과가 없습니다."
      loadingText="로딩중입니다."
      loading={loading}
      onChange={(_, value) => onChange(value)}
      multiple
      options={options}
      value={value}
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
export default MultiAutoComplete;
