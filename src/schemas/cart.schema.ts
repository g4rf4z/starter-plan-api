import { array, number, object, string, TypeOf } from 'zod';

export const createCartSchema = object({
  body: object({
    userId: string(),
    productId: array(string()),
  }).strict(),
});

export type CreateCartInput = TypeOf<typeof createCartSchema>;
