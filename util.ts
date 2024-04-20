import dayjs from 'dayjs';

export const getFirstPath = (pathname: string) => {
  const firstPath = pathname.match(/^\/([^\/]+)/)?.[1] ?? '';
  return firstPath;
};

export const getOriginPath = (pathname: string) => {
  console.log(pathname, 'ppppp');
  return pathname.replace(/^\/|\/$/g, '');
};

export const getDateFormat = (date: Date) => {
  return dayjs(date).format('YYYY. MM. DD');
};

export const getKCWFormat = (number: number) => {
  return Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(number);
};

export const getNumberWithComma = (number: number) => {
  return Intl.NumberFormat('ko-KR').format(number);
};
