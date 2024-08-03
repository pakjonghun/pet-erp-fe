import { DateRange } from '@/components/calendar/dateFilter/type';
import { getToday } from '@/components/calendar/dateFilter/utils';
import { makeVar } from '@apollo/client';

export const saleRange = makeVar<DateRange>(getToday());

export const showPrevData = makeVar(false);
export const showPrevSaleData = makeVar(false);

export const saleDetailRange = makeVar<DateRange>(getToday());
export const saleDateRange = makeVar<DateRange>(getToday());
