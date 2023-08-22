import { object, string, TypeOf } from 'zod';

export const readCartSchema = object({
  params: object({
    userId: string(),
  }).strict(),
});
export type ReadCartInput = TypeOf<typeof readCartSchema>;
