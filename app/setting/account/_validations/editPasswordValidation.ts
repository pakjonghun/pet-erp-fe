import z from 'zod';

export const editPasswordSchema = z
  .object({
    password: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 최소 8글자 이상입니다.' })
      .max(12, { message: '비밀번호는 12글자 이내로 입력해주세요.' }),
    passwordConfirm: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 최소 8글자 이상입니다.' })
      .max(12, { message: '비밀번호는 12글자 이내로 입력해주세요.' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: '비밀번호가 일치하지 않습니다.',
      });

      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirm'],
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  });

export type EditPasswordForm = z.infer<typeof editPasswordSchema>;
