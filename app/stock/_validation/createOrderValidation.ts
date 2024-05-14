import z, { RefinementCtx } from 'zod';

export const checkPayCost = (
  data: { payCost: number; notPayCost: number; totalPayCost: number },
  ctx: RefinementCtx
) => {
  if (data.payCost + data.notPayCost != data.totalPayCost) {
    ctx.addIssue({
      code: 'custom',
      path: ['totalPayCost'],
      message: '총 금액과 계약금+잔금 합산한 금액이 일치하지 않습니다.',
    });
  }
};

export const createOrderProductSchema = z.object({
  count: z.number().min(1, { message: '1개 이상의 제품을 입력해주세요.' }),
  product: z.string().min(1, { message: '제품 이름을 입력해주세요.' }),
});

export const createOrderSchema = z
  .object({
    isDone: z.boolean(),
    factory: z.string().min(1, { message: '발주할 공장을 선택하세요.' }),
    products: z
      .array(createOrderProductSchema)
      .nonempty({ message: '1개 이상 제품을 입력해주세요.' }),
    payCost: z.number().min(0, { message: '0 이상의 숫자를 입력하세요.' }),
    notPayCost: z.number().min(0, { message: '0 이상의 숫자를 입력하세요.' }),
    totalPayCost: z.number().min(0, { message: '0 이상의 숫자를 입력하세요.' }),
  })
  .superRefine(checkPayCost);

export type CreateOrderForm = z.infer<typeof createOrderSchema>;
export type CreateOrderProductForm = z.infer<typeof createOrderProductSchema>;
