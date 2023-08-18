import { object, string, TypeOf } from 'zod';

export const readUserSchema = object({
  params: object({
    id: string(),
  }).strict(),
});

export type ReadUserInput = TypeOf<typeof readUserSchema>;
