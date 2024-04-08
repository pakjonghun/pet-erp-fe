import z from 'zod';
import { idValidateSchema } from '../setting/account/_validations/createAccountValidation';
import { basePasswordSchema } from '../setting/account/_validations/editPasswordValidation';

export const loginSchema = idValidateSchema.merge(basePasswordSchema);

export type LoginForm = z.infer<typeof loginSchema>;
