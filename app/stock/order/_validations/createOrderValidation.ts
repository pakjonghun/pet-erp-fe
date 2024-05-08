import z from 'zod';

export const createOrderProductSchema = z.object({
  count: z.number().min(1, { message: '1개 이상의 제품을 입력해주세요.' }),
  product: z.string().min(1, { message: '제품 이름을 입력해주세요.' }),
});

export const createOrderSchema = z.object({
  factory: z.string().min(1, { message: '발주할 공장을 선택하세요.' }),
  products: z.array(createOrderProductSchema),
  count: z.number().min(1, { message: '1개 이상의 제품을 입력해주세요.' }),
});

export type CreateOrderForm = z.infer<typeof createOrderSchema>;
export type CreateOrderProductForm = z.infer<typeof createOrderProductSchema>;
