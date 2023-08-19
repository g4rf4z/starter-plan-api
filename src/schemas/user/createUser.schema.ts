import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    firstname: string(),
    lastname: string(),
    email: string().email(),
    password: string(),
  }).strict(),
});
export type CreateUserInput = TypeOf<typeof createUserSchema>;
