'use client';

import { FC, ReactNode } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';

interface Props {
  children: ReactNode;
}

const DatePickerProvider: FC<Props> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      {children}
    </LocalizationProvider>
  );
};

export default DatePickerProvider;
