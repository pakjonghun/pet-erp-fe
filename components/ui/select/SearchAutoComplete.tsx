import { FC } from 'react';
import Box from '@mui/material/Box';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';

export type SelectItem = { _id: string; label: string };

interface Props {
  value: SelectItem | null;
  setValue: (item: SelectItem | null) => void;
  options: SelectItem[];
  scrollRef: (elem: HTMLElement) => void;
  renderSearchInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

const SearchAutoComplete: FC<Props> = ({
  value,
  options,
  setValue,
  renderSearchInput,
  scrollRef,
}) => {
  return (
    <Autocomplete
      value={value}
      onChange={(_, value) => setValue(value)}
      sx={{ width: '100%' }}
      size="small"
      id="country-select-demo"
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      noOptionsText="검색 결과가 없습니다."
      renderOption={(props, option, state) => {
        const isLast = state.index === options.length - 1;
        return (
          <Box
            {...props}
            ref={isLast ? scrollRef : null}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          >
            {option.label}
          </Box>
        );
      }}
      renderInput={(params) => renderSearchInput(params)}
    />
  );
};

export default SearchAutoComplete;
