import { isNumber } from '@/utils/common';
import { SxProps, TextField, TextFieldProps } from '@mui/material';
import { FC, ReactElement } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface Props {
  label: string;
  field: ControllerRenderProps<any, any>;
  error?: boolean;
  helperText?: string;
  endAdornment?: ReactElement;
  onChange?: (value: number | null) => void;
  textFieldProps?: TextFieldProps;
  sx?: SxProps;
}

const NumberInput: FC<Props> = ({
  label,
  field,
  error = false,
  helperText = '',
  endAdornment,
  onChange,
  textFieldProps,
  sx,
}) => {
  return (
    <TextField
      sx={sx}
      {...textFieldProps}
      size="small"
      {...field}
      value={field.value == null ? '' : field.value}
      type={field.value == null || (field.value as unknown as string) === '' ? 'text' : 'number'}
      onChange={(event) => {
        const changeFunc = onChange ?? field.onChange;
        const isEmpty = event.target.value == null || event.target.value === '';
        if (isEmpty) {
          changeFunc(null);
          return;
        }

        const isNumberData = isNumber(event.target.value);
        if (!isNumberData) return;
        changeFunc(Number(event.target.value));
      }}
      label={label}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment,
      }}
    />
  );
};

export default NumberInput;
