import { object, TypeOf } from 'zod';

export const readUserSchema = object({
  params: object({}).strict(),
});
export type ReadUserInput = TypeOf<typeof readUserSchema>;
