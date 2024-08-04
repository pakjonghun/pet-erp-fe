import z from 'zod';

export const adsInputSchema = z.object({
  from: z.date({ required_error: '날짜를 입력하세요.' }),
  to: z.date({ required_error: '날짜를 입력하세요.' }),
  type: z.string().optional(),
  keyword: z.string(),
});

export type AdInputForm = z.infer<typeof adsInputSchema>;
