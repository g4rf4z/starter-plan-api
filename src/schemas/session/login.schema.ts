import { object, string, TypeOf } from 'zod';

export const loginSchema = object({
  params: object({}).strict(),
  body: object({
    email: string(),
    password: string(),
  }).strict(),
  query: object({}).strict(),
});
export type LoginInput = TypeOf<typeof loginSchema>;
