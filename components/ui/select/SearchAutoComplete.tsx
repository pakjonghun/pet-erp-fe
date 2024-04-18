import { FC } from 'react';
import Box from '@mui/material/Box';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';

interface Props {
  options: { _id: string; label: string }[];
  scrollRef: (elem: HTMLElement) => void;
  renderSearchInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

const SearchAutoComplete: FC<Props> = ({ options, renderSearchInput, scrollRef }) => {
  return (
    <Autocomplete
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
            ref={isLast ? scrollRef : null}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
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
