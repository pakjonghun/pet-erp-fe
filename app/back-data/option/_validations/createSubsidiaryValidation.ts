import z from 'zod';

export const createOptionSchema = z.object({
  id: z
    .string({ required_error: '옵션 아이디를 입력해주세요.' })
    .min(1, { message: '제품 코드를 입력해주세요.' }),
  name: z
    .string({ required_error: '제품 이름을 입력해주세요.' })
    .min(1, { message: '제품 이름을 입력해주세요.' }),
  productOptionList: z
    .array(
      z.object({
        count: z.number().min(1, { message: '제품 개수는 1개 이상을 입력하세요.' }),
        productCode: z.object({
          code: z
            .string({ required_error: '제품 코드를 입력해주세요.' })
            .min(1, { message: '제품 이름을 입력해주세요.' }),
          name: z
            .string({ required_error: '제품 이름을 입력해주세요.' })
            .min(1, { message: '제품 이름을 입력해주세요.' }),
        }),
      })
    )
    .nonempty({ message: '제품옵션을 최소 1개를 입력하세요.' }),
});

export type CreateOptionForm = z.infer<typeof createOptionSchema>;
