import { array, object, string, TypeOf } from 'zod';

export const createCartSchema = object({
  body: object({
    buyerId: string(),
    productId: array(string()),
  }).strict(),
});

export type CreateCartInput = TypeOf<typeof createCartSchema>;
