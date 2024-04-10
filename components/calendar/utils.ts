import dayjs, { Dayjs } from 'dayjs';
import { NullableRange } from './type';

export const getYesterday = () => {
  const yesterday = dayjs().subtract(1, 'day');
  const from = yesterday.startOf('day');
  const to = yesterday.endOf('day');
  return { from, to };
};

export const getThisWeek = () => {
  const today = dayjs();
  const from = today.startOf('w').startOf('day');
  const to = today.endOf('w').endOf('day');
  return { from, to };
};

export const getLastWeek = () => {
  const lastWeek = dayjs().subtract(1, 'w');
  const from = lastWeek.startOf('w').startOf('day');
  const to = lastWeek.endOf('w').endOf('day');
  return { from, to };
};

export const getThisMonth = () => {
  const today = dayjs();
  const from = today.startOf('month').startOf('day');
  const to = today.endOf('month').endOf('day');
  return { from, to };
};

export const getLastMonth = () => {
  const lastMonth = dayjs().subtract(1, 'month');
  const from = lastMonth.startOf('month').startOf('day');
  const to = lastMonth.endOf('month').endOf('day');
  return { from, to };
};

export const getStringRange = ({ from, to }: NullableRange) => {
  return `${getStringDate(from)} ~ ${getStringDate(to)}`;
};

export const getStringDate = (date: Dayjs | null) => {
  return date ? date.format('YYYY. MM. DD.') : '지정안됨';
};
