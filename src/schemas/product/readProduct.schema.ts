import { object, string, TypeOf } from 'zod';

export const readProductSchema = object({
  params: object({
    id: string(),
  }).strict(),
});
export type ReadProductInput = TypeOf<typeof readProductSchema>;
