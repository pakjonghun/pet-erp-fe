import { getLastMonth, getLastWeek, getThisMonth, getThisWeek, getYesterday } from './utils';

export const dateFilterOptions = [
  {
    title: '어제',
    callback: getYesterday,
  },
  {
    title: '이번주',
    callback: getThisWeek,
  },
  {
    title: '지난주',
    callback: getLastWeek,
  },
  {
    title: '이번달',
    callback: getThisMonth,
  },
  {
    title: '지난달',
    callback: getLastMonth,
  },
  {
    title: '직접입력',
  },
];
