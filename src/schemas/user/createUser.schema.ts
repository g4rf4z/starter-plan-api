import { object, string, TypeOf } from 'zod';

import { validatePasswordComplexity } from '@/services/data.service';

export const createUserSchema = object({
  params: object({}).strict(),
  body: object({
    firstname: string(),
    lastname: string(),
    email: string(),
    password: string(),
    passwordConfirmation: string(),
  })
    .strict()
    .refine((data) => validatePasswordComplexity(data.password, 3))
    .refine((data) => data.password === data.passwordConfirmation),
  query: object({}).strict(),
});
export type CreateUserInput = TypeOf<typeof createUserSchema>;
