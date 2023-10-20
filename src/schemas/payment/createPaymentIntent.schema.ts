import { object, number, string, boolean, TypeOf } from 'zod';

export const createPaymentIntentSchema = object({
  body: object({
    amount: number(),
    currency: string(),
    enable_automatic_payment: boolean(),
  }).strict(),
});
export type createPaymentIntentInput = TypeOf<typeof createPaymentIntentSchema>;
