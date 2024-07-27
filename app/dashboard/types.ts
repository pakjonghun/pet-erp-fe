import { Dayjs } from 'dayjs';

export interface SaleInfoProps {
  accTotalPayment: string;
  accCount: string;
  accProfit: string;
  accProfitRate: string;
}

export interface DateRange {
  from: Dayjs;
  to: Dayjs;
}

export interface SaleInfoPropsNumber {
  accTotalPayment?: number | null;
  accCount?: number | null;
  accProfit?: number | null;
  accProfitRate?: number | null;
}
