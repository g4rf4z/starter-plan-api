import { object, string, number, TypeOf } from 'zod';

export const updateCartItemSchema = object({
  params: object({
    id: string(),
  }).strict(),
  body: object({
    quantity: number(),
  }).strict(),
});
export type UpdateCartItemInput = TypeOf<typeof updateCartItemSchema>;
