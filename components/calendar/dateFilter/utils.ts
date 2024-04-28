import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import { DateRange } from './type';

export const getToday = () => {
  return getDateRange(dayjs(), 'date');
};

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

export const getStringRange = ({ from, to }: DateRange) => {
  return `${getStringDate(from)} ~ ${getStringDate(to)}`;
};

export const getStringDate = (date: Dayjs | null) => {
  return date ? date.format('YYYY. MM. DD.') : '지정안됨';
};

export const getDateRange = (date: Dayjs, unit: OpUnitType) => {
  const from = date.startOf(unit);
  const to = date.endOf(unit);
  return { from, to };
};
