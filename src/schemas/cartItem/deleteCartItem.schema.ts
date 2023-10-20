import { object, string, TypeOf } from 'zod';

export const deleteCartItemSchema = object({
  params: object({
    id: string(),
  }).strict(),
});
export type DeleteCartItemInput = TypeOf<typeof deleteCartItemSchema>;
