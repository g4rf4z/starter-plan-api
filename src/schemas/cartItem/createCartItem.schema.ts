import { object, string, number, TypeOf } from 'zod';

export const createCartItemSchema = object({
  params: object({
    productId: string(),
  }).strict(),
  body: object({
    quantity: number(),
  }).strict(),
});
export type CreateCartItemInput = TypeOf<typeof createCartItemSchema>;
