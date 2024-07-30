import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import { NumberType } from '@/types';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SaleInfo } from '@/http/graphql/codegen/graphql';
import { EMPTY } from '@/constants';
import { SaleInfoPropsNumber, SaleOrderProps } from '@/app/dashboard/types';

export const getNumberToString = (number: number, numberType: NumberType) => {
  switch (numberType) {
    case 'currency':
      return getKCWFormat(number);
    case 'comma':
      return getNumberWithComma(number);
    case 'percent':
      return `${number}%`;
    default:
      return EMPTY;
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

export const getProfit = (sale: SaleInfo) => {
  return (sale?.accPayCost ?? 0) - (sale?.accWonCost ?? 0) - (sale?.accDeliveryCost ?? 0);
};

export const getParsedSaleData = ({
  accTotalPayment = 0,
  accCount = 0,
  accProfit = 0,
  accProfitRate = 0,
}: SaleInfoPropsNumber) => {
  return {
    accTotalPayment: getNumberToString(accTotalPayment!, 'comma'),
    accCount: getNumberToString(accCount!, 'comma'),
    accProfit: getNumberToString(accProfit!, 'comma'),
    accProfitRate: getNumberToString(accProfitRate!, 'percent'),
  };
};

export const getParsedOrderSaleData = ({
  accTotalPayment = 0,
  accCount = 0,
  accDeliveryCost = 0,
  accWonCost = 0,
  accPayCost = 0,
}: SaleOrderProps) => {
  return {
    accTotalPayment: getNumberToString(accTotalPayment!, 'comma'),
    accCount: getNumberToString(accCount!, 'comma'),
    accWonCost: getNumberToString(accWonCost!, 'comma'),
    accDeliveryCost: getNumberToString(accDeliveryCost!, 'comma'),
    accPayCost: getNumberToString(accPayCost!, 'comma'),
  };
};
