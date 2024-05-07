import z from 'zod';

export const createStorageSchema = z.object({
  name: z
    .string({ required_error: '창고 이름을 입력하세요.' })
    .min(1, { message: '창고 이름을 입력하세요.' }),
  address: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),

  note: z.string().optional().nullable(),
});

export type CreateStorageForm = z.infer<typeof createStorageSchema>;
