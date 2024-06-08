import { z } from 'zod';

export const createWholeSaleProductSchema = z.object({
  storageName: z.string().min(1, { message: '창고 이름을 입력하세요.' }),
  productName: z.string().min(1, { message: '제품 이름을 입력하세요.' }),
  productCode: z.string().min(1, { message: '제품 코드를 입력하세요.' }),
  count: z.number({ invalid_type_error: '' }),
  // .min(1, { message: '판매 수량은 1 이상의 숫자를 입력하세요.' }),
  payCost: z
    .number({ invalid_type_error: '' })
    .min(0, { message: '판매가는 0 이상의 숫자를 입력하세요.' }),
  wonCost: z
    .number({ invalid_type_error: '' })
    .min(0, { message: '원가는 0 이상의 숫자를 입력하세요.' })
    .nullable()
    .optional(),
});

export const createWholeSaleSchema = z.object({
  mallId: z.string().min(1, { message: '거래처 이름을 입력하세요.' }),
  saleAt: z.date(),
  telephoneNumber1: z.string().optional().nullable(),
  isDone: z.boolean(),
  productList: z
    .array(createWholeSaleProductSchema)
    .nonempty({ message: '1개 이상의 제품을 입력하세요.' }),
});

export type CreateWholeSaleForm = z.infer<typeof createWholeSaleSchema>;
export type CreateWholeSaleProductForm = z.infer<typeof createWholeSaleProductSchema>;
