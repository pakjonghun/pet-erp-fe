import { DateRange } from '@/components/calendar/dateFilter/type';
import { getToday } from '@/components/calendar/dateFilter/utils';
import { makeVar } from '@apollo/client';

export const saleRange = makeVar<DateRange>(getToday());
export const clientTotal = makeVar({
  totalCount: 0,
  totalPayCost: 0,
  totalProfit: 0,
  totalPayment: 0,
});
export const saleTotal = makeVar({
  totalCount: 0,
  totalPayCost: 0,
  totalProfit: 0,
  totalPayment: 0,
});

export const showPrevData = makeVar(false);
export const showPrevSaleData = makeVar(false);
