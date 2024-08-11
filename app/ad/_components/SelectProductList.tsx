import { LIMIT } from '@/constants';
import useTextDebounce from '@/hooks/useTextDebounce';
import { Order, OutClient, Product } from '@/http/graphql/codegen/graphql';
import { useClients } from '@/http/graphql/hooks/client/useClients';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { CreateAdForm, NameCodeForm } from '../_validations/createSubsidiaryValidation copy';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';

interface Props {
  selectedProductList?: NameCodeForm[] | null;
  maxLen: number;
  control: Control<CreateAdForm>;
  errorMessage?: string;
  index: number;
  sx?: SxProps;
}

const SelectProductList: FC<Props> = ({
  selectedProductList,
  index,
  maxLen,
  control,
  errorMessage,
  sx,
}) => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);
  const [selectAll, setSelectAll] = useState(false);
  const { data: products, networkStatus } = useProducts({
    keyword: delayedKeyword,
    limit: 9999999,
    skip: 0,
  });

  const rows = products?.products.data ?? [];

  useEffect(() => {
    if (!rows) return;

    const isAllSelected = rows.length === selectedProductList?.length;
    setSelectAll(isAllSelected);
  }, [rows, selectedProductList, setSelectAll]);

  const isLoading = networkStatus <= 3;

  return (
    <Controller
      control={control}
      name={`ads.${index}.productCodeList`}
      render={({ field }) => {
        return (
          <Stack sx={sx} direction="row" gap={0.2} alignItems="flex-start">
            <FormControlLabel
              label={<Typography variant="caption">All</Typography>}
              control={
                <Checkbox
                  size="small"
                  checked={selectAll}
                  onChange={(_, checked) => {
                    const options = checked ? rows : [];
                    field.onChange(options);
                    setSelectAll(checked);
                  }}
                />
              }
            />
            <Autocomplete
              size="small"
              multiple
              value={selectedProductList ?? undefined}
              options={rows}
              loading={isLoading}
              getOptionLabel={(item) => `${item.name}(${item.code})`}
              fullWidth
              disableCloseOnSelect
              defaultValue={[]}
              isOptionEqualToValue={(a, b) => a.code == b.code}
              inputValue={keyword}
              onInputChange={(_, newValue) => setKeyword(newValue)}
              noOptionsText="검색 결과가 없습니다."
              loadingText="로딩중입니다."
              limitTags={maxLen}
              filterOptions={(o) => o}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderOption={(props, item, state) => {
                const { key, ...rest } = props as any;
                return (
                  <Box component="li" key={item.code} {...rest}>
                    {`${item.name}(${item.code})`}
                  </Box>
                );
              }}
              renderInput={(params: AutocompleteRenderInputParams) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      {...params}
                      name={field.name}
                      label="제품 이름이나 코드"
                      error={!!errorMessage}
                      helperText={errorMessage ?? ''}
                      size="small"
                    />
                  </FormControl>
                );
              }}
            />
          </Stack>
        );
      }}
    />
  );
};

export default SelectProductList;
