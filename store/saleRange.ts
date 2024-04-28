import { DateRange } from '@/components/calendar/dateFilter/type';
import { getToday } from '@/components/calendar/dateFilter/utils';
import { makeVar } from '@apollo/client';

export const saleRange = makeVar<DateRange>(getToday());
