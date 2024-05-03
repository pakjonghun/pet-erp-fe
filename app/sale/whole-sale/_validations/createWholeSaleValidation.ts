import { z } from 'zod';

export const createWholeSaleProductSchema = z.object({
  count: z.number().min(1, { message: '재품 수량은 1 이상의 숫자를 입력하세요.' }).nullable(),
  name: z.string().min(1, { message: '제품 이름을 입력하세요.' }),
  code: z.string().min(1, { message: '제품 코드를 입력하세요.' }),
  wonCost: z.number().nullable().optional(),
  payCost: z.number().nullable().optional(),
});

export const createWholeSaleSchema = z.object({
  storage: z.string().min(1, { message: '창고를 입력하세요.' }),
  address1: z.string().optional().nullable(),
  telephoneNumber1: z.string().optional().nullable(),
  saleAt: z.date(),
  payCost: z
    .number()
    .min(0, { message: '판매가는 0 이상의 숫자를 입력하세요.' })
    .optional()
    .nullable(),
  mallId: z.string().min(1, { message: '거래처 이름을 입력하세요.' }).optional().nullable(),
  wonCost: z
    .number()
    .min(0, { message: '원가는 0 이상의 숫자를 입력하세요.' })
    .optional()
    .nullable(),
  productList: z.array(createWholeSaleProductSchema),
});

export type CreateWholeSaleForm = z.infer<typeof createWholeSaleSchema>;
export type CreateWholeSaleProductForm = z.infer<typeof createWholeSaleProductSchema>;
