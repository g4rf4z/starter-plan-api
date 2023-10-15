import { object, string, TypeOf } from 'zod';

export const readCartSchema = object({
  params: object({
    id: string(),
  }).strict(),
});
export type ReadCartInput = TypeOf<typeof readCartSchema>;
