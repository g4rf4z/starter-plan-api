import { number, object, string, TypeOf } from 'zod';

export const createCartItemSchema = object({
  params: object({
    cartId: string(),
  }).strict(),
  body: object({
    productId: string(),
    quantity: number(),
  }).strict(),
});
export type CreateCartItemInput = TypeOf<typeof createCartItemSchema>;

// export const readCartItemSchema = object({
//   body: object({
//     params: object({
//       cartId: string(),
//     })
//       .strict()
//       .optional(),
//   }).strict(),
// });
// export type ReadCartItemInput = TypeOf<typeof readCartItemSchema>;
