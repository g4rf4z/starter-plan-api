import { object, TypeOf } from 'zod';

export const logoutSchema = object({
  params: object({}).strict(),
  body: object({}).strict(),
  query: object({}).strict(),
});
export type LogoutInput = TypeOf<typeof logoutSchema>;
