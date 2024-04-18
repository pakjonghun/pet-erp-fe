import * as React from 'react';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

export type SelectItem = { _id?: string | null; label?: string | null };
interface Props {
  value: SelectItem | null;
  setValue: (item: SelectItem | null) => void;
  options: SelectItem[];
  scrollRef: (elem: HTMLElement) => void;
  renderSearchInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

const SearchAutoComplete: React.FC<Props> = ({
  value,
  options,
  setValue,
  renderSearchInput,
  scrollRef,
}) => {
  return (
    <Autocomplete
      value={value}
      noOptionsText="검색 결과가 없습니다."
      onChange={(_, value) => setValue(value)}
      disablePortal
      filterSelectedOptions
      isOptionEqualToValue={(item, value) => item._id === value._id}
      options={options}
      renderInput={renderSearchInput}
      getOptionLabel={(item) => item.label!}
      renderOption={(props, item, state) => {
        const { key, ...rest } = props as any;
        const isLast = state.index === options.length - 1;
        return (
          <Box component="li" ref={isLast ? scrollRef : null} key={item._id} {...rest}>
            {item.label}
          </Box>
        );
      }}
    />
  );
};

export default SearchAutoComplete;
