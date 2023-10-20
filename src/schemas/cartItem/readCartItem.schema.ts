import { object, string, TypeOf } from 'zod';

export const readCartItemSchema = object({
  params: object({
    id: string(),
  }).strict(),
});
export type ReadCartItemInput = TypeOf<typeof readCartItemSchema>;
