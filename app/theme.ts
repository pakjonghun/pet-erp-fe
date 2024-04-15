'use client';

import { Noto_Sans as NotoSans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const notoSans = NotoSans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#077177',
      light: '#f2f9fa',
    },
  },
  typography: {
    fontFamily: notoSans.style.fontFamily,
  },
});

export default theme;
