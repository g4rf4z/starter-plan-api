import { boolean, number, object, string, TypeOf } from 'zod';

export const createPaymentIntentSchema = object({
  params: object({}).optional(),
  query: object({}).optional(),
  body: object({
    amount: number(),
    currency: string(),
    automatic_payment_methods: object({ enabled: boolean() }),
  }).strict(),
}).strict();

export type createPaymentIntentInput = TypeOf<typeof createPaymentIntentSchema>;
