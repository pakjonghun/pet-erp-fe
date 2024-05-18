import { z } from 'zod';

export const setDeliveryCostSchema = z.object({
  year: z
    .number()
    .min(1000, { message: '1000이상의 숫자를 입력하세요.' })
    .max(2500, { message: '2500이하의 숫자를 입력하세요.' }),
  month: z
    .number()
    .min(1, { message: '1이상의 숫자를 입력하세요.' })
    .max(12, { message: '12이하의 숫자를 입력하세요.' }),
  monthDeliveryPayCost: z.number().min(0, { message: '0이상의 숫자를 입력하세요.' }),
});

export type SetDeliveryForm = z.infer<typeof setDeliveryCostSchema>;
