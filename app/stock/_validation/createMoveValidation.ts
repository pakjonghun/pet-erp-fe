import z from 'zod';

export const createMoveProductSchema = z.object({
  count: z.number().min(1, { message: '1개 이상의 제품을 입력해주세요.' }),
  product: z.string().min(1, { message: '제품 이름을 입력해주세요.' }),
});

export const createMoveSchema = z.object({
  fromPlace: z.string().min(1, { message: '출발지를 입력하세요.' }),
  toPlace: z.string().min(1, { message: '도착지를 입력하세요.' }),
  products: z.array(createMoveProductSchema),
  startDate: z.date(),
  endDate: z.date(),
});

export type CreateMoveForm = z.infer<typeof createMoveSchema>;
export type CreateMoveProductForm = z.infer<typeof createMoveProductSchema>;
