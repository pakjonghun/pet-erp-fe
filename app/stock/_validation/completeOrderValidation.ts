import z from 'zod';

export const createOrderProductSchema = z.object({
  count: z.number().min(1, { message: '1개 이상의 제품을 입력해주세요.' }),
  product: z.string().min(1, { message: '제품 이름을 입력해주세요.' }),
});

export const completeOrderValidation = z.object({
  _id: z.string().min(1, { message: '완료할 발주를 선택하세요.' }),
  storageName: z.string().min(1, { message: '입고할 창고를 선택하세요.' }),
});

export type CompleteOrderForm = z.infer<typeof completeOrderValidation>;
