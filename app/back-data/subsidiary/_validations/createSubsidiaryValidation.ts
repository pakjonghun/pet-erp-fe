import z from 'zod';

export const createSubsidiarySchema = z.object({
  code: z
    .string({ required_error: '제품 코드를 입력해주세요.' })
    .min(1, { message: '제품 코드를 입력해주세요.' }),
  name: z
    .string({ required_error: '제품 이름을 입력해주세요.' })
    .min(1, { message: '제품 이름을 입력해주세요.' }),
  wonPrice: z
    .number({ required_error: '제품 원가를 입력해주세요.' })
    .min(0, { message: '제품원가는 0이상의 숫자를 입력하세요.' })
    .optional()
    .nullable(),
  leadTime: z
    .number({ invalid_type_error: '제품 리드타임을 입력해주세요.' })
    .min(0, { message: '리드타임은 0이상의 숫자를 입력하세요.' })
    .optional()
    .nullable(),
  category: z
    .string()
    .optional()
    .nullable()
    .refine((value) => typeof value === 'string' || value == null, {
      message: '올바른 카테고리를 입력하세요.',
    }),
  productList: z
    .array(z.string().min(1, { message: '제품 이름을 입력하세요.' }))
    .optional()
    .nullable(),
});

export type CreateSubsidiaryForm = z.infer<typeof createSubsidiarySchema>;
