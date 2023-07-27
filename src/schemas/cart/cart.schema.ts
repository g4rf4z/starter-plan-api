import { object, string, TypeOf } from 'zod';

export const findCartSchema = object({
  params: object({
    id: string(),
  }).strict(),
});

export type FindCartInput = TypeOf<typeof findCartSchema>;
