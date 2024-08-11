import { AdType } from './../../../http/graphql/codegen/graphql';
import z from 'zod';

const nameCodeObjectSchema = z.object({
  code: z.string().min(1, { message: '이름을 입력하세요.' }),
  name: z.string().min(1, { message: '코드을 입력하세요.' }),
});

export const createAdItemSchema = z.object({
  clientCode: nameCodeObjectSchema.optional().nullable(),
  productCodeList: z.array(nameCodeObjectSchema).optional().nullable(),
  from: z.date({ required_error: '날짜를 입력해주세요.' }),
  to: z.date({ required_error: '날짜를 입력해주세요.' }),
  price: z
    .number({ required_error: '광고비를 입력해주세요.' })
    .min(0, { message: '최소 0 이상의 값을 입력해주세요.' }),
  type: z.enum(Object.values(AdType) as [AdType, ...AdType[]], {
    invalid_type_error: '올바른 광고 타입을 입력하세요.',
  }),
});

export const createAdSchema = z.object({
  ads: z.array(createAdItemSchema).min(1, { message: '1개 이상의 광고를 입력하세요.' }),
});

export type CreateAdForm = z.infer<typeof createAdSchema>;
export type NameCodeForm = z.infer<typeof nameCodeObjectSchema>;
