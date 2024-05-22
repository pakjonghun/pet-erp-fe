import z from 'zod';

export const createProductSchema = z.object({
  code: z
    .string({ required_error: '제품 코드를 입력해주세요.' })
    .min(1, { message: '제품 코드를 입력해주세요.' }),
  barCode: z.string({ invalid_type_error: '올바른 바코드를 입력해주세요.' }).optional(),
  name: z
    .string({ required_error: '제품 이름을 입력해주세요.' })
    .min(1, { message: '제품 이름을 입력해주세요.' }),
  wonPrice: z
    .number({ required_error: '제품 원가를 입력해주세요.' })
    .min(0, { message: '제품원가는 0이상의 숫자를 입력하세요.' })
    .optional()
    .nullable(),
  salePrice: z
    .number({ required_error: '제품 원가를 입력해주세요.' })
    .min(0, { message: '제품원가는 0이상의 숫자를 입력하세요.' })
    .optional()
    .nullable(),
  leadTime: z
    .number({ invalid_type_error: '제품 원가를 입력해주세요.' })
    .min(0, { message: '리드타임은 0이상의 숫자를 입력하세요.' })
    .optional()
    .nullable(),
  category: z
    .string({ invalid_type_error: '올바른 카테고리를 입력해주세요.' })
    .optional()
    .nullable(),
});

export type CreateProductForm = z.infer<typeof createProductSchema>;
