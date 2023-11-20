import { object, string, number, TypeOf } from 'zod';

export const createProductSchema = object({
  body: object({
    name: string(),
    description: string(),
    url: string(),
    price: number(),
  }).strict(),
});
export type CreateProductInput = TypeOf<typeof createProductSchema>;
