import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import { NumberType } from '@/types';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const getNumberToString = (number: number, numberType: NumberType) => {
  switch (numberType) {
    case 'currency':
      return getKCWFormat(number);
    case 'comma':
      return getNumberWithComma(number);
    case 'percent':
      return `${number}%`;
    default:
      break;
  }
};

export const getProfitRate = (profit: number, payCost: number) => {
  if (!payCost) return 0;
  return getFixedTwo((profit / payCost) * 100);
};

export const getFixedTwo = (number: number) => {
  return parseFloat(number.toFixed(2));
};

export const getColor = (compareNumber: number) => {
  if (compareNumber > 0) return 'green';
  if (compareNumber === 0) return 'inherit';
  if (compareNumber < 0) return 'red';
};

export const getArrow = (compareNumber: number) => {
  if (compareNumber > 0) return <ArrowUpwardIcon sx={{ width: 16, height: 16 }} />;
  if (compareNumber === 0) return '';
  if (compareNumber < 0) return <ArrowDownwardIcon sx={{ width: 16, height: 16 }} />;
};
