import { boolean, number, object, string, TypeOf } from 'zod';

export const createPaymentIntent = object({
  body: object({
    amount: number(),
    currency: string(),
    automatic_payment_methods: object({ enabled: boolean() }),
  }).strict(),
}).strict();

export type createPaymentIntentInput = TypeOf<typeof createPaymentIntent>;
