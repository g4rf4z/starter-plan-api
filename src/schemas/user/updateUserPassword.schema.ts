import { object, string, TypeOf } from 'zod';

import { validatePasswordComplexity } from '@/services';

export const updateUserPasswordSchema = object({
  params: object({}).strict(),
  body: object({
    password: string(),
    newPassword: string(),
    newPasswordConfirmation: string(),
  })
    .strict()
    .refine((data) => validatePasswordComplexity(data.newPassword, 3))
    .refine((data) => data.newPassword === data.newPasswordConfirmation),
  query: object({}).strict(),
});

export type UpdateUserPasswordInput = TypeOf<typeof updateUserPasswordSchema>;
