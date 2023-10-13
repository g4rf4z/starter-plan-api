import { object, string, number, TypeOf } from 'zod';

export const createCheckoutSessionSchema = object({
  body: object({
    currency: string(),
    productName: string(),
    unitAmount: number(),
    quantity: number(),
  }).strict(),
});
export type createCheckoutSessionInput = TypeOf<
  typeof createCheckoutSessionSchema
>;
