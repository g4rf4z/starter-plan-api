import { object, TypeOf } from 'zod';

export const retrieveSessionSchema = object({
  params: object({}).strict(),
  body: object({}).strict(),
  query: object({}).strict(),
});
export type RetrieveSessionInput = TypeOf<typeof retrieveSessionSchema>;
