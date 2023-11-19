import { object, string, TypeOf } from 'zod';

export const updateUserSchema = object({
  body: object({
    firstname: string(),
    lastname: string(),
    email: string().email(),
  }).strict(),
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
