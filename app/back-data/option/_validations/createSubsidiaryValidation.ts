import z from 'zod';

export const createSubsidiarySchema = z.object({
  id: z
    .string({ required_error: '옵션 아이디를 입력해주세요.' })
    .min(1, { message: '제품 코드를 입력해주세요.' }),
  name: z
    .string({ required_error: '제품 이름을 입력해주세요.' })
    .min(1, { message: '제품 이름을 입력해주세요.' }),
  count: z
    .number({ required_error: '제품 개수를 입력해주세요.' })
    .min(1, { message: '제품 개수는 1개 이상을 입력하세요.' }),
  productCodeList: z
    .array(
      z.object({
        code: z
          .string({ required_error: '제품 코드를 입력해주세요.' })
          .min(1, { message: '제품 이름을 입력해주세요.' }),
        name: z
          .string({ required_error: '제품 이름을 입력해주세요.' })
          .min(1, { message: '제품 이름을 입력해주세요.' }),
      })
    )
    .optional()
    .nullable(),
});

export type CreateSubsidiaryForm = z.infer<typeof createSubsidiarySchema>;
