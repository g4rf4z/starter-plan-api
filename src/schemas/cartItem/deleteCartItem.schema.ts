import { string, object, TypeOf } from 'zod';

export const deleteCartItemSchema = object({
  params: object({
    id: string(),
  }).strict(),
  body: object({}).strict(),
  query: object({}).strict(),
});
export type DeleteCartItemInput = TypeOf<typeof deleteCartItemSchema>;
