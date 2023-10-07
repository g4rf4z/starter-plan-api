import { number, object, string, TypeOf } from 'zod';

export const readProductsSchema = object({
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
export type ReadProductsInput = TypeOf<typeof readProductsSchema>;
