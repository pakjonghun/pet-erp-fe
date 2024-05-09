import z from 'zod';

export const createClientSchema = z.object({
  code: z
    .string({ required_error: '거래처 코드를 입력해주세요. required' })
    .min(1, { message: '거래처 코드를 입력해주세요. min1' }),
  name: z
    .string({ required_error: '거래처 이름을 입력해주세요.' })
    .min(1, { message: '거래처 이름을 입력해주세요.' }),
  feeRate: z
    .number({ required_error: '거래처 수수료 비율을을 입력해주세요.' })
    .min(0, { message: '수수료 비율을 0이상의 숫자를 입력하하세요.' })
    .max(100, { message: '수수료 비율은 100이하의 숫자를 입력하세요.' })
    .optional()
    .nullable(),
  clientType: z
    .string({ required_error: '거래처 형태를 입력해주세요.' })
    .min(1, { message: '거래처 형태를 입력해주세요.' }),
  businessName: z.string().optional(),
  businessNumber: z.string().optional(),
  payDate: z
    .number()
    .min(1, { message: '최소 1이상의 값을 입력하세요.' })
    .max(31, { message: '31이하의 값을 입력하세요.' })
    .optional()
    .nullable(),
  manager: z.string().optional(),
  managerTel: z.string().optional(),
  inActive: z.boolean().optional(),
});

export type CreateClientForm = z.infer<typeof createClientSchema>;
