import { InputLabel, Select, MenuItem, SelectChangeEvent, SxProps } from '@mui/material';
import React, { FC } from 'react';

interface Props {
  label: string;
  optionItems: string[];
  value: string;
  defaultValue: string;
  onChangeValue: (event: SelectChangeEvent) => void;
  sx?: SxProps;
}

const BaseSelect: FC<Props> = ({ label, optionItems, defaultValue, onChangeValue, value, sx }) => {
  return (
    <>
      <InputLabel id="role_change_select">{label}</InputLabel>
      <Select
        sx={sx}
        size="small"
        defaultValue={defaultValue}
        value={value}
        label={label}
        id="role_change_select"
        onChange={onChangeValue}
      >
        {optionItems.map((role) => (
          <MenuItem value={role} key={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default BaseSelect;
