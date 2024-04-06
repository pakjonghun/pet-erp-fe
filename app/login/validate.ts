import z from 'zod';

export const loginSchema = z.object({
  id: z
    .string({ required_error: '아이디를 입력해주세요.' })
    .min(3, { message: '아이디는 최소 3글자 이상입니다.' })
    .max(10, { message: '아이디는 10글자 이내로 입력해주세요.' }),
  password: z
    .string({ required_error: '비밀번호를 입력해주세요.' })
    .min(8, { message: '비밀번호는 최소 8글자 이상입니다.' })
    .max(12, { message: '비밀번호는 12글자 이내로 입력해주세요.' }),
});

export type LoginForm = z.infer<typeof loginSchema>;
