import z from 'zod';

export const createCategorySchema = z.object({
  name: z
    .string({ required_error: '제품분류를 입력하세요.' })
    .min(1, { message: '제품분류를 입력하세요.' }),
});

export type CreateCategoryForm = z.infer<typeof createCategorySchema>;
