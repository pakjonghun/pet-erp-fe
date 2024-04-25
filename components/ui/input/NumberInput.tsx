import { isNumber } from '@/util';
import { TextField } from '@mui/material';
import { FC, ReactElement } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface Props {
  label: string;
  field: ControllerRenderProps<any, any>;
  error?: boolean;
  helperText?: string;
  endAdornment?: ReactElement;
}

const NumberInput: FC<Props> = ({ label, field, error = false, helperText = '', endAdornment }) => {
  console.log(field.value);
  return (
    <TextField
      size="small"
      {...field}
      value={field.value == null ? '' : field.value}
      type={field.value == null || (field.value as unknown as string) === '' ? 'text' : 'number'}
      onChange={(event) => {
        const isEmpty = event.target.value == null || event.target.value === '';
        if (isEmpty) {
          field.onChange(undefined);
          return;
        }

        const isNumberData = isNumber(event.target.value);
        if (!isNumberData) return;

        field.onChange(Number(event.target.value));
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
