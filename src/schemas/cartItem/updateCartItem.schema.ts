import { object, string, number, TypeOf } from 'zod';

export const updateCartItemSchema = object({
  params: object({
    id: string(),
    cartId: string(),
  }).strict(),
  body: object({
    productId: string(),
    quantity: number(),
  }).strict(),
});
export type UpdateCartItemInput = TypeOf<typeof updateCartItemSchema>;
