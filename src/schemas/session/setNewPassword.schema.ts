import { object, string, TypeOf } from 'zod';

import { validatePasswordComplexity } from '@/services/data.service';

export const setNewPasswordSchema = object({
  params: object({
    userId: string(),
    token: string(),
  }).strict(),
  body: object({
    password: string().min(8),
    passwordConfirmation: string().optional(),
  })
    .strict()
    .refine((data) => validatePasswordComplexity(data.password, 3))
    .refine((data) => data.password === data.passwordConfirmation),
  query: object({}).strict(),
});
export type SetNewPasswordInput = TypeOf<typeof setNewPasswordSchema>;
