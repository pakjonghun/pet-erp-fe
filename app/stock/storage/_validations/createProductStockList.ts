import { z } from 'zod';

export const createProductSchema = z.object({
  storage: z.string().min(1, { message: '창고를 입력하세요.' }),
  product: z.string().min(1, { message: '제품을 입력하세요.' }),
  count: z
    .number()
    .min(1, { message: '재품 수량은 1 이상의 숫자를 입력하세요.' }),
});

export const createProductStockSchema = z.object({
  productList: z.array(createProductSchema),
});

export type CreateProductForm = z.infer<typeof createProductSchema>;
export type CreateProductStockForm = z.infer<typeof createProductStockSchema>;
