import { object, string, number, TypeOf } from 'zod';

export const createProductSchema = object({
  body: object({
    name: string(),
    url: string(),
    description: string(),
    price: number(),
  }).strict(),
});
export type CreateProductInput = TypeOf<typeof createProductSchema>;
