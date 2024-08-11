import { LIMIT } from '@/constants';
import useTextDebounce from '@/hooks/useTextDebounce';
import { Order, OutClient } from '@/http/graphql/codegen/graphql';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  FormControl,
  TextField,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { CreateAdForm } from '../_validations/createSubsidiaryValidation copy';
import useInfinityScroll from '@/hooks/useInfinityScroll';

interface Props {
  control: Control<CreateAdForm>;
  selectedClient: OutClient | null;
  onSelectedClient: (client: OutClient | null) => void;
  errorMessage?: string;
}

const SelectClient: FC<Props> = ({ control, selectedClient, errorMessage, onSelectedClient }) => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);

  const { data, networkStatus, fetchMore, refetch } = useClients({
    keyword: delayedKeyword,
    skip: 0,
    limit: LIMIT,
    sort: 'createdAt',
    order: Order.Desc,
  });

  const isLoading = networkStatus <= 3;

  const rows = (data?.clients.data as OutClient[]) ?? [];

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.clients.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            clientsInput: {
              keyword,
              skip: rows.length,
              limit: LIMIT,
              sort: 'createdAt',
              order: Order.Desc,
            },
          },
        });
      }
    }
  };
  const scrollRef = useInfinityScroll({ callback });
  const isEmpty = !isLoading && rows.length === 0;

  return (
    <Controller
      name="clientCode"
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete
            value={selectedClient}
            isOptionEqualToValue={(a, b) => a.code == b.code}
            options={rows}
            loading={isLoading}
            getOptionLabel={(item) => `${item.name}`}
            fullWidth
            disableCloseOnSelect
            defaultValue={null}
            inputValue={keyword}
            onInputChange={(_, newValue) => setKeyword(newValue)}
            noOptionsText="검색 결과가 없습니다."
            loadingText="로딩중입니다."
            onChange={(_, value) => {
              field.onChange(value?.code ?? null);
              onSelectedClient(value);
            }}
            filterOptions={(options) => {
              return options;
            }}
            renderOption={(props, item, state) => {
              const { key, ...rest } = props as any;
              const isLast = state.index === rows.length - 1;
              return (
                <Box component="li" ref={isLast ? scrollRef : null} key={item} {...rest}>
                  {`${item.name}(${item.code})`}
                </Box>
              );
            }}
            renderInput={(params: AutocompleteRenderInputParams) => {
              const v = params.inputProps.value;
              console.log(v);
              return (
                <FormControl fullWidth>
                  <TextField
                    {...params}
                    name={field.name}
                    label="거래처 이름이나 코드"
                    error={!!errorMessage}
                    helperText={errorMessage ?? ''}
                    size="small"
                  />
                </FormControl>
              );
            }}
          />
        );
      }}
    />
  );
};

export default SelectClient;
