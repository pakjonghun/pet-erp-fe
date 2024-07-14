import z from 'zod';
import { UserRole } from '@/http/graphql/codegen/graphql';
import { passwordCheckSchema, checkPassword } from './editPasswordValidation';

export const idValidateSchema = z.object({
  id: z
    .string({ required_error: '아이디를 입력해주세요.' })
    .min(3, { message: '아이디는 최소 3글자 이상입니다.' })
    .max(10, { message: '아이디는 10글자 이내로 입력해주세요.' }),
});

export const createAccountSchema = idValidateSchema
  .merge(passwordCheckSchema)
  .extend({
    role: z.array(z.nativeEnum(UserRole)),
  })
  .superRefine(checkPassword);

export type CreateAccountForm = z.infer<typeof createAccountSchema>;
