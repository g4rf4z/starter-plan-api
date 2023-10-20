import { object, array, string, number, TypeOf } from 'zod';

export const createCheckoutSessionSchema = object({
  body: object({
    line_items: array(
      object({
        price: string(),
        quantity: number(),
      })
    ),
  }).strict(),
});
export type createCheckoutSessionInput = TypeOf<
  typeof createCheckoutSessionSchema
>;
