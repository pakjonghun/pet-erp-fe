import { z } from 'zod';

export const createWholeSaleProductSchema = z.object({
  count: z.number().min(1, { message: '재품 수량은 1 이상의 숫자를 입력하세요.' }),
  productName: z.string().min(1, { message: '제품 이름을 입력하세요.' }),
  productCode: z.string().min(1, { message: '제품 코드를 입력하세요.' }),
});

export const createWholeSaleSchema = z.object({
  mallId: z.string().min(1, { message: '거래처 이름을 입력하세요.' }),
  address1: z.string().optional(),
  telephoneNumber1: z.string().optional(),
  payCost: z.number().min(0, { message: '판매가는 0 이상의 숫자를 입력하세요.' }),
  wonCost: z.number().min(0, { message: '원가는 0 이상의 숫자를 입력하세요.' }),
  deliveryCost: z.number().min(0, { message: '택배비용은 0 이상의 숫자를 입력하세요.' }),
  saleAt: z.date(),
  products: z.array(createWholeSaleProductSchema),
});

export type CreateWholeSaleForm = z.infer<typeof createWholeSaleSchema>;
export type CreateWholeSaleProductForm = z.infer<typeof createWholeSaleProductSchema>;
