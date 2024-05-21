import { z } from 'zod';

export const createProductSchema = z.object({
  storageName: z.string().min(1, { message: '창고를 입력하세요.' }),
  productName: z.string().min(1, { message: '제품을 입력하세요.' }),
  count: z.number().min(1, { message: '재품 수량은 1 이상의 숫자를 입력하세요.' }),
});

export const createProductStockSchema = z.object({
  stocks: z.array(createProductSchema).nonempty({ message: '1개 이상의 재고를 입력하세요.' }),
});

export type CreateProductForm = z.infer<typeof createProductSchema>;
export type CreateProductStockForm = z.infer<typeof createProductStockSchema>;
