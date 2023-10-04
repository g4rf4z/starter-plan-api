import { number, object, string, TypeOf } from 'zod';

export const createCartItemSchema = object({
  params: object({}).strict(),
  body: object({
    productId: string(),
    quantity: number(),
  }).strict(),
});
export type CreateCartItemInput = TypeOf<typeof createCartItemSchema>;
