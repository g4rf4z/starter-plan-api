import { boolean, number, object, string, TypeOf } from 'zod';

export const createPaymentIntentSchema = object({
  body: object({
    amount: number(),
    currency: string(),
    enable_automatic_payment: boolean(),
  }).strict(),
});

export type createPaymentIntentInput = TypeOf<typeof createPaymentIntentSchema>;
