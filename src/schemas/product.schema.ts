import { number, object, string, TypeOf } from 'zod';

export const createProductSchema = object({
  params: object({}).optional(),
  query: object({}).optional(),
  body: object({
    name: string(),
    url: string(),
    description: string(),
    price: number(),
  }).strict(),
}).strict();

export type CreateProductInput = TypeOf<typeof createProductSchema>;
