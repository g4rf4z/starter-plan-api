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

export const findProductSchema = object({
  params: object({
    id: string(),
  }).strict(),
});

export type FindProductInput = TypeOf<typeof findProductSchema>;

export const findProductsSchema = object({
  body: object({
    params: object({
      id: string().optional(),
      name: string(),
      url: string(),
      description: string(),
      price: number(),
    })
      .strict()
      .optional(),
  }).strict(),
});

export type FindProductsInput = TypeOf<typeof findProductsSchema>;
