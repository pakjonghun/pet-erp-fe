import { AdType } from './../../../http/graphql/codegen/graphql';
import z from 'zod';

export const createAdSchema = z.object({
  clientCode: z.string().optional(),
  productCodeList: z.array(z.string().min(1, { message: '제품코드를 입력해주세요.' })).optional(),
  from: z.date({ required_error: '날짜를 입력해주세요.' }),
  to: z.date({ required_error: '날짜를 입력해주세요.' }),
  price: z
    .number({ required_error: '광고비를 입력해주세요.' })
    .min(0, { message: '최소 0 이상의 값을 입력해주세요.' }),
  type: z.enum(Object.values(AdType) as [AdType, ...AdType[]], {
    invalid_type_error: '올바른 광고 타입을 입력하세요.',
  }),
});

export type CreateAdForm = z.infer<typeof createAdSchema>;
