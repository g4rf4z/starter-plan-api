import { object, string, TypeOf } from 'zod';

export const resetPasswordSchema = object({
  params: object({}).strict(),
  body: object({
    email: string().email(),
  }).strict(),
  query: object({}).strict(),
});
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
